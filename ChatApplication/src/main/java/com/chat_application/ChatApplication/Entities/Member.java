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
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    Timestamp createdAt;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    Group group;

    @OneToOne
    User user;
}