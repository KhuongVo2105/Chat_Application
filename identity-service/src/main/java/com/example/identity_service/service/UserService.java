package com.example.identity_service.service;

import com.example.identity_service.dto.request.ApiResponse;
import com.example.identity_service.dto.request.UserCreationRequest;
import com.example.identity_service.dto.request.UserUpdateRequest;
import com.example.identity_service.dto.response.ForgotPasswordResponse;
import com.example.identity_service.dto.response.UserResponse;
import com.example.identity_service.entity.Token;
import com.example.identity_service.entity.User;
import com.example.identity_service.enums.Role;
import com.example.identity_service.exception.AppException;
import com.example.identity_service.exception.ErrorCode;
import com.example.identity_service.mapper.UserMapper;
import com.example.identity_service.repository.TokenRepository;
import com.example.identity_service.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    TokenRepository tokenRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;
    JavaMailSender mailSender;

    @NonFinal
    @Value("${server.port}")
    int PORT_SERVER;

    @NonFinal
    @Value("${server.servlet.context-path}")
    String CONTEXT_PATH;


    public UserResponse createRequest(UserCreationRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) throw new AppException(ErrorCode.USER_EXISTED);

        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        HashSet<String> roles = new HashSet<>();
        roles.add(Role.USER.name());
//        user.setRoles(roles);

        return userMapper.toUserResponse(userRepository.save(user));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserResponse).toList();
    }

    @PostAuthorize("returnObject.username == authentication.name")
    public UserResponse getUser(String userId) {
        return userMapper.toUserResponse(
                userRepository.findById(userId).orElseThrow(
                        () -> new RuntimeException("User not found"))
        );
    }

    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        User user = userRepository.findByUsername(name)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }

    public User updateUser(String userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("User not found")
        );

        userMapper.updateUser(user, request);
        return userRepository.save(user);
    }

    public void deleteById(String userId) {
        userRepository.deleteById(userId);
    }

    public ForgotPasswordResponse forgotPassword(String email) {
        // Kiểm tra email có tồn tại trong hệ thống không
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new AppException(ErrorCode.EMAIL_NOT_EXISTED)
        );

        // Giả sử tạo token đặt lại mật khẩu (bạn có thể thay bằng cơ chế sinh token an toàn)
        int resetToken = generateResetToken();

        // Tìm kiếm token có sẵn trong cơ sở dữ liệu
        Token existingToken = tokenRepository.findByUser(user)
                .orElse(null); // Nếu không tìm thấy token, sẽ trả về null

        try {
            if (existingToken != null) {
                // Nếu token đã tồn tại, cập nhật thông tin token
                existingToken.setToken(resetToken); // Cập nhật giá trị token mới
                existingToken.setCreateAt(new Date()); // Cập nhật thời gian tạo
                existingToken.setExpiredAt(new Date(Instant.now().plus(10, ChronoUnit.MINUTES).toEpochMilli())); // Cập nhật thời gian hết hạn
                tokenRepository.save(existingToken); // Lưu token đã cập nhật
            } else {
                // Nếu token chưa tồn tại, tạo mới token
                Token newToken = Token.builder()
                        .token(resetToken)
                        .createAt(new Date())
                        .expiredAt(new Date(Instant.now().plus(10, ChronoUnit.MINUTES).toEpochMilli()))
                        .user(user) // Gán người dùng cho token
                        .build();
                tokenRepository.save(newToken); // Lưu token mới
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }

        // Gửi email với token
        sendPasswordResetEmail(user.getEmail(), resetToken + "");

        // Tạo phản hồi cho phía client
        return ForgotPasswordResponse.builder()
                .email(user.getEmail())
                .message("Password reset email has been sent successfully.")
                .token(resetToken + "")
                .build();
    }

    // Phương thức sinh mã token
    private int generateResetToken() {
        Random random = new Random();
        // Tạo số nguyên ngẫu nhiên có 6 chữ số
        int otp = 100000 + random.nextInt(900000); // Số ngẫu nhiên từ 1000 đến 9999

        return (otp);
    }

    // Phương thức gửi email
    private void sendPasswordResetEmail(String email, String resetToken) {

        String resetUrl = "http://localhost" + ":" + PORT_SERVER + "/" + CONTEXT_PATH + "/users/reset-password";

        // Tạo nội dung email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset Request");
        message.setText("To reset your password, click the link below:\n" + resetUrl);

        // Gửi email
        mailSender.send(message);
    }

    public UserResponse resetPassword(int token) {
        Token tk = tokenRepository.findByToken(token)
                .orElseThrow(() -> new AppException(ErrorCode.TOKEN_NOT_EXISTED));

        User user = userRepository.findById(tk.getUser().getId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        if (!Objects.isNull(user)) {
            String passwd = "matkhaumoi";
            user.setPassword(passwordEncoder.encode(passwd));

            userRepository.save(user);
        }

        return userMapper.toUserResponse(user);
    }
}
