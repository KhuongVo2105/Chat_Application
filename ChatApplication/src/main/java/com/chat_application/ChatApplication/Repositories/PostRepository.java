package com.chat_application.ChatApplication.Repositories;

import com.chat_application.ChatApplication.Entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    @Query("select p from Post p where p.caption like %:caption% and p.visible = true")
    List<Post> searchByCaption(String caption);
}
