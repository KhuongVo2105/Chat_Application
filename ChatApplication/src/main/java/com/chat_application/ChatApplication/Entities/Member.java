package com.chat_application.ChatApplication.Entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;

@Entity
@Table(name = "GroupMembers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    boolean isLeader;

    Timestamp createdAt;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    Group group;
    @OneToOne
    User user;
}
