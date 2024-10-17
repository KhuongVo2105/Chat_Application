package com.chat_application.ChatApplication.Services.media;


import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Entities.Media;
import com.chat_application.ChatApplication.Repositories.MediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MediaService implements IMediaService {
    @Autowired
    private MediaRepository repository;

    @Override
    public ApiResponse<List<Media>> findAll() {
        List<Media> mediaList = repository.findAll();

        return ApiResponse.<List<Media>>builder()
                .code(200)
                .message("Get list media successfully")
                .result(mediaList)
                .build();
    }

    @Override
    public ApiResponse<List<Media>> add(List<Media> mediaList) {
        List<Media> mediaAdded = repository.saveAll(mediaList);

        return ApiResponse.<List<Media>>builder()
                .code(200)
                .message("Add image successfully")
                .result(mediaAdded)
                .build();
    }

    @Override
    @Transactional
    public ApiResponse<String> delete(List<Media> mediaList) {
        for (Media media : mediaList) {
            int id = media.getId();
            if (!repository.existsById(id)) continue;
            repository.deleteById(id);
        }

        return ApiResponse.<String>builder()
                .code(200)
                .message("Delete image successfully")
                .build();
    }
}
