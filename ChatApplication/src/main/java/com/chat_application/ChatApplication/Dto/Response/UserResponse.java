package com.chat_application.ChatApplication.Dto.Response;

import com.chat_application.ChatApplication.Entities.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String id, username, email, avatar;
    Timestamp createdAt, updatedAt;
    LocalDate birthday;
    boolean privacy;
    byte status;
    Set<Role> roles;
}
