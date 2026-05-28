package com.example.backend.role.service.impl;


import com.example.backend.role.dto.RoleRequest;
import com.example.backend.role.dto.RoleResponse;
import com.example.backend.role.repository.RoleRepository;
import com.example.backend.role.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    @Transactional
    public RoleResponse createRole(RoleRequest request) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    public RoleResponse getRoleById(Long id) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    public RoleResponse getRoleByName(String name) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    public List<RoleResponse> getAllRoles() {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    @Transactional
    public RoleResponse updateRole(Long id, RoleRequest request) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    @Transactional
    public void deleteRole(Long id) {
        throw new UnsupportedOperationException("Not implemented yet");
    }
}