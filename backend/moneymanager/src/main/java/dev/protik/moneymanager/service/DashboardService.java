package dev.protik.moneymanager.service;

import dev.protik.moneymanager.dto.ExpenseDTO;
import dev.protik.moneymanager.dto.IncomeDTO;
import dev.protik.moneymanager.dto.ProfileDTO;
import dev.protik.moneymanager.dto.RecentTransactionDTO;
import dev.protik.moneymanager.entity.ProfileEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.stream.Stream.concat;


@Service
@RequiredArgsConstructor
public class DashboardService {
    private static final Logger logger = LoggerFactory.getLogger(DashboardService.class);

    private final IncomeService incomeService;
    private final ExpenseService expenseService;
    private final ProfileService profileService;

    public Map<String, Object> getDashboardData() {
        ProfileEntity profile;
        try {
            profile = profileService.getCurrentProfile();
        } catch (Exception e) {
            logger.error("Failed to fetch current profile. User might not be authenticated: {}", e.getMessage());
            return null;
        }

        if (profile == null) {
            logger.error("Failed to fetch current profile. User might not be authenticated.");
            return null;
        }

        Map<String, Object> returnValue = new LinkedHashMap<>();

        List<IncomeDTO> latestIncomes = incomeService.getLatest5IncomesForCurrentUser();
        List<ExpenseDTO> latestExpenses = expenseService.getLatest5ExpensesForCurrentUser();

        // Get today's transactions for the Today modal
        List<IncomeDTO> todayIncomes = incomeService.getTodayIncomesForCurrentUser();
        List<ExpenseDTO> todayExpenses = expenseService.getTodayExpensesForCurrentUser();

        if (latestIncomes == null || latestExpenses == null) {
            logger.error("Failed to fetch income or expense data.");
            return null;
        }

        List<RecentTransactionDTO> recentTransactions = concat(latestIncomes.stream().map(income ->
                        RecentTransactionDTO.builder()
                                .id(income.getId())
                                .note(income.getNote())
                                .profileId(profile.getId())
                                .categoryName(income.getCategoryName())
                                .amount(income.getAmount())
                                .addedDate(income.getAddedDate())
                                .type("income")
                                .build()),
                latestExpenses.stream().map(expense ->
                        RecentTransactionDTO.builder()
                                .id(expense.getId())
                                .note(expense.getNote())
                                .profileId(profile.getId())
                                .categoryName(expense.getCategoryName())
                                .amount(expense.getAmount())
                                .addedDate(expense.getAddedDate())
                                .type("expense")
                                .build()))
                .sorted((a, b) -> {
                    int cmp = b.getAddedDate().compareTo(a.getAddedDate());
                    if (cmp == 0 && a.getCreatedAt() != null) {
                        return  b.getAmount().compareTo(a.getAmount());
                    }
                    return cmp;
                }).collect(Collectors.toList());

        returnValue.put("totalBalance", incomeService.getTotalIncomeForCurrentUser().subtract(expenseService.getTotalExpenseForCurrentUser()));
        returnValue.put("totalIncome", incomeService.getTotalIncomeForCurrentUser());
        returnValue.put("totalExpense", expenseService.getTotalExpenseForCurrentUser());
        returnValue.put("recent5Expenses", latestExpenses);
        returnValue.put("recent5Incomes", latestIncomes);
        returnValue.put("recentTransactions", recentTransactions);

        // Add today's transactions for the Today modal
        List<RecentTransactionDTO> todayTransactions = concat(
                todayIncomes.stream().map(income ->
                        RecentTransactionDTO.builder()
                                .id(income.getId())
                                .note(income.getNote())
                                .profileId(profile.getId())
                                .categoryName(income.getCategoryName())
                                .amount(income.getAmount())
                                .addedDate(income.getAddedDate())
                                .type("income")
                                .build()),
                todayExpenses.stream().map(expense ->
                        RecentTransactionDTO.builder()
                                .id(expense.getId())
                                .note(expense.getNote())
                                .profileId(profile.getId())
                                .categoryName(expense.getCategoryName())
                                .amount(expense.getAmount())
                                .addedDate(expense.getAddedDate())
                                .type("expense")
                                .build()))
                .sorted((a, b) -> b.getAddedDate().compareTo(a.getAddedDate()))
                .collect(Collectors.toList());

        returnValue.put("todayTransactions", todayTransactions);
        ProfileDTO sanitizedProfile = profileService.toDTO(profile);
        returnValue.put("currentUser", sanitizedProfile);

        logger.info("Dashboard data fetched successfully: {}", returnValue);

        return returnValue;

    }
}
