package com.chat_application.ChatApplication.Dto.Response;

import com.chat_application.ChatApplication.Entities.Group;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GroupResponse {

    Group group;
    List<String> userIds;
}
