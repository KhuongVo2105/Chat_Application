package com.chat_application.ChatApplication.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "Users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    String username, password;
    @Email(message = "EMAIL_INVALID")
    String email;
    boolean privacy;
    byte status;
    String avatar;
    LocalDate birthday;
    Timestamp createdAt, updatedAt;
    @ManyToMany
    Set<Role> roles;

    @PrePersist
    public void prePersist() {
        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        this.createdAt = timestamp;
        this.updatedAt = timestamp;
    }
}
