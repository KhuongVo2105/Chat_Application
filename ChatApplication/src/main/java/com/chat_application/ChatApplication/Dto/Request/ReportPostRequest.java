package com.chat_application.ChatApplication.Dto.Request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReportPostRequest {
    private String reporterId;
    private int context;
    private int postId;
}