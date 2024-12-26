package com.chat_application.ChatApplication.Controllers.v1;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Dto.Response.UserResponse;
import com.chat_application.ChatApplication.Entities.Post;
import com.chat_application.ChatApplication.Services.UserService;
import com.chat_application.ChatApplication.Services.post.PostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/search")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SearchController {
    UserService userService;
    PostService postService;
    @GetMapping("/username")
    public ApiResponse<List<UserResponse>> searchByUsername(@RequestParam String content) {
        List<UserResponse> userList =userService.findAllByUsername(content);
        if (userList.isEmpty()) {
            return ApiResponse.<List<UserResponse>>builder()
                    .code(404)
                    .message("User not found")
                    .result(userList).build();
        }
        return ApiResponse.<List<UserResponse>>builder()
                .code(200)
                .message("List User")
                .result(userList).build();
    }

    @GetMapping("/caption")
    public ApiResponse<List<Post>> searchByPost(@RequestParam String content) {
        return postService.findAllByCaption(content);
    }
}
