package dev.protik.moneymanager.controller;

import dev.protik.moneymanager.dto.*;
import dev.protik.moneymanager.service.ExpenseService;
import dev.protik.moneymanager.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequiredArgsConstructor
@RequestMapping("/filter")
public class FilterController {
    private final ExpenseService expenseService;
    private final IncomeService incomeService;

    /**
     * Get all transactions for current user (GET endpoint for transactions page)
     * Returns combined list of incomes and expenses for current month
     */
    @GetMapping
    public ResponseEntity<List<Object>> getAllTransactions(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String sortBy) {

        List<IncomeDTO> incomes = incomeService.getIncomesForCurrentMonthForCurrentUser();
        List<ExpenseDTO> expenses = expenseService.getExpensesForCurrentMonthForCurrentUser();

        List<Object> transactions = new ArrayList<>();

        if (type == null || "income".equalsIgnoreCase(type)) {
            transactions.addAll(incomes.stream()
                .map(i -> new HashMap<String, Object>() {{
                    put("id", i.getId());
                    put("note", i.getNote());
                    put("amount", i.getAmount());
                    put("type", "income");
                    put("categoryId", i.getCategoryId());
                    put("categoryName", i.getCategoryName());
                    put("addedDate", i.getAddedDate());
                }})
                .toList());
        }

        if (type == null || "expense".equalsIgnoreCase(type)) {
            transactions.addAll(expenses.stream()
                .map(e -> new HashMap<String, Object>() {{
                    put("id", e.getId());
                    put("note", e.getNote());
                    put("amount", e.getAmount());
                    put("type", "expense");
                    put("categoryId", e.getCategoryId());
                    put("categoryName", e.getCategoryName());
                    put("addedDate", e.getAddedDate());
                }})
                .toList());
        }

        // Sort transactions (default: newest first)
        transactions.sort((a, b) -> {
            if (a instanceof Map && b instanceof Map) {
                Object dateA = ((Map<?, ?>) a).get("addedDate");
                Object dateB = ((Map<?, ?>) b).get("addedDate");
                if (dateA instanceof LocalDateTime && dateB instanceof LocalDateTime) {
                    int comparison = ((LocalDateTime) dateB).compareTo((LocalDateTime) dateA);
                    return "asc".equalsIgnoreCase(sortBy) ? -comparison : comparison;
                }
            }
            return 0;
        });

        return ResponseEntity.ok(transactions);
    }

