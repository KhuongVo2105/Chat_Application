package com.chat_application.ChatApplication.Services;

import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Dto.Request.CreateUserReq;
import com.chat_application.ChatApplication.Entities.User;
import com.chat_application.ChatApplication.Exceptions.AppException;
import com.chat_application.ChatApplication.Exceptions.ErrorCode;
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

@Service
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserService {
    @Autowired
    UserRepository userRepository;

    public ApiResponse<String> createUser(CreateUserReq req) {
        if (userRepository.existsByEmail(req.getEmail())) throw new AppException(ErrorCode.USER_EXISTED);

        // Mapper
        User user = new User();
        user.setEmail(req.getEmail());
        user.setUsername(req.getUsername());
        user.setPassword(new BCryptPasswordEncoder().encode(req.getPassword()));
        user.setCreatedAt(Timestamp.from(Instant.now()));
        user.setUpdatedAt(Timestamp.from(Instant.now()));

        userRepository.save(user);

        return ApiResponse.<String>builder()
                .code(200)
                .message("User created successfully")
                .build();
    }
}
