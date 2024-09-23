package com.chat_application.ChatApplication.Entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.util.Set;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    boolean visible;
    String caption;
    Timestamp createdAt, updatedAt;

    @OneToMany
    Set<Like> likes;

    @OneToMany
    Set<Media> medias;

    @OneToMany
    Set<Comment> comments;
}
