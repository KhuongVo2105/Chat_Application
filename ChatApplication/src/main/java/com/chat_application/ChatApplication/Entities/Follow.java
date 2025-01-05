package com.chat_application.ChatApplication.Entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "Follows")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @ManyToOne
    @JoinColumn(nullable = false)
    User followerUser;

    @ManyToOne
    @JoinColumn(nullable = false)
    User followingUser; // Người mà follower đang theo dõi

    Timestamp createdAt;

    @PrePersist
    public void prePersist() {
        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        this.createdAt = timestamp;
    }
}
