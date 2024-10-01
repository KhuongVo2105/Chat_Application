package com.chat_application.ChatApplication.Entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Wishlist {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    Timestamp createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @OneToOne
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    Post post;
}
