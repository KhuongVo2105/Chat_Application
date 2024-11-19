package com.chat_application.ChatApplication.Controllers.v1;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Entities.Media;
import com.chat_application.ChatApplication.Entities.Post;
import com.chat_application.ChatApplication.Services.cloudinary.CloudinaryService;
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
