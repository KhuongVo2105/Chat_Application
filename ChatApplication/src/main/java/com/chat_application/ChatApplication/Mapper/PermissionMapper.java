package com.chat_application.ChatApplication.Mapper;

import com.chat_application.ChatApplication.Dto.Request.PermissionRequest;
import com.chat_application.ChatApplication.Dto.Response.PermissionResponse;
import com.chat_application.ChatApplication.Entities.Permission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request); // map từ UserCreationRequest thành đối tượng User dựa trên các field giống nhau
    PermissionResponse toPermissionResponse(Permission permission);
}
