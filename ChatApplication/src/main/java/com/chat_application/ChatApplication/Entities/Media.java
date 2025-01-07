package com.chat_application.ChatApplication.Entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "Medias")
@Data
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    String mediaUrl;
    Timestamp createdAt;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    Post post;

    @PrePersist
    public void prePersist() {
        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        this.createdAt = timestamp;
    }
}
