package com.chat_application.ChatApplication.Dto.Response;

import com.chat_application.ChatApplication.Entities.Role;
import jakarta.persistence.ManyToMany;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRes {
    String id, username, password, email;
    Timestamp created_at, updated_at;
    Set<Role> roles;
}
