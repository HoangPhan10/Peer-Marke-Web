package com.example.springbootecommerce.service;

import com.example.springbootecommerce.pojo.entity.Size;
import com.example.springbootecommerce.pojo.requests.SizeRequest;

import java.util.List;

public interface SizeService {
    Size createSize(SizeRequest sizeRequest);

    void deleteSize(Long id);

    List<Size> listSizeAll();

    List<Size> listSizeByProductID(Long id);
}
