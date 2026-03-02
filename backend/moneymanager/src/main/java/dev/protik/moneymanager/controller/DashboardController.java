package dev.protik.moneymanager.controller;

import dev.protik.moneymanager.service.DashboardService;
import dev.protik.moneymanager.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;
    private final EmailService emailService;

    /**
     * REST API endpoint for dashboard data (GET /dashboard/data)
     * This endpoint requires JWT authentication via Authorization header
     * Returns:
     * - totalIncome: Total income amount
     * - totalExpense: Total expense amount
     * - totalBalance: Balance (income - expense)
     * - recent5Incomes: List of 5 latest income entries
     * - recent5Expenses: List of 5 latest expense entries
     * - recentTransactions: Combined list of recent income and expense transactions (sorted by date)
     * - todayTransactions: List of transactions added today
     * - currentUser: Current logged-in user profile information
     */
    @GetMapping("/data")
    public ResponseEntity<Map<String, Object>> getDashboardData() {
        try {
            Map<String, Object> dashboardData = dashboardService.getDashboardData();

            if (dashboardData == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Unauthorized - Please log in again"));
            }

            return ResponseEntity.ok(dashboardData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to fetch dashboard data: " + e.getMessage()));
        }
    }

    /**
     * Email test endpoint (for development/testing purposes)
     */
    @GetMapping("/mail")
    @ResponseBody
    public Map<String, String> sendMail() {
        emailService.sendMail(
                "protikdas018830@gmail.com",
                "Testing",
                "Hope Working"
        );
        return Map.of("status", "OK", "message", "Email sent successfully");
    }
}
