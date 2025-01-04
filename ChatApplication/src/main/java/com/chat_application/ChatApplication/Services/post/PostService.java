package com.chat_application.ChatApplication.Services.post;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Entities.Post;
import com.chat_application.ChatApplication.Entities.User;
import com.chat_application.ChatApplication.Repositories.PostRepository;
import com.chat_application.ChatApplication.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class PostService implements IPostService {
    @Autowired
    private PostRepository repository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public ApiResponse<List<Post>> findAll() {
        List<Post> postList = repository.findAll();

        return ApiResponse.<List<Post>>builder()
                .code(200)
                .message("Get list post successfully")
                .result(postList)
                .build();
    }

    @Override
    public ApiResponse<Post> add(Post post) {
        Post postAdded = repository.save(post);

        return ApiResponse.<Post>builder()
                .code(200)
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
                    .code(200)
                    .message("Delete post successfully")
                    .build();
        }

        return ApiResponse.<String>builder()
                .code(404)
                .message("Post not found")
                .build();
    }

    @Override
    public ApiResponse<Post> updateCaption(Post post) {
        int id = post.getId();
        String newCaption = post.getCaption();

        if (repository.existsById(id)) {
            Post oldPost = repository.findById(id).orElseThrow();
            oldPost.setCaption(newCaption);
            repository.save(oldPost);

            return ApiResponse.<Post>builder()
                    .code(404)
                    .message("Update post successfully")
                    .build();
        }

        return ApiResponse.<Post>builder()
                .code(404)
                .message("Post not found")
                .build();
    }

    @Override
    public List<Post> postOfUsername(String username) {
        if (userRepository.findByUsername(username) == null) {
            throw new RuntimeException("User not found");
        }
        Optional<User> user = userRepository.findByUsername(username);
        return repository.findByUser_IdAndVisibleTrue(user.get().getId());
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
    public int allPostInMonth() {
        return repository.findAll().stream()
                .filter(post -> post.getCreatedAt().toLocalDateTime().getMonthValue() == Timestamp.from(Instant.now()).toLocalDateTime().getMonthValue())
                .toList().size();
    }
}
