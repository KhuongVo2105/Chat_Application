package com.chat_application.ChatApplication.Repositories;

import com.chat_application.ChatApplication.Entities.Follow;
import com.chat_application.ChatApplication.Entities.Permission;
import com.chat_application.ChatApplication.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, String> {
    List<Follow> findAllByFollowerUser(User followerUser);
}
