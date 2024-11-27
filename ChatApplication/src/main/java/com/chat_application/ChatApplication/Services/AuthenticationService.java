package com.chat_application.ChatApplication.Services;

import com.chat_application.ChatApplication.Dto.Request.AuthenticationReq;
import com.chat_application.ChatApplication.Dto.Request.IntrospectReq;
import com.chat_application.ChatApplication.Dto.Request.LoginRequest;
import com.chat_application.ChatApplication.Dto.Response.AuthenticationRes;
import com.chat_application.ChatApplication.Dto.Response.IntrospectRes;
import com.chat_application.ChatApplication.Entities.User;
import com.chat_application.ChatApplication.Exceptions.AppException;
import com.chat_application.ChatApplication.Exceptions.ErrorCode;
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

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;

@Slf4j
@Data
@RequiredArgsConstructor
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {

    @NonFinal
    @Value("${jwt.signerKey}")
    String SIGNER_KEY;
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    /**
     * @param request
     * @return
     */
    public AuthenticationRes authenticate(AuthenticationReq request) {
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));
        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (!authenticated) throw new AppException(ErrorCode.UNAUTHENTICATED);

        return AuthenticationRes.builder()
                .authenticated(true)
                .token(generateToken(user))
                .build();
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
}
