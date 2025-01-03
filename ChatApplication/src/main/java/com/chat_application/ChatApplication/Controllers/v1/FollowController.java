package com.chat_application.ChatApplication.Controllers.v1;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Entities.Follow;
import com.chat_application.ChatApplication.Entities.Media;
import com.chat_application.ChatApplication.Entities.User;
import com.chat_application.ChatApplication.Services.follows.IFollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/follow")
public class FollowController {
    @Autowired
    private IFollowService service;

    @PostMapping("/findAllByUserId")
    public ApiResponse<List<Follow>> findAll(@RequestBody User user) {
        System.out.println(user);
        ApiResponse<List<Follow>> response = service.getFollowByUserId(user);
        return response;
    }
    @PostMapping("/add")
    public ApiResponse<Follow> save(@RequestBody Follow follow) {
        ApiResponse<Follow> response = service.add(follow);
        return response;
    }
}
