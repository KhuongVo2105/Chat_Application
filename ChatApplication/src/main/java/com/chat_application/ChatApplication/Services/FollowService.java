package com.chat_application.ChatApplication.Services;

import com.chat_application.ChatApplication.Dto.Request.RoleRequest;
import com.chat_application.ChatApplication.Dto.Request.UsernameRequest;
import com.chat_application.ChatApplication.Dto.Response.RoleResponse;
import com.chat_application.ChatApplication.Entities.Role;
import com.chat_application.ChatApplication.Entities.User;
import com.chat_application.ChatApplication.Mapper.RoleMapper;
import com.chat_application.ChatApplication.Repositories.FollowRepository;
import com.chat_application.ChatApplication.Repositories.PermissionRepository;
import com.chat_application.ChatApplication.Repositories.RoleRepository;
import com.chat_application.ChatApplication.Repositories.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FollowService {
    FollowRepository followRepository;
    UserRepository userRepository;

    public List<User> getFollowers(UsernameRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).orElse(null);
        return followRepository.findFollowers(user);
    }

    public List<User> getFollowing(UsernameRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).orElse(null);
        return followRepository.findFollowingUsers(user);
    }
}
