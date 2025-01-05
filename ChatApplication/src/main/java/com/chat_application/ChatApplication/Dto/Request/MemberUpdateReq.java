package com.chat_application.ChatApplication.Dto.Request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MemberUpdateReq {
    int groupId;
    String userId;
    Boolean isLeader;
}
