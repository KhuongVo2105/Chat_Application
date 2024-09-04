package com.chat_application.ChatApplication.Services;

import com.chat_application.ChatApplication.Dto.Request.UserCreateReq;
import com.chat_application.ChatApplication.Dto.Request.UserReq;
import com.chat_application.ChatApplication.Dto.Response.UserResponse;
import com.chat_application.ChatApplication.Entities.User;
import com.chat_application.ChatApplication.Enums.Role;
import com.chat_application.ChatApplication.Exceptions.AppException;
import com.chat_application.ChatApplication.Exceptions.ErrorCode;
import com.chat_application.ChatApplication.Mapper.UserMapper;
import com.chat_application.ChatApplication.Repositories.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;

    public UserResponse createUser(UserCreateReq req) {
        if (userRepository.existsByEmail(req.getEmail())) throw new AppException(ErrorCode.EMAIL_EXISTED);
        if (userRepository.existsByUsername(req.getUsername())) throw new AppException(ErrorCode.USERNAME_EXISTED);

        User user = userMapper.toUser(req);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreated_at(new Timestamp(System.currentTimeMillis()));
        user.setUpdated_at(new Timestamp(System.currentTimeMillis()));

        HashSet<String> roles = new HashSet<>();
        roles.add(Role.USER.name());
//        user.setRoles(roles);

        user = userRepository.save(user);
        return userMapper.toUserResponse(user);
    }

    public List<UserResponse> getAll() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserResponse).toList();
    }

    public UserResponse get(String id) {
        return userMapper.toUserResponse(findById(id));
    }

    public UserResponse update(String id, UserReq request) {
        var user = findById(id);
        userMapper.updateUser(user, request);
        user.setUpdated_at(new Timestamp(System.currentTimeMillis()));

        return userMapper.toUserResponse(userRepository.save(user));
    }

    private User findById(String id) {
        return userRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    public void delete(String id) {
        userRepository.deleteById(UUID.fromString(id));
    }

}
