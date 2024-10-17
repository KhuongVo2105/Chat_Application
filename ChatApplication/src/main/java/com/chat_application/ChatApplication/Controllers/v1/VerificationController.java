package com.chat_application.ChatApplication.Controllers.v1;

import com.chat_application.ChatApplication.Dto.Request.AuthenticationReq;
import com.chat_application.ChatApplication.Dto.Request.IntrospectReq;
import com.chat_application.ChatApplication.Dto.Request.VerifyEmailRequest;
import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Dto.Response.AuthenticationRes;
import com.chat_application.ChatApplication.Dto.Response.IntrospectRes;
import com.chat_application.ChatApplication.Dto.Response.VerifyEmailResponse;
import com.chat_application.ChatApplication.Services.AuthenticationService;
import com.chat_application.ChatApplication.Services.EmailService;
import com.nimbusds.jose.JOSEException;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Random;

@RestController
@RequestMapping("/v1/verification")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VerificationController {

    @Autowired
    private EmailService emailService;

    // Endpoint gửi mã xác thực qua email
    @PostMapping("/send-code")
    public ApiResponse<VerifyEmailResponse> sendVerificationCode(@RequestBody @Valid VerifyEmailRequest email) {
        // Trả về thông báo xác nhận
        return ApiResponse.<VerifyEmailResponse>builder()
                .message("Verification code sent to " + email)
                .result(emailService.sendVerificationEmail(email.getEmail()))
                .build();
    }

    @GetMapping("/verify")
    public ApiResponse<Boolean> verifyOTP(@RequestParam String otp, @RequestParam String email){
        return ApiResponse.<Boolean>builder()
                .result(emailService.verifyOTP(otp, email))
                .build();
    }
}
