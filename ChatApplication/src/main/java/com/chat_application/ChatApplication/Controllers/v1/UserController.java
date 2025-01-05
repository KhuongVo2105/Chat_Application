package com.chat_application.ChatApplication.Controllers.v1;

import com.chat_application.ChatApplication.Dto.Request.*;
import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Dto.Response.InfoUserResp;
import com.chat_application.ChatApplication.Dto.Response.UserResponse;
import com.chat_application.ChatApplication.Services.UserService;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;

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
    ResponseEntity<InfoUserResp> updateInfoUser(@RequestBody InfoUserReq req) {
        return ResponseEntity.ok(userService.updateInfoUser(req));
    }

    @PostMapping("/updateAvat")
    public ResponseEntity<String> updateProfilePicture(@RequestParam("file") MultipartFile file,
                                                       @RequestParam("username") String username) {
        // Kiểm tra xem file có rỗng hay không
        if (file == null || file.isEmpty()) {
            return new ResponseEntity<>("File is empty", HttpStatus.BAD_REQUEST);
        }

        String imageUrl = uploadImage(file); // Gọi hàm upload hình ảnh
        if (imageUrl == null) {
            return new ResponseEntity<>("Failed to upload image", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        AvatUserReq avatUserReq = AvatUserReq.builder()
                .username(username)
                .file(imageUrl)
                .build();

        // Lưu imageUrl vào cơ sở dữ liệu của user với userId tương ứng
        userService.updateAvatUser(avatUserReq); // Gọi hàm updateAvatUser trong UserService

        return new ResponseEntity<>("Profile picture updated", HttpStatus.OK);
    }

    public String uploadImage(MultipartFile file) {
        try {
            // Generate a random file name
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

            // Get bucket from Firebase Storage
            Bucket bucket = StorageClient.getInstance().bucket();

            // Upload file to Firebase Storage
            Blob blob = bucket.create(fileName, file.getBytes(), file.getContentType());

            // Get the public download URL
            String fileUrl = String.format("https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media",
                    bucket.getName(),
                    URLEncoder.encode(fileName, StandardCharsets.UTF_8));

            return fileUrl; // Trả về URL
        } catch (IOException e) {
            e.printStackTrace();
            return null; // Trả về null khi có lỗi
        }
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
    ApiResponse<UserResponse> getMyInfo() {
        return ApiResponse.<UserResponse>builder().result(userService.getMyInfo()).build();
    }

    @PostMapping("/alluser")
    List<UserResponse> allUser() {
        return userService.allUser();
    }

    @PostMapping("/alluserNum")
    int alluserNum() {
        return userService.alluserNum();
    }

    @PostMapping("/alluserInMonth")
    int alluserInMonth() {
        return userService.alluserInMonth();
    }

    @PostMapping("/alluserInDay")
    int alluserInDay() {
        return userService.alluserInDay();
    }

    @PostMapping("/lockAccount")
    void allUser(@RequestBody UsernameRequest request) {
        userService.lockAccount(request);
    }

}
