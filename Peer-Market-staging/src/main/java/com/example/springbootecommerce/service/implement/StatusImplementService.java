package com.example.springbootecommerce.service.implement;

import com.example.springbootecommerce.pojo.entity.Status;
import com.example.springbootecommerce.pojo.requests.StatusRequest;
import com.example.springbootecommerce.repository.StatusRepository;
import com.example.springbootecommerce.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatusImplementService implements StatusService {
    @Autowired
    private StatusRepository statusRepository;
    @Override
    public Status createStatus(StatusRequest statusRequest) {
        Status status = new Status();
        status.setName_status(statusRequest.getName_status());
        return statusRepository.save(status);
    }
}
