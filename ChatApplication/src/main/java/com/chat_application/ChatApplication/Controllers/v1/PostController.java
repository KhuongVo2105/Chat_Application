package com.chat_application.ChatApplication.Controllers.v1;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Entities.Post;
import com.chat_application.ChatApplication.Entities.User;
import com.chat_application.ChatApplication.Services.post.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/v1/post")
public class PostController {
    @Autowired
    private IPostService service;

    @PostMapping("/findAll")
    public ApiResponse<List<Post>> findAll() {
        ApiResponse<List<Post>> response = service.findAll();
        return response;
    }

    @PostMapping("/findAllByOneUser")
    public ApiResponse<List<Post>> findAllByOneUser(@RequestBody User user) {
        ApiResponse<List<Post>> response = service.findAllByOneUser(user);
        return response;
    }

    @PostMapping("/findAllByMultipleUser")
    public ApiResponse<List<Post>> findAllByMultipleUser(@RequestBody List<User> users) {
        ApiResponse<List<Post>> response = service.findAllByUserList(users);
        return response;
    }

    @PostMapping("/add")
    public ApiResponse<Post> add(@RequestBody Post post) {
        System.out.println(post);
        ApiResponse<Post> response = service.add(post);
        return response;
    }

    @PostMapping("/updateCaption")
    public ApiResponse<Post> updateCaption(@RequestBody Post post) {
        ApiResponse<Post> response = service.updateCaption(post.getId(), post.getCaption());
        return response;
    }

    @PostMapping("/updateVisible")
    public ApiResponse<Post> updateVisible(@RequestBody Post post) {
        ApiResponse<Post> response = service.updateVisible(post.getId(), post.isVisible());
        return response;
    }
}
