package com.chat_application.ChatApplication.Services.post;

import com.chat_application.ChatApplication.Dto.Request.UsernameRequest;
import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Dto.Response.FollowingResponse;
import com.chat_application.ChatApplication.Dto.Response.PostResponse;
import com.chat_application.ChatApplication.Dto.Response.PostResponseWithoutUser;
import com.chat_application.ChatApplication.Entities.Post;
import com.chat_application.ChatApplication.Entities.User;
import com.chat_application.ChatApplication.Exceptions.AppException;
import com.chat_application.ChatApplication.Exceptions.ErrorCode;
import com.chat_application.ChatApplication.Mapper.PostMapper;
import com.chat_application.ChatApplication.Repositories.PostRepository;
import com.chat_application.ChatApplication.Repositories.UserRepository;
import com.chat_application.ChatApplication.Services.NotificationService;
import com.chat_application.ChatApplication.Services.follows.FollowService;
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
     PostMapper postMapper;
     FollowService followService;
     NotificationService notificationService;
     UserRepository userRepository;

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
        List<FollowingResponse> followingResponses = new ArrayList<>();
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
        User user = userRepository.findById(postAdded.getUser().getId()).orElseThrow(null);
        if (user != null) {
            List<FollowingResponse> followingResponses = followService.getFollowingList(UsernameRequest.builder().username(user.getUsername()).build());
            for (FollowingResponse followingResponse : followingResponses) {
                notificationService.addNotification(followingResponse.getId(), "Bài viết mới", followingResponse.getUsername() + " đã đăng một bài viết mới");
            }
        }
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
    public ApiResponse<List<Post>> findAllByCaption(String caption) {
        List<Post> postList = repository.searchByCaption(caption).stream().toList();
        if (postList.isEmpty()) {
            return ApiResponse.<List<Post>>builder().code(404).message("Post not found").
                    result(postList).
                    build();
        }

        return ApiResponse.<List<Post>>builder().code(200)
                .message("List Post")
                .result(postList)
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
    public List<PostResponseWithoutUser> postOfUsername(String username) {
        if (userRepository.findByUsername(username) == null) {
            throw new RuntimeException("User  not found");
        }
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USERNAME_NOT_EXISTED));

        // Lấy danh sách Post
        List<Post> posts = repository.findByUser_IdAndVisibleTrue(user.getId());

        List<PostResponseWithoutUser> re = new ArrayList<>();
        posts.forEach(p -> {
            var a = PostResponseWithoutUser.builder()
                    .id(p.getId())
                    .userId(repository.findById(p.getId()).get().getUser().getId())
                    .visible(p.isVisible())
                    .caption(p.getCaption())
                    .createdAt(p.getCreatedAt())
                    .updatedAt(p.getUpdatedAt())
                    .build();
            re.add(a);
        });

        // Chuyển đổi List<Post> thành List<PostResponseWithoutUser >
        return re; // Thu thập kết quả vào List
    }

    @Override
    public Post getPostById(int id) {
        if (repository.existsById(id)) {
            return repository.findById(id).orElseThrow();
        } else {
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
    public ApiResponse<List<Post>> findAllPost() {
        List<Post> result = repository.findAll();
        return ApiResponse.<List<Post>>builder()
                .code(200)
                .result(result)
                .build();
    }

    @Override
    public int allPostInMonth() {
        return repository.findAll().stream()
                .filter(post -> post.getCreatedAt().toLocalDateTime().getMonthValue() == Timestamp.from(Instant.now()).toLocalDateTime().getMonthValue())
                .toList().size();
    }
}
