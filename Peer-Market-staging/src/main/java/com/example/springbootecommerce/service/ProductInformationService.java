package com.example.springbootecommerce.service;

import com.example.springbootecommerce.pojo.entity.ProductInformation;
import com.example.springbootecommerce.pojo.requests.ProductInformationRequest;
import com.example.springbootecommerce.pojo.requests.ProductRequest;

public interface ProductInformationService {
    ProductInformation createProductInfo(ProductInformationRequest productInformationRequest);

    void deleteProductInfo(Long id);

    ProductInformation updateProductInfo(ProductInformationRequest productInformationRequest, Long id);
}
