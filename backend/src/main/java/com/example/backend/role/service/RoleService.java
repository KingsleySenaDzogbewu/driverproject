package com.example.backend.role.service;



import com.example.backend.role.dto.RoleRequest;
import com.example.backend.role.dto.RoleResponse;

import java.util.List;

public interface RoleService {

    RoleResponse createRole(RoleRequest request);

    RoleResponse getRoleById(Long id);

    RoleResponse getRoleByName(String name);

    List<RoleResponse> getAllRoles();

    RoleResponse updateRole(Long id, RoleRequest request);

    void deleteRole(Long id);
}