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
    USERNAME_EXISTED(1002, "Username already exists. Please choose a different username.", HttpStatus.BAD_REQUEST),
    USERNAME_NOT_EXISTED(1003, "Username not found. Please check the username and try again.", HttpStatus.NOT_FOUND),

    // User Group (code 101x)
    USER_EXISTED(1012, "User existed", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1013, "User not existed", HttpStatus.NOT_FOUND),

    // Email Group (code 102x)
    EMAIL_CANNOT_BE_BLANK(1020, "Email cannot be blank.", HttpStatus.BAD_REQUEST),
    EMAIL_INVALID(1021, "The email format is incorrect. Please use a valid email format (e.g., example@domain.com).", HttpStatus.BAD_REQUEST),
    EMAIL_EXISTED(1022, "Email already exists. Please use a different email address.", HttpStatus.BAD_REQUEST),
    EMAIL_NOT_EXISTED(1023, "Email not found. Please check the email and try again.", HttpStatus.NOT_FOUND),

    // Password Group (code 103x)
    PASSWORD_CANNOT_BE_BLANK(1030, "Password cannot be blank.", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(1031, "Password must be at least 6 characters.", HttpStatus.BAD_REQUEST),
    PASSWORD_EXISTED(1032, "Password is already in use. Please choose a different password.", HttpStatus.BAD_REQUEST),
    PASSWORD_NOT_EXISTED(1033, "Password not found. Please check your credentials.", HttpStatus.NOT_FOUND),

    // Authentication and Authorization (code 104x),
    UNAUTHENTICATED(1040, "Invalid email or password. Please try again.", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1041, "You do not have permission", HttpStatus.FORBIDDEN),

    // Role Group (code 105x)
    ROLE_EXISTED(1052, "Role already exists in the system.", HttpStatus.BAD_REQUEST),
    ROLE_NOT_EXISTED(1053, "Role not found in the system.", HttpStatus.NOT_FOUND),

    // Permission Group (code 106x)
    PERMISSION_EXISTED(1062, "Permission already exists in the system.", HttpStatus.BAD_REQUEST),
    PERMISSION_NOT_EXISTED(1063, "Permission not found in the system.", HttpStatus.NOT_FOUND),

    // OTP Group (code 107x)
    TOKEN_EXISTED(1072, "Token already exists for this user. Please use the current token or wait for it to expire.", HttpStatus.BAD_REQUEST),
    TOKEN_NOT_EXISTED(1073, "Token does not exist or has expired. Please request a new token.", HttpStatus.NOT_FOUND),
    EMAIL_NOT_MATCHED_WITH_TOKEN(1074, "The email provided does not match with the token.", HttpStatus.BAD_REQUEST),
    TOKEN_EXPIRED(1075, "The token has expired.", HttpStatus.BAD_REQUEST),

    // Group groups (code 108x)
    GROUP_NOT_EXISTED(1083, "Group does not exist", HttpStatus.NOT_FOUND),
    GROUP_HAS_NO_MEMBERS(1084, "Group has no members", HttpStatus.NOT_FOUND),

    // Member groups (code 109x)
    MEMBER_NOT_EXISTED(1093, "The user is not a member of this group", HttpStatus.NOT_FOUND),

    // Birthday
    BIRTHDAY_CANNOT_BE_BLANK(2000, "Birthday cannot be blank.", HttpStatus.BAD_REQUEST),

    // Other (code >=3000),
    KEY_INVALID(3001, "Invalid key provided.", HttpStatus.BAD_REQUEST),
    INVALID_DOB(3004, "Your age must be at least {min}.", HttpStatus.BAD_REQUEST)

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