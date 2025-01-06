package com.chat_application.ChatApplication.Controllers.v1;

import com.chat_application.ChatApplication.Dto.Request.PushNotificationReq;
import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Services.PushNotificationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/notify")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PushNotificationController {
    PushNotificationService pushNotificationService;

    @GetMapping
    public ApiResponse<Void> pushNotification(@RequestBody PushNotificationReq notify) {
        pushNotificationService.sendNotification("Đây là test", notify.getMessage(), notify.getUserId());
        return ApiResponse.<Void>builder().message("Gửi thành công").build();
    }
}
