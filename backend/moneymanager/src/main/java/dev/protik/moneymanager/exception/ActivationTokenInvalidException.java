package dev.protik.moneymanager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ActivationTokenInvalidException extends RuntimeException {
    public ActivationTokenInvalidException() {
        super("Invalid or expired activation token");
    }

    public ActivationTokenInvalidException(String message) {
        super(message);
    }
}
