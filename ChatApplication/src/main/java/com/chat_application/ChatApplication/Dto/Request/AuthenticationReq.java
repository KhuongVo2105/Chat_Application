package com.chat_application.ChatApplication.Dto.Request;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationReq {
    @Pattern(regexp = "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$",
            message = "The email format is incorrect. Please use a valid email format (e.g., example@domain.com).")
    String email;
    @Size(min = 6, message = "Password must be at least 6 characters long.")
    String password;
}
