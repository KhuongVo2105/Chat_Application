package com.chat_application.ChatApplication.Services.media;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Entities.Media;
import com.chat_application.ChatApplication.Entities.Post;

import java.util.List;


public interface IMediaService {
    ApiResponse<List<Media>> findAll();
    ApiResponse<List<List<Media>>> findAllByPost(List<Post> posts);
    ApiResponse<List<Media>> add(List<Media> mediaList);

    List<String> getAllImageOfUserId(String userId);

    ApiResponse<String> delete(int id);
}
