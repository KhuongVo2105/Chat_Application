package com.chat_application.ChatApplication.Controllers.v1;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Entities.Like;
import com.chat_application.ChatApplication.Entities.Post;
import com.chat_application.ChatApplication.Services.like.ILikeService;
import com.chat_application.ChatApplication.Services.post.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/v1/like")
public class LIkeController {
    @Autowired
    private ILikeService service;


    @PostMapping("/findAll")
    public ApiResponse<List<Like>> findAll() {
        ApiResponse<List<Like>> response = service.findAll();
        return response;
    }

    @PostMapping("/add")
    public ApiResponse<Like> add(@RequestBody Like like) {
        System.out.println(like.getPost() + " " + like.getUser());
        ApiResponse<Like> response = service.add(like);
        return response;
    }

    @PostMapping("/delete")
    public ApiResponse<Like> delete(@RequestBody Like like) {
        System.out.println(like.getPost() + " " + like.getUser());
        ApiResponse<Like> response = service.delete(like);
        return response;
    }

    @PostMapping("/quantityLikeByOne")
    public ApiResponse<Integer> quantityLike(@RequestBody Post post) {
        ApiResponse<Integer> response = service.quantityLike(post);
        return response;
    }

    @PostMapping("/isLike")
    public ApiResponse<Boolean> isLike(@RequestBody Like like) {
        ApiResponse<Boolean> response = service.isLike(like);
        return response;
    }
}
