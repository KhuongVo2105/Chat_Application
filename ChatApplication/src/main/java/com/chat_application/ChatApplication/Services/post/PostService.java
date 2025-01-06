package com.chat_application.ChatApplication.Services.post;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Dto.Response.PostResponse;
import com.chat_application.ChatApplication.Dto.Response.PostResponseWithoutUser;
import com.chat_application.ChatApplication.Entities.Post;
import com.chat_application.ChatApplication.Entities.User;
import com.chat_application.ChatApplication.Exceptions.AppException;
import com.chat_application.ChatApplication.Exceptions.ErrorCode;
import com.chat_application.ChatApplication.Mapper.PostMapper;
import com.chat_application.ChatApplication.Repositories.PostRepository;
import com.chat_application.ChatApplication.Repositories.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostService implements IPostService {

     PostRepository repository;
     UserRepository userRepository;
     PostMapper postMapper;

    @Override
    public ApiResponse<List<Post>> findAll() {
        List<Post> postList = repository.findAll();

        return ApiResponse.<List<Post>>builder()
                .message("Get list post successfully")
                .result(postList)
                .build();
    }

    @Override
    public ApiResponse<List<Post>> findAllByOneUser(User user) {
        List<Post> postList = repository.findByUser_IdAndVisibleTrue(user.getId());

        return ApiResponse.<List<Post>>builder()
                .message("Get list post successfully")
                .result(postList)
                .build();
    }

    @Override
    public ApiResponse<List<Post>> findAllByUserList(List<User> users) {
        List<Post> postList = new ArrayList<>();
        for (User user : users) {
            List<Post> post = repository.findByUser(user);
            if (!post.isEmpty()) {
                postList.addAll(post);
            }
        }
        return ApiResponse.<List<Post>>builder()
                .message("Get list post successfully")
                .result(postList)
                .build();
    }

    @Override
    public ApiResponse<Post> add(Post post) {
        Post postAdded = repository.save(post);

        return ApiResponse.<Post>builder()
                .message("Add post successfully")
                .result(postAdded)
                .build();
    }

    @Override
    @Transactional
    public ApiResponse<String> delete(int id) {
        if (repository.existsById(id)) {
            Post post = repository.findById(id).orElseThrow();
            post.setVisible(false);

            return ApiResponse.<String>builder()
                    .message("Delete post successfully")
                    .build();
        }

        return ApiResponse.<String>builder()
                .message("Post not found")
                .build();
    }

    @Override
    public ApiResponse<Post> updateCaption(int postId, String caption) {
        if (repository.existsById(postId)) {
            Post oldPost = repository.findById(postId).orElseThrow();
            oldPost.setCaption(caption);
            repository.save(oldPost);

            return ApiResponse.<Post>builder()
                    .message("Update post successfully")
                    .build();
        }

        return ApiResponse.<Post>builder()
                .message("Post not found")
                .build();
    }

    @Override
    public ApiResponse<Post> updateVisible(int postId, boolean visible) {
        if (repository.existsById(postId)) {
            Post oldPost = repository.findById(postId).orElseThrow();
            oldPost.setVisible(visible);
            repository.save(oldPost);

            return ApiResponse.<Post>builder()
                    .message("Update post successfully")
                    .build();
        }

        return ApiResponse.<Post>builder()
                .message("Post not found")
                .build();
    }

    @Override
    public List<PostResponseWithoutUser > postOfUsername(String username) {
        if (userRepository.findByUsername(username) == null) {
            throw new RuntimeException("User  not found");
        }
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USERNAME_NOT_EXISTED));

        // Lấy danh sách Post
        List<Post> posts = repository.findByUser_IdAndVisibleTrue(user.getId());

        // Chuyển đổi List<Post> thành List<PostResponseWithoutUser >
        return posts.stream()
                .map(postMapper::toUserResponse) // Sử dụng phương thức ánh xạ
                .collect(Collectors.toList()); // Thu thập kết quả vào List
    }

    @Override
    public Post getPostById(int id) {
        if (repository.existsById(id)) {
            return repository.findById(id).orElseThrow();
        }else{
            throw new RuntimeException("Post not found");
        }
    }

    @Override
    public int allPost() {
        return repository.findAll().size();
    }

    @Override
    public int allPostInDay() {
        return repository.findAll().stream()
                .filter(post -> post.getCreatedAt().toLocalDateTime().getDayOfMonth() == Timestamp.from(Instant.now()).toLocalDateTime().getDayOfMonth())
                .toList().size();
    }

    @Override
    public List<PostResponse> getAllForAdmin() {
        List<Post> posts = repository.findAll();
        List<PostResponse> postResponses = new ArrayList<>();
        for (Post post : posts) {
            PostResponse p = PostResponse.builder()
                    .id(post.getId())
                    .caption(post.getCaption())
                    .createdAt(post.getCreatedAt())
                    .visible(post.isVisible())
                    .userId(String.valueOf(post.getUser().getId()))
                    .username(post.getUser().getUsername())
                    .build();
            postResponses.add(p);
        }
        return postResponses;
    }

    @Override
    public boolean changeVisible(int id) {
        if (repository.existsById(id)) {
            Post post = repository.findById(id).orElseThrow();
            post.setVisible(!post.isVisible());
            repository.save(post);
            return true;
        }
        return true;
    }

    @Override
    public int allPostInMonth() {
        return repository.findAll().stream()
                .filter(post -> post.getCreatedAt().toLocalDateTime().getMonthValue() == Timestamp.from(Instant.now()).toLocalDateTime().getMonthValue())
                .toList().size();
    }
}
