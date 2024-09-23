package com.example.identity_service.dto.request;

import com.example.identity_service.exception.ErrorCode;
import com.example.identity_service.validator.DobConstraint;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {
    @Size(min = 3, message = "USERNAME_INVALID")
    String username;
    @Size(min = 8, message = "INVALID_PASSWORD")
    String password;
    String firstName, lastName;

    @DobConstraint(min = 10, message = "INVALID_DOB")
    LocalDate dob;
}
