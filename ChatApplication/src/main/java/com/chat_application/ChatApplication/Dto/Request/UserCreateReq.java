package com.chat_application.ChatApplication.Dto.Request;

import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreateReq {
    @NotBlank(message = "USERNAME_CANNOT_BE_BLANK")
    @Pattern(regexp = "^[a-zA-Z0-9._-]{3,}$", message = "USERNAME_INVALID")
    String username;

    @NotBlank(message = "EMAIL_CANNOT_BE_BLANK")
    @Email(message = "EMAIL_INVALID")
    String email;
    @NotBlank(message = "PASSWORD_CANNOT_BE_BLANK")
    @Size(min = 6, message = "PASSWORD_INVALID")
    String password;
    @Past(message = "INVALID_DOB")
    LocalDate birthday;
}
