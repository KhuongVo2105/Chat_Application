package com.chat_application.ChatApplication.Services;

import com.chat_application.ChatApplication.Repositories.IUserRepository;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserService {
    @Autowired
    IUserRepository userRepository;
}
