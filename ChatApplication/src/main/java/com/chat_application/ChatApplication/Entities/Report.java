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
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    byte context;
    Timestamp createdAt;

    @ManyToOne
    @JoinColumn(name = "reporter_id", nullable = false)
    User reporter;

    @OneToOne
    @JoinColumn(name = "reported_id",nullable = false)
    User reported;

    @OneToOne
    @JoinColumn(name = "reported_post_id")
    Post reportedPost;
}
