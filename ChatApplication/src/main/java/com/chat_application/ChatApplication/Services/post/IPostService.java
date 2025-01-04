package com.chat_application.ChatApplication.Services.post;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Entities.Post;

import java.util.List;

public interface IPostService {
    ApiResponse<List<Post>> findAll();
    ApiResponse<Post> add(Post post);
    ApiResponse<String> delete(int id);
    ApiResponse<Post> updateCaption(Post post);
    List<Post> postOfUsername(String username);
    Post getPostById(int id);

    int allPost();
    int allPostInMonth();
    int allPostInDay();
}
