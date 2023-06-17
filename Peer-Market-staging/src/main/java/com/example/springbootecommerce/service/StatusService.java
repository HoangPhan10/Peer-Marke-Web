package com.example.springbootecommerce.service;

import com.example.springbootecommerce.pojo.entity.Status;
import com.example.springbootecommerce.pojo.requests.StatusRequest;

public interface StatusService{
    Status createStatus(StatusRequest statusRequest);
}
