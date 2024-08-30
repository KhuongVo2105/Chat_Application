package com.chat_application.ChatApplication.Controllers;

import com.chat_application.ChatApplication.Dto.Request.ApiResponse;
import com.chat_application.ChatApplication.Dto.Request.CreateUserReq;
import com.chat_application.ChatApplication.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;
    @PostMapping
    ApiResponse<String> createUser(@RequestBody CreateUserReq req){
        return userService.createUser(req);
    }

}
