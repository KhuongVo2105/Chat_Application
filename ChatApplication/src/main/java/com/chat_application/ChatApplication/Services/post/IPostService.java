package com.chat_application.ChatApplication.Services.post;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Entities.Post;
import com.chat_application.ChatApplication.Entities.User;

import java.util.List;

public interface IPostService {
    ApiResponse<List<Post>> findAll();
    ApiResponse<List<Post>> findAllByOneUser(User user);
    ApiResponse<List<Post>> findAllByUserList(List<User> users);
    ApiResponse<Post> add(Post post);
    ApiResponse<String> delete(int id);
    ApiResponse<Post> updateCaption(int postId, String caption);

    ApiResponse<Post> updateVisible(int postId, boolean visible);
}
