package com.chat_application.ChatApplication.Dto.Request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import java.util.UUID;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InfoUserReq {
    @NotBlank(message = "UNAUTHORIZED")
    UUID id;
    @Pattern(regexp = "^[a-zA-Z0-9._-]{3,}$",
            message = "Username must be at least 3 characters long and can only contain letters, numbers, dots, underscores, and hyphens (e.g., user_name123).")
    String username;
    boolean privacy;
}
