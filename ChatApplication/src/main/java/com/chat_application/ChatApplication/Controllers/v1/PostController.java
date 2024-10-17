package com.chat_application.ChatApplication.Controllers.v1;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Entities.Post;
import com.chat_application.ChatApplication.Services.post.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/post")
public class PostController {
    @Autowired
    private IPostService service;

    @GetMapping("/findAll")
    public ApiResponse<List<Post>> findAll() {
        ApiResponse<List<Post>> response = service.findAll();
        return response;
    }

    @PostMapping("/add")
    public ApiResponse<Post> add(@RequestBody Post post) {
        ApiResponse<Post> response = service.add(post);
        return response;
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<String> add(@PathVariable int id) {
        ApiResponse<String> response = service.delete(id);
        return response;
    }

    @PutMapping("/update")
    public ApiResponse<Post> update(@RequestBody Post post) {
        ApiResponse<Post> response = service.updateCaption(post);
        return response;
    }
}
