package com.chat_application.ChatApplication.Services.follows;

import com.chat_application.ChatApplication.Dto.Request.UsernameRequest;
import com.chat_application.ChatApplication.Dto.Request.FollowRequest;
import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Dto.Response.UserResponse;
import com.chat_application.ChatApplication.Entities.Follow;
import com.chat_application.ChatApplication.Entities.User;

import java.util.List;

public interface IFollowService {
    ApiResponse<List<Follow>> getFollowByUserId(User followerUser);
    ApiResponse<Follow> add(Follow follow);
    public List<User> getFollowers(UsernameRequest request);

    public List<User> getFollowing(UsernameRequest request);

    List<UserResponse> suggestUser(String username);

    boolean followOrUnFollow(FollowRequest req);
}
