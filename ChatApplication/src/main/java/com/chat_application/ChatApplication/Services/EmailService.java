package com.chat_application.ChatApplication.Services;

import com.chat_application.ChatApplication.Dto.Response.VerifyEmailResponse;
import com.chat_application.ChatApplication.Entities.Token;
import com.chat_application.ChatApplication.Entities.User;
import com.chat_application.ChatApplication.Exceptions.AppException;
import com.chat_application.ChatApplication.Exceptions.ErrorCode;
import com.chat_application.ChatApplication.Repositories.TokenRepository;
import com.chat_application.ChatApplication.Repositories.UserRepository;
import lombok.AccessLevel;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Random;

@Service
@Slf4j
@Data
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmailService {

    JavaMailSender mailSender;
    TokenRepository tokenRepository;
    UserRepository userRepository;
    @NonFinal
    @Value("${spring.mail.username}")
    String FROM_EMAIL;

    public VerifyEmailResponse sendVerificationEmail(String toEmail) {

        if(toEmail.isBlank()){
            throw new AppException(ErrorCode.EMAIL_CANNOT_BE_BLANK);
        }

        boolean emailExists = userRepository.findByEmail(toEmail).isPresent();
        if (emailExists) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }
        // Tạo mới mã OTP và thời gian hết hạn
        int otp = generateVerificationCode();
        Date expiredAt = new Date(Instant.now().plus(5, ChronoUnit.MINUTES).toEpochMilli());
        Date createAt = new Date();

        // Kiểm tra xem đã có Token tồn tại với email này chưa
        Token token = tokenRepository.findByEmail(toEmail).orElse(null);

        if (token != null) {
            // Nếu đã có Token cho email này, cập nhật thông tin mới
            token.setToken(otp);
            token.setCreateAt(createAt);
            token.setExpiredAt(expiredAt);
        } else {
            token = Token.builder()
                    .token(generateVerificationCode())
                    .email(toEmail)
                    .expiredAt(expiredAt)
                    .createAt(createAt)
                    .build();
        }
        tokenRepository.save(token);

        String content = "Dear " + toEmail + ",\n\n" +
                "Thank you for registering with our service. Please use the following verification code to complete your registration:\n\n" +
                token.getToken() + "\n\n" +
                "Alternatively, you can click the following link to verify directly:\n" +
                verificationLink(token.getToken(), toEmail) + "\n\n" +
                "This code is valid for 5 minutes.\n\n" +
                "If you did not request this code, please ignore this email.\n\n" +
                "Best regards,\n" +
                "Instagram";
        sendVerifyEmail(toEmail, "Your Verification Code", content);

        return VerifyEmailResponse.builder()
                .OTP(token.getToken() + "")
                .build();
    }

    private String verificationLink(int token, String toEmail) {
        return "http://localhost:8080/chat-application/v1/verification/verify?otp=" + token + "&email=" + toEmail;
    }

    private int generateVerificationCode() {
        Random random = new Random();
        return random.nextInt(900000) + 100000;  // Mã 6 chữ số
    }

    private void sendVerifyEmail(String toEmail, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(content);
        message.setFrom(FROM_EMAIL);
        mailSender.send(message);
        log.info("Send email is successfully");
    }

    public boolean verifyOTP(String otp, String email) {
        try {
            // Tìm token bằng mã OTP
            Token token = tokenRepository.findByToken(Integer.parseInt(otp))
                    .orElseThrow(() -> new AppException(ErrorCode.TOKEN_NOT_EXISTED));

            // Kiểm tra xem email có khớp với email trong token hay không
            if (!token.getEmail().equals(email)) {
                throw new AppException(ErrorCode.EMAIL_NOT_MATCHED_WITH_TOKEN);
            }

            // Kiểm tra xem token đã hết hạn hay chưa
            if (token.getExpiredAt().before(new Date())) {
                throw new AppException(ErrorCode.TOKEN_EXPIRED);
            }

            // Nếu tất cả điều kiện đều đúng thì trả về true
            return true;

        } catch (NumberFormatException e) {
            log.error("verifyOTP(), error parsing String to Integer for OTP", e);
            throw new RuntimeException("Invalid OTP format", e);
        }
    }
}
