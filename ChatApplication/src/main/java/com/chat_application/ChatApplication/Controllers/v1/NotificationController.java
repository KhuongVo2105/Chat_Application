package com.chat_application.ChatApplication.Controllers.v1;

import com.chat_application.ChatApplication.Dto.Request.RoleRequest;
import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Dto.Response.NotificationResponse;
import com.chat_application.ChatApplication.Dto.Response.RoleResponse;
import com.chat_application.ChatApplication.Entities.Notification;
import com.chat_application.ChatApplication.Services.NotificationService;
import com.chat_application.ChatApplication.Services.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/v1/notification")
public class NotificationController {

    NotificationService notificationService;

    @PostMapping
    public List<NotificationResponse> getAllNotifyByUseId(@RequestParam String userId){
        List<NotificationResponse> notifications = notificationService.getAllNotifyByUseId(userId);
         return notifications;
    }
}
