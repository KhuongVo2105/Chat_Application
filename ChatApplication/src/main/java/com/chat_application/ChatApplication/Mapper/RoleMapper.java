package com.chat_application.ChatApplication.Mapper;

import com.chat_application.ChatApplication.Dto.Request.RoleRequest;
import com.chat_application.ChatApplication.Dto.Response.RoleResponse;
import com.chat_application.ChatApplication.Entities.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mapping(target = "permissions", ignore = true)
    Role toRole(RoleRequest request);
    RoleResponse toRoleResponse(Role permission);
}
