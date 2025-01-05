package com.chat_application.ChatApplication.Dto.Response;

import com.chat_application.ChatApplication.Entities.Post;
import com.chat_application.ChatApplication.Entities.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReportPostResponse {
    int id, reportedPostId;
    byte context;
    String reporterId, reporterUsername, caption;
    Timestamp createdAt;
}