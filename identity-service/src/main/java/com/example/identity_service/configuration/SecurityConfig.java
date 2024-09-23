package com.example.identity_service.configuration;

import com.example.identity_service.dto.request.ApiResponse;
import com.example.identity_service.enums.Role;
import com.example.identity_service.exception.ErrorCode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Value("${jwt.signerKey}")
    private String SIGNER_KEY;
    private final String[] PUBLIC_ENDPOINTS = {
            "/users", "/auth/token", "auth/introspect", "auth/logout"
    };

    @Autowired
    private CustomJwtDecoder jwtDecoder;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity.authorizeHttpRequests(request ->
                request.requestMatchers(HttpMethod.POST, PUBLIC_ENDPOINTS)
                        .permitAll()
                        .anyRequest().authenticated());

        httpSecurity.oauth2ResourceServer(
                oauth2 -> oauth2.jwt(jwtConfigurer ->
                        jwtConfigurer.decoder(jwtDecoder)
                                .jwtAuthenticationConverter(jwtAuthenticationConverter()))
        );

        httpSecurity.exceptionHandling(
                exceptionHandling ->
                        exceptionHandling
                                .authenticationEntryPoint(new AuthenticationEntryPoint() {
                                    @Override
                                    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
                                        ApiResponse<String> apiResponse = ApiResponse.<String>builder()
                                                .message(ErrorCode.AUTHENTICATION_FAILURE.getMessage())
                                                .code(ErrorCode.AUTHENTICATION_FAILURE.getCode())
                                                .build();

                                        response.setStatus(HttpStatus.UNAUTHORIZED.value());
                                        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

                                        response.getWriter().write(new ObjectMapper().writeValueAsString(apiResponse));
                                    }
                                })
                                .accessDeniedHandler(new AccessDeniedHandler() {
                                    @Override
                                    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
                                        ApiResponse<String> apiResponse = ApiResponse.<String>builder()
                                                .message(ErrorCode.PERMISSION_DENIED.getMessage())
                                                .code(ErrorCode.PERMISSION_DENIED.getCode())
                                                .build();

                                        response.setStatus(HttpStatus.FORBIDDEN.value());
                                        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

                                        response.getWriter().write(new ObjectMapper().writeValueAsString(apiResponse));
                                    }
                                })
        );

        httpSecurity.csrf(AbstractHttpConfigurer::disable);

        return httpSecurity.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);

        return jwtAuthenticationConverter;
    }
}
