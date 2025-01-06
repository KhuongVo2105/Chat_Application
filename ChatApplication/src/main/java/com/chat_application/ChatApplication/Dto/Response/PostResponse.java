package com.chat_application.ChatApplication.Dto.Response;

import jakarta.persistence.PrePersist;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostResponse {
    int id;
    boolean visible;
    String caption, username, userId;
    Timestamp createdAt;

    @PrePersist
    public void prePersist() {
        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        this.createdAt = timestamp;
        this.visible = true;
    }
}
