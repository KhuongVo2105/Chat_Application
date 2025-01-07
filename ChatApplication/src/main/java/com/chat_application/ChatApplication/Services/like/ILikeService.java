package com.chat_application.ChatApplication.Services.like;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Entities.Like;
import com.chat_application.ChatApplication.Entities.Media;
import com.chat_application.ChatApplication.Entities.Post;

import java.util.List;


public interface ILikeService {
    ApiResponse<List<Like>> findAll();
    ApiResponse<Like> add(Like like);
    ApiResponse<Like> delete(Like like);
    ApiResponse<Integer> quantityLike(Post post);
    ApiResponse<Boolean> isLike(Like like);
}
