package com.example.identity_service.exception;

import lombok.Data;
import org.springframework.http.HttpStatus;
import lombok.Getter;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    AUTHENTICATION_FAILURE(9998, "Invalid token or unauthorized access", HttpStatus.UNAUTHORIZED),
    PERMISSION_DENIED(9997, "Permission denied", HttpStatus.FORBIDDEN),
    INVALID_KEY(1001, "Invalid message key", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "User existed", HttpStatus.CONFLICT),
    USERNAME_INVALID(1003, "Username must be at least {min} characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Password must be at least {min} characters", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "User not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_DOB(1008, "Your age must be at least {min}", HttpStatus.BAD_REQUEST),
    EMAIL_NOT_EXISTED(1010, "Email not existed", HttpStatus.NOT_FOUND),
    EMAIL_INVALID(1011, "Email is not in correct format", HttpStatus.BAD_REQUEST),
    TOKEN_INVALID(1020, "Token must be at least {min} characters", HttpStatus.BAD_REQUEST),
    TOKEN_NOT_EXISTED(1021, "Token not existed", HttpStatus.NOT_FOUND),
    TOKEN_CREATION_FAILED(1022, "Token generation or update failed. Please try again later.", HttpStatus.BAD_REQUEST);

    private final int code;
    private final String message;
    private final HttpStatus status;

    ErrorCode(int code, String message, HttpStatus status) {
        this.code = code;
        this.message = message;
        this.status = status;
    }
}
