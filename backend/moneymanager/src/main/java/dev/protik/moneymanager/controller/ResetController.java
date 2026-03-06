package dev.protik.moneymanager.controller;

import dev.protik.moneymanager.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/password")
@RequiredArgsConstructor
public class ResetController {

    private final ProfileService profileService;

    @PostMapping("/reset/request")
    public ResponseEntity<Map<String, String>> requestReset(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            profileService.initiatePasswordReset(email);
            return ResponseEntity.ok(Map.of("message", "Password reset initiated. Check your email for instructions."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Failed to initiate password reset", "message", e.getMessage()));
        }
    }

    @PostMapping("/reset/confirm")
    public ResponseEntity<Map<String, String>> confirmReset(@RequestBody Map<String, String> confirm) {
        try {
            String token = confirm.get("token");
            String newPassword = confirm.get("newPassword");
            boolean success = profileService.resetPassword(token, newPassword);
            if (!success) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "Invalid or expired token"));
            }
            return ResponseEntity.ok(Map.of("message", "Password has been reset successfully."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Failed to reset password", "message", e.getMessage()));
        }
    }
}
