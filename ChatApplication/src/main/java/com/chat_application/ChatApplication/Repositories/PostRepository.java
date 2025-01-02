package com.chat_application.ChatApplication.Repositories;

import com.chat_application.ChatApplication.Entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findByUser_IdAndVisibleTrue(UUID userId);
}
