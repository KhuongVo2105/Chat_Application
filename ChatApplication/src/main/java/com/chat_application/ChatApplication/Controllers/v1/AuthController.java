package com.chat_application.ChatApplication.Controllers.v1;

import com.chat_application.ChatApplication.Dto.Request.AuthenticationReq;
import com.chat_application.ChatApplication.Dto.Request.IntrospectReq;
import com.chat_application.ChatApplication.Dto.Response.ApiResponse;
import com.chat_application.ChatApplication.Dto.Request.LoginRequest;
import com.chat_application.ChatApplication.Dto.Response.AuthenticationRes;
import com.chat_application.ChatApplication.Dto.Response.IntrospectRes;
import com.chat_application.ChatApplication.Services.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    AuthenticationService authService;

    /**
     * This method handles user authentication by processing the provided login credentials.
     * It validates the credentials in the request body, authenticates the user, and returns
     * a response containing the authentication status and a JWT token if successful.
     *
     * @param loginRequest The request object containing the user's email and password for authentication.
     * @return ApiResponse<AuthenticationRes> An ApiResponse object containing the result of the authentication,
     *         where the result includes the authentication status and a JWT token if the authentication is successful.
     */
    @PostMapping("/token")
    ApiResponse<AuthenticationRes> token(@RequestBody AuthenticationReq loginRequest) {
        return ApiResponse.<AuthenticationRes>builder()
                .result(authService.authenticate(loginRequest))
                .build();
    }

    /**
     * This method handles the introspection of a given token to determine its validity.
     * It processes the token provided in the request body and returns a response
     * indicating whether the token is valid.
     *
     * @param request The request object containing the token to be introspected.
     * @return ApiResponse<IntrospectRes> An ApiResponse object containing the result of the introspection,
     *         where the result indicates whether the token is valid.
     * @throws ParseException If there is an error parsing the token.
     * @throws JOSEException If there is an error processing the JOSE (JSON Object Signing and Encryption)
     *         object.
     */
    @PostMapping("/introspect")
    ApiResponse<IntrospectRes> introspect(@RequestBody IntrospectReq request) throws ParseException, JOSEException {
        return ApiResponse.<IntrospectRes>builder()
                .result(authService.introspect(request))
                .build();
    }

}
