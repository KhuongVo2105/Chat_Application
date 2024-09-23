package com.example.identity_service.service;

import com.example.identity_service.dto.request.PermissionRequest;
import com.example.identity_service.dto.request.RoleRequest;
import com.example.identity_service.dto.response.PermissionResponse;
import com.example.identity_service.dto.response.RoleResponse;
import com.example.identity_service.entity.Permission;
import com.example.identity_service.mapper.PermissionMapper;
import com.example.identity_service.mapper.RoleMapper;
import com.example.identity_service.repository.PermissionRepository;
import com.example.identity_service.repository.RoleRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleService {
    RoleRepository roleRepository;
    PermissionRepository permissionRepository;
    RoleMapper roleMapper;

    public RoleResponse create(RoleRequest request) {
        var role = roleMapper.toRole(request);
        role.setPermissions(new HashSet<>(permissionRepository.findAllById(request.getPermissions())));

        return roleMapper.toRoleResponse(roleRepository.save(role));
    }

    public List<RoleResponse> getAll() {
        return roleRepository.findAll()
                .stream().map(roleMapper::toRoleResponse).toList();
    }

    public void delete(String role) {
        roleRepository.deleteById(role);
    }
}
