package com.chat_application.ChatApplication.Controllers.v1;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Dto.Request.LoginRequest;
import com.chat_application.ChatApplication.Dto.Response.AuthenticationRes;
import com.chat_application.ChatApplication.Services.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthController {

    AuthenticationService authService;

    @GetMapping("/log-in")
    ApiResponse<AuthenticationRes> login(@RequestBody LoginRequest loginRequest) {
        var result = authService.authenticate(loginRequest);

        return ApiResponse.<AuthenticationRes>builder()
                .result(result)
                .build();
    }
}
