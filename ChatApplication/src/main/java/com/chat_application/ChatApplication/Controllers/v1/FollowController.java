package com.chat_application.ChatApplication.Controllers.v1;

import com.chat_application.ChatApplication.Dto.Request.AuthenticationReq;
import com.chat_application.ChatApplication.Dto.Request.IntrospectReq;
import com.chat_application.ChatApplication.Dto.Request.UsernameRequest;
import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Dto.Response.AuthenticationRes;
import com.chat_application.ChatApplication.Dto.Response.IntrospectRes;
import com.chat_application.ChatApplication.Entities.User;
import com.chat_application.ChatApplication.Services.AuthenticationService;
import com.chat_application.ChatApplication.Services.FollowService;
import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/v1/follow")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@CrossOrigin(origins = "http://localhost:3000")
public class FollowController {

    FollowService followService;

    @PostMapping("/followers")
    List<User> followers(@RequestBody UsernameRequest request) {
        return followService.getFollowers(request);
    }

    @PostMapping("/following")
    List<User> followeing(@RequestBody UsernameRequest request) {
        return followService.getFollowing(request);
    }

}
