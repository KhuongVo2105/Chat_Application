package com.chat_application.ChatApplication.Entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "Roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Role {
    @Id
    String name;

    String description;

    @ManyToMany
    @JoinTable(
            name = "permission_group",
            joinColumns = @JoinColumn(name = "role_id" ),
            inverseJoinColumns = @JoinColumn(name = "permission_id" )
    )
    Set<Permission> permissions;
}
