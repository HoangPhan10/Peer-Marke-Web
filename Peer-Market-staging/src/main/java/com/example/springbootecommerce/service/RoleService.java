package com.example.springbootecommerce.service;

import com.example.springbootecommerce.pojo.entity.Role;
import com.example.springbootecommerce.pojo.requests.RoleRequest;

import java.util.List;

public interface RoleService {
    List<Role> getListRoles();
    Role createRole(RoleRequest request);
}
