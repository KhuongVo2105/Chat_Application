package com.chat_application.ChatApplication.Mapper;

import com.chat_application.ChatApplication.Dto.Request.UserCreateReq;
import com.chat_application.ChatApplication.Dto.Request.UserReq;
import com.chat_application.ChatApplication.Dto.Response.FollowingResponse;
import com.chat_application.ChatApplication.Dto.Response.UserResponse;
import com.chat_application.ChatApplication.Entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    User toUser(UserCreateReq request);
    UserResponse toUserResponse(User user);

    void updateUser(@MappingTarget User user, UserReq request);

    FollowingResponse toFollowingResponse(User user);
}
