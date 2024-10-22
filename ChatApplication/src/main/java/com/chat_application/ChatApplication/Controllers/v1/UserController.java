package com.chat_application.ChatApplication.Controllers.v1;

import com.chat_application.ChatApplication.Dto.Request.AvatUserReq;
import com.chat_application.ChatApplication.Dto.Request.InfoUserReq;
import com.chat_application.ChatApplication.Dto.Request.UserReq;
import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Dto.Request.UserCreateReq;
import com.chat_application.ChatApplication.Dto.Response.AvatUserResp;
import com.chat_application.ChatApplication.Dto.Response.InfoUserResp;
import com.chat_application.ChatApplication.Dto.Response.UserResponse;
import com.chat_application.ChatApplication.Services.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/v1/users")
public class UserController {
    UserService userService;

    @PostMapping
    ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreateReq req) {

        return ApiResponse.<UserResponse>builder()
                .result(userService.createUser(req))
                .build();
    }

    @PostMapping("/updateInfo")
    ResponseEntity<InfoUserResp> updateInfoUser(@RequestBody InfoUserReq req){
        return ResponseEntity.ok(userService.updateInfoUser(req));
    }

    @PostMapping("/updateAvat")
    AvatUserResp updateAvatUser(@RequestBody AvatUserReq req){
        return userService.updateAvatUser(req);
    }
    @GetMapping
    ApiResponse<List<UserResponse>> getUsers() {
        return ApiResponse.<List<UserResponse>>builder()
                .result(userService.getAll())
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<UserResponse> getUser(@PathVariable String id) {

        return ApiResponse.<UserResponse>builder()
                .result(userService.get(id))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<UserResponse> update(@PathVariable String id, @RequestBody UserReq request) {

        return ApiResponse.<UserResponse>builder()
                .result(userService.update(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> delete(@PathVariable String id) {
        userService.delete(id);

        return ApiResponse.<Void>builder()
                .message("'" + id + "' was deleted")
                .build();
    }

    @PostMapping("/my-info")
    ApiResponse<UserResponse> getMyInfo(){
        return ApiResponse.<UserResponse>builder().result(userService.getMyInfo()).build();
    }
}
