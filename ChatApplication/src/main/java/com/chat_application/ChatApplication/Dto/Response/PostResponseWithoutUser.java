package com.chat_application.ChatApplication.Dto.Response;

import com.chat_application.ChatApplication.Entities.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
/**
 * This class represents a response object for a post without any user information.
 * It is designed to encapsulate the details of a post, such as its ID, visibility status,
 * caption, and timestamps for creation and updates. The purpose of this class is to provide
 * a simplified view of the post content, excluding any details about the user who created it.
 *
 * Example JSON representation of this class:
 * {
 *     "id": 1,
 *     "visible": true,
 *     "caption": "This is a sample caption for the post.",
 *     "createdAt": "2025-01-02T05:23:26.567+00:00",
 *     "updatedAt": "2025-01-02T05:23:26.567+00:00"
 * }
 *
 * In this example, the JSON object contains the following fields:
 * - "id": The unique identifier for the post.
 * - "visible": A boolean indicating whether the post is visible to others.
 * - "caption": The text content of the post.
 * - "createdAt": The timestamp indicating when the post was created.
 * - "updatedAt": The timestamp indicating when the post was last updated.
 *
 * This class is useful in scenarios where the user information is not needed, such as
 * when displaying a list of posts in a public feed or when sharing posts with external
 * systems that do not require user details.
 */
public class PostResponseWithoutUser {
    int id;
    boolean visible;
    String caption;
    Timestamp createdAt, updatedAt;
    UUID userId;

    @PrePersist
    public void prePersist() {
        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        this.createdAt = timestamp;
        this.updatedAt = timestamp;
        this.visible = true;
    }
}
