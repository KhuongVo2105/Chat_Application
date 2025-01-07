package com.chat_application.ChatApplication.Repositories;

import com.chat_application.ChatApplication.Entities.Media;
import com.chat_application.ChatApplication.Entities.Post;
import com.chat_application.ChatApplication.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MediaRepository extends JpaRepository<Media, Integer> {
    List<Media> findByPost(Post post);
    @Query("select m.mediaUrl from Media m where m.post.user.id = :userId order by m.createdAt desc")
    List<String> getAllImageOfUserId(UUID userId);
}
