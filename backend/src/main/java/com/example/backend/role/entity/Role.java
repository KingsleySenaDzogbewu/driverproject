package com.example.backend.role.entity;

import com.example.backend.common.base.BaseEntity;
import com.example.backend.common.enums.RoleName;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role extends BaseEntity {

    @Enumerated(EnumType.STRING)
    private RoleName name;

//    @Column(nullable = false, length = 255)
    private String description;
}