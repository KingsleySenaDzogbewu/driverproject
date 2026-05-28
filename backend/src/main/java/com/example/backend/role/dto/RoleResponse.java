package com.example.backend.role.dto;


import com.example.backend.common.enums.RoleName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoleResponse {

    private Long id;
    private RoleName name;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