    /**
     * Filter transactions with comprehensive analytics
     * Returns filtered data with category-wise breakdown and daily statistics
     */
    @PostMapping
    public ResponseEntity<FilterResponseDTO> filterTransactions(@RequestBody FilterDTO filter) {
        LocalDateTime startDateTime = filter.getStartDate() != null
                ? filter.getStartDate().atStartOfDay()
                : LocalDateTime.now().minusMonths(1);  // Default: last month

        LocalDateTime endDateTime = filter.getEndDate() != null
                ? filter.getEndDate().atTime(LocalTime.MAX)
                : LocalDateTime.now();

        String keyword = filter.getKeyword() != null ? filter.getKeyword() : "";
        String sortField = filter.getSortField() != null ? filter.getSortField() : "addedDate";
        Sort.Direction direction = "desc".equalsIgnoreCase(filter.getSortOrder())
            ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sort = Sort.by(direction, sortField);

        // Fetch filtered data
        List<IncomeDTO> incomes = new ArrayList<>();
        List<ExpenseDTO> expenses = new ArrayList<>();

        String type = filter.getType() != null ? filter.getType().toLowerCase() : "both";

        if ("income".equals(type) || "both".equals(type)) {
            incomes = incomeService.filterIncomes(startDateTime, endDateTime, keyword, sort);
        }

        if ("expense".equals(type) || "both".equals(type)) {
            expenses = expenseService.filterExpenses(startDateTime, endDateTime, keyword, sort);
        }

        // Calculate totals
        BigDecimal totalIncome = incomes.stream()
            .map(IncomeDTO::getAmount)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalExpense = expenses.stream()
            .map(ExpenseDTO::getAmount)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Category-wise breakdown
        Map<String, BigDecimal> categoryWiseIncome = incomes.stream()
            .collect(Collectors.groupingBy(
                income -> income.getCategoryName() != null ? income.getCategoryName() : "Uncategorized",
                Collectors.reducing(BigDecimal.ZERO, IncomeDTO::getAmount, BigDecimal::add)
            ));

        Map<String, BigDecimal> categoryWiseExpense = expenses.stream()
            .collect(Collectors.groupingBy(
                expense -> expense.getCategoryName() != null ? expense.getCategoryName() : "Uncategorized",
                Collectors.reducing(BigDecimal.ZERO, ExpenseDTO::getAmount, BigDecimal::add)
            ));

        // Daily breakdown for charts
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        Map<String, BigDecimal> dailyIncome = incomes.stream()
            .collect(Collectors.groupingBy(
                income -> income.getAddedDate().toLocalDate().format(dateFormatter),
                Collectors.reducing(BigDecimal.ZERO, IncomeDTO::getAmount, BigDecimal::add)
            ));

        Map<String, BigDecimal> dailyExpense = expenses.stream()
            .collect(Collectors.groupingBy(
                expense -> expense.getAddedDate().toLocalDate().format(dateFormatter),
                Collectors.reducing(BigDecimal.ZERO, ExpenseDTO::getAmount, BigDecimal::add)
            ));

        // Combined transactions for display
        List<RecentTransactionDTO> combinedTransactions = Stream.concat(
            incomes.stream().map(income -> RecentTransactionDTO.builder()
                .id(income.getId())
                .note(income.getNote())
                .categoryName(income.getCategoryName())
                .amount(income.getAmount())
                .addedDate(income.getAddedDate())
                .type("income")
                .build()),
            expenses.stream().map(expense -> RecentTransactionDTO.builder()
                .id(expense.getId())
                .note(expense.getNote())
                .categoryName(expense.getCategoryName())
                .amount(expense.getAmount())
                .addedDate(expense.getAddedDate())
                .type("expense")
                .build())
        ).sorted((a, b) -> b.getAddedDate().compareTo(a.getAddedDate()))
         .collect(Collectors.toList());

        // Build response
        FilterResponseDTO response = FilterResponseDTO.builder()
            .totalIncome(totalIncome)
            .totalExpense(totalExpense)
            .totalBalance(totalIncome.subtract(totalExpense))
            .incomes(incomes)
            .expenses(expenses)
            .combinedTransactions(combinedTransactions)
            .categoryWiseIncome(categoryWiseIncome)
            .categoryWiseExpense(categoryWiseExpense)
            .dailyIncome(dailyIncome)
            .dailyExpense(dailyExpense)
            .totalIncomeCount(incomes.size())
            .totalExpenseCount(expenses.size())
            .build();

        return ResponseEntity.ok(response);
    }

    /**
     * Get category-wise summary (without date filter, for current user)
     */
    @GetMapping("/category-summary")
    public ResponseEntity<Map<String, Object>> getCategorySummary() {
        // Get all incomes and expenses for current user
        List<IncomeDTO> incomes = incomeService.getIncomesForCurrentMonthForCurrentUser();
        List<ExpenseDTO> expenses = expenseService.getExpensesForCurrentMonthForCurrentUser();

        Map<String, BigDecimal> categoryWiseIncome = incomes.stream()
            .collect(Collectors.groupingBy(
                income -> income.getCategoryName() != null ? income.getCategoryName() : "Uncategorized",
                Collectors.reducing(BigDecimal.ZERO, IncomeDTO::getAmount, BigDecimal::add)
            ));

        Map<String, BigDecimal> categoryWiseExpense = expenses.stream()
            .collect(Collectors.groupingBy(
                expense -> expense.getCategoryName() != null ? expense.getCategoryName() : "Uncategorized",
                Collectors.reducing(BigDecimal.ZERO, ExpenseDTO::getAmount, BigDecimal::add)
            ));

        Map<String, Object> response = new HashMap<>();
        response.put("categoryWiseIncome", categoryWiseIncome);
        response.put("categoryWiseExpense", categoryWiseExpense);

        return ResponseEntity.ok(response);
    }
}
