package com.chat_application.ChatApplication.Services;

import com.chat_application.ChatApplication.Dto.Request.UserCreateReq;
import com.chat_application.ChatApplication.Dto.Request.UserReq;
import com.chat_application.ChatApplication.Dto.Response.UserRes;
import com.chat_application.ChatApplication.Entities.User;
import com.chat_application.ChatApplication.Exceptions.AppException;
import com.chat_application.ChatApplication.Exceptions.ErrorCode;
import com.chat_application.ChatApplication.Mapper.UserMapper;
import com.chat_application.ChatApplication.Repositories.UserRepository;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;

    public UserRes createUser(UserCreateReq req) {
        if (userRepository.existsByEmail(req.getEmail())) throw new AppException(ErrorCode.EMAIL_EXISTED);
        if (userRepository.existsByUsername(req.getUsername())) throw new AppException(ErrorCode.USERNAME_EXISTED);
        User user = userMapper.toUser(req);
        user = userRepository.save(user);
        return userMapper.toUserResponse(user);
    }

    public List<UserRes> getAll() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserResponse).toList();
    }

    public UserRes get(String id) {
        return userMapper.toUserResponse(findById(id));
    }

    public UserRes update(String id, UserReq request) {
        var user = findById(id);
        userMapper.updateUser(user, request);
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
