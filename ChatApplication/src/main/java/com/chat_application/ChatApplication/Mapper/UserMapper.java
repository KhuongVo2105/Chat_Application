package com.chat_application.ChatApplication.Mapper;

import com.chat_application.ChatApplication.Dto.Request.UserCreateReq;
import com.chat_application.ChatApplication.Dto.Request.UserReq;
import com.chat_application.ChatApplication.Dto.Response.UserRes;
import com.chat_application.ChatApplication.Entities.User;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.sql.Timestamp;
import java.time.Instant;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "created_at", ignore = true)
    @Mapping(target = "updated_at", ignore = true)
    User toUser(UserCreateReq request);
    UserRes toUserResponse(User user);

    void updateUser(@MappingTarget User user, UserReq request);
    @AfterMapping
    default void setTimestamps(@MappingTarget User user) {
        Timestamp now = Timestamp.from(Instant.now());
        user.setCreated_at(now);
        user.setUpdated_at(now);
    }
}
