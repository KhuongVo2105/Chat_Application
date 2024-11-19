package com.chat_application.ChatApplication.Dto.Request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MemberAddReq {
    int groupId;
    String userId;
    boolean isLeader;
}
