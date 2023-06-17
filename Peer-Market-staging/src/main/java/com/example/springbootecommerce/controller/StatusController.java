package com.example.springbootecommerce.controller;

import com.example.springbootecommerce.pojo.entity.Status;
import com.example.springbootecommerce.pojo.requests.StatusRequest;
import com.example.springbootecommerce.pojo.responses.ObjectResponse;
import com.example.springbootecommerce.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/status")
@CrossOrigin(maxAge = 3600)
public class StatusController {
    @Autowired
    private StatusService statusService;
    @PostMapping("/create")
    ResponseEntity<ObjectResponse> create(@RequestBody StatusRequest statusRequest){
        Status status = statusService.createStatus(statusRequest);
        return ResponseEntity.ok().body(
                new ObjectResponse(HttpStatus.OK, "Create status successfully", status)
        );
    }
}
