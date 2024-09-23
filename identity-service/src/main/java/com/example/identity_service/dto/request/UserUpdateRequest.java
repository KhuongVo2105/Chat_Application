package com.example.identity_service.dto.request;

import com.example.identity_service.validator.DobConstraint;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {
    String username, password, firstName, lastName;
    
    @DobConstraint(min = 18, message = "INVALID_DOB")
    LocalDate dob;
}
