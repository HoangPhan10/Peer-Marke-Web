package com.example.springbootecommerce.service;

import com.example.springbootecommerce.pojo.entity.Transport;
import com.example.springbootecommerce.pojo.requests.TransportRequest;

import java.util.List;

public interface TransportService {
    Transport save(TransportRequest transportRequest);

    List<Transport> getListTransport();

    void deleteTransport(Long id);
}
