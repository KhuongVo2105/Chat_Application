package com.chat_application.ChatApplication.Controllers.v1;

import com.chat_application.ChatApplication.Dto.Request.AvatUserReq;
import com.chat_application.ChatApplication.Dto.Request.InfoUserReq;
import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Dto.Request.CreateUserReq;
import com.chat_application.ChatApplication.Dto.Response.AvatUserResp;
import com.chat_application.ChatApplication.Dto.Response.InfoUserResp;
import com.chat_application.ChatApplication.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/user")
public class UserController {
    @Autowired
    UserService userService;
    @PostMapping
    ApiResponse<String> createUser(@RequestBody CreateUserReq req){
        return userService.createUser(req);
    }

    @PostMapping("/updateInfo")
    ResponseEntity<InfoUserResp> updateInfoUser(@RequestBody InfoUserReq req){
        return ResponseEntity.ok(userService.updateInfoUser(req));
    }

    @PostMapping("/updateAvat")
    AvatUserResp updateAvatUser(@RequestBody AvatUserReq req){
        return userService.updateAvatUser(req);
    }

}
