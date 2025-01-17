package com.chat_application.ChatApplication.Controllers.v1;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Entities.Media;
import com.chat_application.ChatApplication.Entities.Post;
import com.chat_application.ChatApplication.Services.media.IMediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/v1/media")
public class MediaController {
    @Autowired
    private IMediaService iMediaService;

    @GetMapping("/findAll")
    public ApiResponse<List<Media>> findAll() {
        ApiResponse<List<Media>> response = iMediaService.findAll();
        return response;
    }

    @PostMapping("/findAllByPost")
    public ApiResponse<List<List<Media>>> findAllByPost(@RequestBody List<Post> post) {
        System.out.println(post);
        ApiResponse<List<List<Media>>> response = iMediaService.findAllByPost(post);
        return response;
    }

    @PostMapping("/getAllImageOfUserId")
    public List<String> getAllImageOfUserId(@RequestParam String userId) {
        List<String> response = iMediaService.getAllImageOfUserId(userId);
        return response;
    }
    //quy: c5165bbe-842a-42e3-9609-14a3d0ad72e0
    //phuoc: 0bda33fe-ad7c-4704-a265-c4d7bc3d9b6d

    @PostMapping("/add")
    public ApiResponse<List<Media>> add(@RequestBody List<Media> mediaList) throws IOException {
        ApiResponse<List<Media>> response = iMediaService.add(mediaList);
        return response;
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<String> delete(@PathVariable int id) {
        ApiResponse<String> response = iMediaService.delete(id);
        return response;
    }
}
