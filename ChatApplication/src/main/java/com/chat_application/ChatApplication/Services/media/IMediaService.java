package com.chat_application.ChatApplication.Services.media;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Entities.Media;

import java.util.List;


public interface IMediaService {
    ApiResponse<List<Media>> findAll();
    ApiResponse<List<Media>> add(List<Media> mediaList);
    ApiResponse<String> delete(int id);
}
