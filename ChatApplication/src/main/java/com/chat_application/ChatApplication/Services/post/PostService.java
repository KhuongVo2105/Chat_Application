package com.chat_application.ChatApplication.Services.post;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Entities.Post;
import com.chat_application.ChatApplication.Repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PostService implements IPostService {
    @Autowired
    private PostRepository repository;

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
            repository.deleteById(id);
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

        if (!repository.existsById(id)) {
            return ApiResponse.<Post>builder()
                    .code(404)
                    .message("Post not found")
                    .build();
        }

        Post oldPost = repository.findById(id).orElseThrow();
        oldPost.setCaption(newCaption);
        return add(oldPost);
    }
}
