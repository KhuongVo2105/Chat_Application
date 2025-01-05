package com.chat_application.ChatApplication.Dto.Request;

import jakarta.validation.constraints.Pattern;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AvatUserReq {
    String username;
    String file; // Thêm thuộc tính để nhận tệp
}
