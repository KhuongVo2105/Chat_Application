package com.chat_application.ChatApplication.Exceptions;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public enum ErrorCode {

    // Uncategorized
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),

    // Username Group (code 100x)
    USERNAME_CANNOT_BE_BLANK(1000, "Username cannot be blank", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1001, "Username must be at least 3 characters long and can only contain letters, numbers, dots, underscores, and hyphens (e.g., user_name123).", HttpStatus.BAD_REQUEST),
    USERNAME_EXISTED(1002,"", HttpStatus.BAD_REQUEST),
    USERNAME_NOT_EXISTED(1003,"", HttpStatus.NOT_FOUND),

    // User Group (code 101x)
    USER_EXISTED(1012, "User existed", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1013, "User not existed", HttpStatus.NOT_FOUND),

    // Email Group (code 102x)
    EMAIL_CANNOT_BE_BLANK(1020, "Email cannot be blank.", HttpStatus.BAD_REQUEST),
    EMAIL_INVALID(1021, "The email format is incorrect. Please use a valid email format (e.g., example@domain.com).", HttpStatus.BAD_REQUEST),
    EMAIL_EXISTED(1022,"", HttpStatus.BAD_REQUEST),
    EMAIL_NOT_EXISTED(1023,"", HttpStatus.NOT_FOUND),

    // Password Group (code 103x)
    PASSWORD_CANNOT_BE_BLANK(1030, "Password cannot be blank.", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(1031, "Password must be at least 6 characters.", HttpStatus.BAD_REQUEST),
    PASSWORD_EXISTED(1032,"", HttpStatus.BAD_REQUEST),
    PASSWORD_NOT_EXISTED(1033,"", HttpStatus.NOT_FOUND),

    // Authentication and Authorization (code 104x)
    UNAUTHENTICATED(1040, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1041, "You do not have permission", HttpStatus.FORBIDDEN),

    // Other (code >=1050)
    KEY_INVALID(1050, "Uncategorized error", HttpStatus.BAD_REQUEST),
    INVALID_DOB(1051, "Your age must be at least {min}", HttpStatus.BAD_REQUEST),
    ;

    ErrorCode(int code, String message, HttpStatus status) {
        this.code = code;
        this.message = message;
        this.httpStatusCode = status;
    }

    int code;
    String message;
    HttpStatusCode httpStatusCode;
}
