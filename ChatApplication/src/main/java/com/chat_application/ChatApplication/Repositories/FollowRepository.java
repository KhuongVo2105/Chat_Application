package com.chat_application.ChatApplication.Repositories;

import com.chat_application.ChatApplication.Entities.Follow;
import com.chat_application.ChatApplication.Entities.Role;
import com.chat_application.ChatApplication.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, String> {
    /**
     * Lấy tất cả những người mà người dùng đang theo dõi.
     * @param followerUser người dùng cần tìm người mà họ đang theo dõi
     * @return danh sách người mà người dùng đang theo dõi
     */
    @Query("SELECT f.followingUser FROM Follow f WHERE f.followerUser = :followerUser")
    List<User> findFollowingUsers(User followerUser);

    /**
     * Lấy tất cả những người theo dõi một người dùng.
     * @param followingUser người dùng cần tìm người theo dõi
     * @return danh sách người theo dõi
     */
    @Query("SELECT f.followerUser FROM Follow f WHERE f.followingUser = :followingUser")
    List<User> findFollowers(User followingUser);
}
