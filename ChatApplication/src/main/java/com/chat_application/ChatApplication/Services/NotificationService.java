package com.chat_application.ChatApplication.Services;

import com.chat_application.ChatApplication.Dto.Response.NotificationResponse;
import com.chat_application.ChatApplication.Entities.Notification;
import com.chat_application.ChatApplication.Entities.User;
import com.chat_application.ChatApplication.Repositories.NotificationRepository;
import com.chat_application.ChatApplication.Repositories.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NotificationService {
    UserRepository userRepository;
    NotificationRepository notificationRepository;
    PushNotificationService pushNotificationService;
    public void addNotification(String userId, String title, String message) {
        User user = userRepository.findById(UUID.fromString(userId)).orElse(null);
        if (user != null) {
            Notification notification = Notification.builder()
                    .receptUser(user)
                    .title(title)
                    .message(message)
                    .createdAt(Timestamp.from(Instant.now()))
                    .build();
            notificationRepository.save(notification);
            pushNotificationService.sendNotification(title, message, new String[]{userId});
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public List<NotificationResponse> getAllNotifyByUseId(String userId) {
        User user = userRepository.findById(UUID.fromString(userId)).orElse(null);
        List<Notification> notifications;
        if (user != null) {
            notifications = notificationRepository.findAllByReceptUser(user);
            List<NotificationResponse> notificationResponses = new ArrayList<>();
            for (Notification notification : notifications) {
                notificationResponses.add(NotificationResponse.builder()
                        .avatar(user.getAvatar())
                        .message(notification.getMessage())
                        .build());
            }
            return notificationResponses;
        } else {
            throw new RuntimeException("User not found");
        }
    }
}
