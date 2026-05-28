package com.example.backend.role.dto;

import com.example.backend.common.enums.RoleName;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoleRequest {

    @NotNull(message = "Role name must not be null")
    private RoleName name;

    @Size(max = 255, message = "Description must not exceed 255 characters")
    private String description;
}