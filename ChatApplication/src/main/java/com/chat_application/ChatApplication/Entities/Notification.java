package com.chat_application.ChatApplication.Entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "Notification")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @ManyToOne
    @JoinColumn(nullable = false)
    User receptUser; // Người nhaajn tb

    String title, message;
    Timestamp createdAt;

    @PrePersist
    public void prePersist() {
        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        this.createdAt = timestamp;
    }
}
