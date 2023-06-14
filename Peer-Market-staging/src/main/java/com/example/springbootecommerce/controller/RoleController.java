package com.example.springbootecommerce.controller;

import com.example.springbootecommerce.pojo.requests.RoleRequest;
import com.example.springbootecommerce.pojo.responses.ObjectResponse;
import com.example.springbootecommerce.pojo.entity.Role;
import com.example.springbootecommerce.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/role")
public class RoleController {
    @Autowired
    private RoleService roleService;

    @GetMapping("")
    ResponseEntity<ObjectResponse> getListRole() {
        List<Role> roles = roleService.getListRoles();
        return ResponseEntity.ok().body(
                new ObjectResponse(HttpStatus.OK, "Query list role successfully", roles)
        );
    }

    @PostMapping("/save")
    ResponseEntity<ObjectResponse> createRole(@RequestBody RoleRequest request) {
        Role role = roleService.createRole(request);
        return ResponseEntity.ok().body(
                new ObjectResponse(HttpStatus.OK, "Create role successfully", role)
        );
    }
}
