package com.chat_application.ChatApplication.Controllers.v1;

import com.chat_application.ChatApplication.Dto.Request.UsernameRequest;
import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Dto.Response.PostResponseWithoutUser;
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

    @PostMapping("/{id}")
    public Post getPost(@PathVariable int id) {
        return service.getPostById(id);
    }

    /**
     * API endpoint to retrieve a list of posts associated with a specific username.
     * <p>
     * This endpoint accepts a POST request with a JSON body containing the username
     * of the user whose posts are to be fetched. The API will return a response containing
     * a list of posts that are visible and associated with the provided username.
     * <p>
     * Request Body Example:
     * {
     * "username": "KhuongVo2105",
     * "password": "",
     * "email": ""
     * }
     * <p>
     * In this example, the "username" field is required to identify the user. The "password"
     * and "email" fields are included in the request body but are not utilized in this API call.
     * <p>
     * Response:
     * The API will return an ApiResponse object containing a list of PostResponseWithoutUser
     * objects, which represent the posts without any user information. Each post in the response
     * will include details such as the post ID, visibility status, caption, and timestamps for
     * creation and updates.
     * <p>
     * Example Response:
     * {
     * "result": [
     * {
     * "id": 1,
     * "visible": true,
     * "caption": "This is a sample caption for the post.",
     * "createdAt": "2025-01-02T05:23:26.567+00:00",
     * "updatedAt": "2025-01-02T05:23:26.567+00:00"
     * },
     * {
     * "id": 2,
     * "visible": true,
     * "caption": "Another post caption.",
     * "createdAt": "2025-01-03T05:23:26.567+00:00",
     * "updatedAt": "2025-01-03T05:23:26.567+00:00"
     * }
     * ]
     * }
     * <p>
     * This API is useful for clients who want to display a user's posts in their application
     * without exposing any user-related information.
     */
    @PostMapping("/postOfUsername")
    public ApiResponse<List<PostResponseWithoutUser>> postOfUsername(@RequestBody UsernameRequest req) {
        ApiResponse<List<PostResponseWithoutUser>> response = ApiResponse.<List<PostResponseWithoutUser>>builder()
                .result(service.postOfUsername(req.getUsername()))
                .build();
        return response;
    }

    @PostMapping("/allPostInMonth")
    int allPostInMonth() {
        return service.allPostInMonth();
    }

    @PostMapping("/allPostInDay")
    int allPostInDay() {
        return service.allPostInDay();
    }

    @PostMapping("/allPost")
    int allPost() {
        return service.allPost();
    }
}
