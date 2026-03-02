package dev.protik.moneymanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FilterResponseDTO {
    // Summary statistics
    private BigDecimal totalIncome;
    private BigDecimal totalExpense;
    private BigDecimal totalBalance;

    // Transaction lists
    private List<IncomeDTO> incomes;
    private List<ExpenseDTO> expenses;
    private List<RecentTransactionDTO> combinedTransactions;

    // Category-wise breakdown
    private Map<String, BigDecimal> categoryWiseIncome;  // Category name -> total amount
    private Map<String, BigDecimal> categoryWiseExpense; // Category name -> total amount

    // Date-wise data for charts
    private Map<String, BigDecimal> dailyIncome;  // Date -> amount
    private Map<String, BigDecimal> dailyExpense; // Date -> amount

    // Counts
    private Integer totalIncomeCount;
    private Integer totalExpenseCount;
}
