package com.chat_application.ChatApplication.Repositories;

import com.chat_application.ChatApplication.Entities.Like;
import com.chat_application.ChatApplication.Entities.Post;
import com.chat_application.ChatApplication.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepository extends JpaRepository<Like, Integer>{
    @Query("SELECT count(l.post) from Like l group by l.post")
    Integer quantityPost(Post post);

    void deleteByUserAndPost(User user, Post post);

    boolean existsByUserAndPost(User user, Post post);
}


