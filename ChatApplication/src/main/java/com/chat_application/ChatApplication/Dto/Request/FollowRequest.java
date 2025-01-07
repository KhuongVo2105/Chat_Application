package com.chat_application.ChatApplication.Dto.Request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FollowRequest {
    //    Me
    private String followerId;
    //    Other
    private String followingId;
}