package com.chat_application.ChatApplication.Services.follows;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Entities.Follow;
import com.chat_application.ChatApplication.Entities.User;

import java.util.List;

public interface IFollowService {
    ApiResponse<List<Follow>> getFollowByUserId(User followerUser);
    ApiResponse<Follow> add(Follow follow);
}
