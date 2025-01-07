package com.chat_application.ChatApplication.Services.follows;

import com.chat_application.ChatApplication.Dto.Request.FollowRequest;
import com.chat_application.ChatApplication.Dto.Request.UsernameRequest;
import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Dto.Response.FollowingResponse;
import com.chat_application.ChatApplication.Dto.Response.UserResponse;
import com.chat_application.ChatApplication.Entities.Follow;
import com.chat_application.ChatApplication.Entities.Media;
import com.chat_application.ChatApplication.Entities.User;
import com.chat_application.ChatApplication.Mapper.UserMapper;
import com.chat_application.ChatApplication.Repositories.FollowRepository;
import com.chat_application.ChatApplication.Repositories.NotificationRepository;
import com.chat_application.ChatApplication.Repositories.UserRepository;
import com.chat_application.ChatApplication.Services.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class FollowService implements IFollowService {
    FollowRepository followRepository;
    UserRepository userRepository;
    NotificationService notificationService;
    UserMapper userMapper;

    public int getFollowers(UsernameRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).orElse(null);
        return followRepository.findFollowers(user);
    }
    public List<FollowingResponse> getFollowingList(UsernameRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).orElse(null);
        List<FollowingResponse> followingResponseList = followRepository.findFollowingUsersList(user).stream()
                .map(userMapper::toFollowingResponse) // Sử dụng userMapper để chuyển đổi
                .collect(Collectors.toList()); // Thu thập kết quả vào danh sách;
        return followingResponseList;
    }

    public int getFollowing(UsernameRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).orElse(null);
        return followRepository.findFollowingUsers(user);
    }

    @Override
    public ApiResponse<List<Follow>> getFollowByUserId(User followerUser) {
        List<Follow> follows = followRepository.findAllByFollowerUser(followerUser);
        if (!follows.isEmpty()) {
            return ApiResponse.<List<Follow>>builder()
                    .message("Get list follow successfully")
                    .result(follows)
                    .build();
        }
        return ApiResponse.<List<Follow>>builder()
                .message("Get list follow failed")
                .result(null)
                .build();
    }

    @Override
    public ApiResponse<Follow> add(Follow follow) {
        followRepository.save(follow);
        return ApiResponse.<Follow>builder()
                .message("Add follow successfully")
                .result(follow)
                .build();
    }

    public List<UserResponse> suggestUser(String username) {
// Lấy danh sách các ID người dùng đang được theo dõi
        List<UUID> followingIds = followRepository.findFollowingUserIds(username);

        // Nếu không có người dùng nào đang được theo dõi, trả về toàn bộ danh sách ngoại trừ username hiện tại
//        if (followingIds.isEmpty()) {
//            return userRepository.findAllByUsernameNot(username).stream()
//                    .map(user -> UserResponse.builder().id(String.valueOf(user.getId())).username(user.getUsername()).avatar(user.getAvatar()).build())
//                    .toList();
//        }

        // Lấy danh sách người dùng không được theo dõi
        List<User> users = userRepository.findUsersNotFollowedBy(username, followingIds);

        // Chuyển đổi danh sách User thành UserResponse
        return users.stream()
                .map(user -> UserResponse.builder()
                        .id(String.valueOf(user.getId()))
                        .username(user.getUsername())
                        .avatar(user.getAvatar())
                        .birthday(user.getBirthday())
                        .build())
                .toList();
    }

    @Override
    public boolean followOrUnFollow(FollowRequest req) {
        User followerUser = userRepository.findById(UUID.fromString(req.getFollowerId())).orElse(null);
        User followingUser = userRepository.findById(UUID.fromString(req.getFollowingId())).orElse(null);

        if (followerUser == null || followingUser == null) {
            return false;
        }

        Follow follow = Follow.builder()
                .followerUser(followerUser)
                .followingUser(followingUser)
                .build();
        Follow f = followRepository.findByFollowerUserAndFollowingUser(followerUser, followingUser);
        if (f != null) {
            followRepository.delete(f);
            return false;
        }
        followRepository.save(follow);
        String message = followerUser.getUsername() + " đã theo dõi bạn";
        notificationService.addNotification(followingUser.getId().toString(), followerUser.getUsername(),message);
        return true;
    }

    @Override
    public boolean isFollowing(FollowRequest req) {
        User followerUser = userRepository.findById(UUID.fromString(req.getFollowerId())).orElse(null);
        User followingUser = userRepository.findById(UUID.fromString(req.getFollowingId())).orElse(null);

        if (followerUser == null || followingUser == null) {
            return false;
        }

        return followRepository.existsByFollowerUserAndFollowingUser(followerUser, followingUser);
    }
}
