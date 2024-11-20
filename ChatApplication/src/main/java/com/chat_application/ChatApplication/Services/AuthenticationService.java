package com.chat_application.ChatApplication.Services;

import com.chat_application.ChatApplication.Dto.Request.AuthenticationReq;
import com.chat_application.ChatApplication.Dto.Request.IntrospectReq;
import com.chat_application.ChatApplication.Dto.Request.LoginRequest;
import com.chat_application.ChatApplication.Dto.Response.AuthenticationRes;
import com.chat_application.ChatApplication.Dto.Response.IntrospectRes;
import com.chat_application.ChatApplication.Entities.EmailVerify;
import com.chat_application.ChatApplication.Entities.User;
import com.chat_application.ChatApplication.Exceptions.AppException;
import com.chat_application.ChatApplication.Exceptions.ErrorCode;
import com.chat_application.ChatApplication.Repositories.EmailVerifyRepository;
import com.chat_application.ChatApplication.Repositories.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.mail.MessagingException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Random;
import java.util.StringJoiner;
import java.util.UUID;

@Slf4j
@Data
@RequiredArgsConstructor
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {

    @NonFinal
    @Value("${jwt.signerKey}")
    String SIGNER_KEY;
    EmailVerifyRepository emailVerifyRepository;
    MailService mailService;
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    /**
     * @param request
     * @return
     */
    public AuthenticationRes authenticate(AuthenticationReq request) {
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        if (user == null) {
            throw new RuntimeException("Username not found");
        }
        if (user.getStatusAccount() == -1) {
            throw new RuntimeException("Account is locked");
        } else if (user.getStatusAccount() == 0) {
            throw new RuntimeException("Please active to login!");
        }
        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (!authenticated) throw new AppException(ErrorCode.UNAUTHENTICATED);

        return AuthenticationRes.builder()
                .authenticated(true)
                .token(generateToken(user))
                .build();
    }

    public boolean activeByEmailVerify(String userId, String passTemp) {
        EmailVerify emailVerify = emailVerifyRepository.findByUserId(userId);
        if (emailVerify == null) {
            throw new RuntimeException("Email verify not found");
        } else {
            if (emailVerify.getPassword().equals(passTemp) && emailVerify.getExpiredAt().after(new Timestamp(new Date().getTime()))) {
                User user = userRepository.findById(UUID.fromString(userId)).orElse(null);
                if (user == null) {
                    throw new RuntimeException("User not found");
                } else {
                    user.setStatusAccount((byte) 1);
                    userRepository.save(user);
                    emailVerifyRepository.delete(emailVerify);
                    return true;
                }
            } else {
                throw new RuntimeException("Password is incorrect or is expired");
            }
        }
    }

    public boolean resendEmailVerify(String userId) {
        EmailVerify emailVerify = emailVerifyRepository.findByUserId(userId);
        if (emailVerify == null) {
            throw new RuntimeException("Email verify not found");
        }
        User user = userRepository.findById(UUID.fromString(userId)).orElse(null);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        try {
            String passTemp = randomPassword(6);
            boolean sended = mailService.sendEmail(user, passTemp);
            if (sended) {
                log.info("Email sent successfully");
                emailVerify.setExpiredAt(Timestamp.from(Instant.now().plus(Duration.ofMinutes(5))));
                emailVerify.setPassword(passTemp);
                emailVerifyRepository.save(emailVerify);
            } else {
                log.warn("Failed to send email");
                return false;
            }
            return true;
        } catch (MessagingException | jakarta.mail.MessagingException e) {
            log.error("Error sending email", e);
            throw new RuntimeException("Error sending email", e);
        }
    }

    private String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getEmail())
                .issuer("instagram.com")
                .issueTime(new Date())
                .expirationTime(
                        new Date(Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli())
                )
                .claim("scope", buildScope(user))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create token", e);
            throw new RuntimeException(e);
        }
    }

    public IntrospectRes introspect(IntrospectReq request) throws JOSEException, ParseException {
        var token = request.getToken();

        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        return IntrospectRes.builder()
                .valid(verified && expiryTime.after(new Date()))
                .build();
    }

    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");
//        if (!CollectionUtils.isEmpty(user.getRoles()))
//            user.getRoles().forEach(stringJoiner::add);

        return stringJoiner.toString();
    }

    public String randomPassword(int lenght) {
        String password = "";
        String number = "0123456789";
        String allChar = number;
        Random random = new Random();
        for (int i = 0; i < lenght; i++) {
            password += allChar.charAt(random.nextInt(allChar.length()));
        }
        return password;
    }
}
