package com.chat_application.ChatApplication.Services.post;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Entities.Post;
import com.chat_application.ChatApplication.Entities.User;
import com.chat_application.ChatApplication.Repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostService implements IPostService {
    @Autowired
    private PostRepository dao;

    @Override
    public ApiResponse<List<Post>> findAll() {
        List<Post> postList = dao.findAll();

        return ApiResponse.<List<Post>>builder()
                .message("Get list post successfully")
                .result(postList)
                .build();
    }

    @Override
    public ApiResponse<List<Post>> findAllByOneUser(User user) {
        List<Post> postList = dao.findByUser(user);

        return ApiResponse.<List<Post>>builder()
                .message("Get list post successfully")
                .result(postList)
                .build();
    }

    @Override
    public ApiResponse<List<Post>> findAllByUserList(List<User> users) {
        List<Post> postList = new ArrayList<>();
        for (User user : users) {
            List<Post> post = dao.findByUser(user);
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
        Post postAdded = dao.save(post);

        return ApiResponse.<Post>builder()
                .message("Add post successfully")
                .result(postAdded)
                .build();
    }

    @Override
    @Transactional
    public ApiResponse<String> delete(int id) {
        if (dao.existsById(id)) {
            Post post = dao.findById(id).orElseThrow();
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
        if (dao.existsById(postId)) {
            Post oldPost = dao.findById(postId).orElseThrow();
            oldPost.setCaption(caption);
            dao.save(oldPost);

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
        if (dao.existsById(postId)) {
            Post oldPost = dao.findById(postId).orElseThrow();
            oldPost.setVisible(visible);
            dao.save(oldPost);

            return ApiResponse.<Post>builder()
                    .message("Update post successfully")
                    .build();
        }

        return ApiResponse.<Post>builder()
                .message("Post not found")
                .build();
    }
}
