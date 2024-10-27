package com.chat_application.ChatApplication.Repositories;

import com.chat_application.ChatApplication.Entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
}
