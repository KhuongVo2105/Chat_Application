package com.chat_application.ChatApplication.Repositories;

import com.chat_application.ChatApplication.Entities.Post;
import com.chat_application.ChatApplication.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findByUser(User user);
    List<Post> findByUser_IdAndVisibleTrue(UUID userId);
    @Query("select p from Post p where p.caption like %:caption% and p.visible = true")
    List<Post> searchByCaption(String caption);
}
