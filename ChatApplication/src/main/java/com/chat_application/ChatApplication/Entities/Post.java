package com.chat_application.ChatApplication.Entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "Posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    boolean visible;
    String caption;
    Timestamp createdAt, updatedAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;
    @PrePersist
    public void prePersist() {
        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        this.createdAt = timestamp;
        this.updatedAt = timestamp;
        this.visible = true;
    }
}
