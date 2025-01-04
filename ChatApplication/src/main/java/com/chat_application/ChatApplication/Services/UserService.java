package com.chat_application.ChatApplication.Services;

import com.chat_application.ChatApplication.Dto.Request.*;
import com.chat_application.ChatApplication.Dto.Response.AvatUserResp;
import com.chat_application.ChatApplication.Dto.Response.InfoUserResp;
import com.chat_application.ChatApplication.Dto.Response.UserResponse;
import com.chat_application.ChatApplication.Entities.Role;
import com.chat_application.ChatApplication.Entities.User;
import com.chat_application.ChatApplication.Enums.ERole;
import com.chat_application.ChatApplication.Exceptions.AppException;
import com.chat_application.ChatApplication.Exceptions.ErrorCode;
import com.chat_application.ChatApplication.Mapper.UserMapper;
import com.chat_application.ChatApplication.Repositories.RoleRepository;
import com.chat_application.ChatApplication.Repositories.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    RoleRepository roleRepository;
    UserRepository userRepository;
    UserMapper userMapper;
    PermissionService permissionService;
    RoleService roleService;
    PasswordEncoder passwordEncoder;

    public UserResponse createUser(UserCreateReq req) {
        if (userRepository.existsByEmail(req.getEmail())) throw new AppException(ErrorCode.EMAIL_EXISTED);
        if (userRepository.existsByUsername(req.getUsername())) throw new AppException(ErrorCode.USERNAME_EXISTED);

        // Mapper
        User user = userMapper.toUser(req);
        user.setStatus((byte) 1);
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setCreatedAt(Timestamp.from(Instant.now()));
        user.setUpdatedAt(Timestamp.from(Instant.now()));

        roleRepository.save(Role.builder()
                .name(ERole.USER.name())
                .description(ERole.USER.name())
                .build());

        Role userRole = roleRepository.findById(ERole.USER.name())
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_EXISTED));
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        user.setRoles(roles);

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
        user.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        return userMapper.toUserResponse(userRepository.save(user));
    }

    private User findById(String id) {
        return userRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    public void delete(String id) {
        userRepository.deleteById(UUID.fromString(id));
    }

    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();

        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return userMapper.toUserResponse(user);
    }

    public InfoUserResp updateInfoUser(InfoUserReq req) {
        try {
            User user = userRepository.findByUsername(req.getUsername()).orElseThrow(() -> new Exception("User not found"));
            user.setUsername(req.getNewUsername());
            user.setPrivacy(req.isPrivacy());
            user.setUpdatedAt(Timestamp.from(Instant.now()));
            userRepository.save(user);

            return InfoUserResp.builder()
                    .username(req.getNewUsername())
                    .privacy(user.isPrivacy())
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("User not exist");
        }
    }

    public AvatUserResp updateAvatUser(AvatUserReq req) {
        try {
            User user = userRepository.findByUsername(req.getUsername()).orElseThrow(() -> new Exception("User not found"));
            user.setAvatar(req.getFile().toString());
            userRepository.save(user);

            return AvatUserResp.builder()
                    .username(user.getUsername())
                    .avatar(user.getAvatar())
                    .build();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public List<UserResponse> allUser() {
        return userRepository.findAll().stream()
                .filter(user -> !user.getUsername().equals("admin"))
                .map(userMapper::toUserResponse).toList();
    }

    public void lockAccount(UsernameRequest request) {
        try {
            User user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new Exception("User not found"));
            if (user.getRoles().contains(roleService.findByName(ERole.ADMIN.name()))) {
                throw new RuntimeException("Can't lock admin account");
            } else {
                if (user.getStatus() == 0) {
                    user.setStatus((byte) 1);
                } else {
                    user.setStatus((byte) 0);
                }
                userRepository.save(user);
            }
        } catch (Exception e) {
            throw new RuntimeException("User not exist");
        }
    }

    public int alluserInMonth() {
        return userRepository.findAll().stream()
                .filter(user -> !user.getUsername().equals("admin") && user.getCreatedAt().toLocalDateTime().getMonthValue() == Timestamp.from(Instant.now()).toLocalDateTime().getMonthValue())
                .toList().size();
    }

    public int alluserNum() {
        return userRepository.findAll().stream()
                .filter(user -> !user.getUsername().equals("admin"))
                .toList().size();
    }

    public int alluserInDay() {
        return userRepository.findAll().stream()
                .filter(user -> !user.getUsername().equals("admin") && user.getCreatedAt().toLocalDateTime().getDayOfMonth() == Timestamp.from(Instant.now()).toLocalDateTime().getDayOfMonth())
                .toList().size();
    }
}
