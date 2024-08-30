package com.chat_application.ChatApplication.Dto.Request;

import jakarta.validation.constraints.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateUserReq {
    @NotBlank(message = "Username cannot be blank")
    @Pattern(regexp = "^[a-zA-Z0-9._-]{3,}$",
            message = "Username must be at least 3 characters long and can only contain letters, numbers, dots, underscores, and hyphens (e.g., user_name123).")
    String username;

    @Email()
    @Pattern(regexp = "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$",
            message = "The email format is incorrect. Please use a valid email format (e.g., example@domain.com).")
    String email;
    @Size(min = 6, message = "Password must be at least 6 characters long.")
    String password;
}
