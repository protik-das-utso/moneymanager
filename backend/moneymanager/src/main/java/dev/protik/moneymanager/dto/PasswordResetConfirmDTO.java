package dev.protik.moneymanager.dto;

import lombok.Data;

@Data
public class PasswordResetConfirmDTO {
    private String token;
    private String newPassword;
}
