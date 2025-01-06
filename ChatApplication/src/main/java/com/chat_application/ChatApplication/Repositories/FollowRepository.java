package com.chat_application.ChatApplication.Repositories;

import com.chat_application.ChatApplication.Entities.Follow;
import com.chat_application.ChatApplication.Entities.Permission;
import com.chat_application.ChatApplication.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FollowRepository extends JpaRepository<Follow, String> {
    List<Follow> findAllByFollowerUser(User followerUser);

    /**
     * Lấy tất cả những người mà người dùng đang theo dõi.
     *
     * @param followerUser người dùng cần tìm người mà họ đang theo dõi
     * @return danh sách người mà người dùng đang theo dõi
     */
    @Query("SELECT count(f.followingUser) FROM Follow f WHERE f.followerUser = :followerUser")
    int findFollowingUsers(User followerUser);

    @Query("SELECT f.followingUser FROM Follow f WHERE f.followerUser = :followerUser")
    List<User> findFollowingUsersList(User followerUser);

    /**
     * Lấy tất cả những người theo dõi một người dùng.
     *
     * @param followingUser người dùng cần tìm người theo dõi
     * @return danh sách người theo dõi
     */
    @Query("SELECT count(f.followerUser) FROM Follow f WHERE f.followingUser = :followingUser")
    int findFollowers(User followingUser);

    //    @Query("SELECT f.followingUser.id FROM Follow f WHERE f.followerUser.username = :username")
//    List<UUID> findFollowingUserIds(@Param("username") String username);
    @Query("SELECT CAST(f.followingUser.id AS uuid) FROM Follow f WHERE f.followerUser.username = :username")
    List<UUID> findFollowingUserIds(@Param("username") String username);
    Follow findByFollowerUserAndFollowingUser(User followerUser, User followingUser);
    boolean existsByFollowerUserAndFollowingUser(User followerUser, User followingUser);
}
