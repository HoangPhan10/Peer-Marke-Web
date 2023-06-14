package com.example.springbootecommerce.service;

import com.example.springbootecommerce.pojo.entity.Product;
import com.example.springbootecommerce.pojo.requests.ProductRequest;
import com.example.springbootecommerce.pojo.requests.ProductUpdateRequest;
import com.example.springbootecommerce.pojo.responses.ProductPageResponse;
import com.example.springbootecommerce.pojo.responses.ProductResponse;

import java.util.List;

public interface ProductService {


    Product saveProduct(ProductRequest productRequest);

    void deleteProductById(Long id);

    Product updateProduct(ProductUpdateRequest productUpdateRequest, Long id);

    List<ProductResponse> listAll();
    List<ProductResponse> listProductByTypeId(Long typeId);
    List<ProductResponse> listProductByShopId(Long id);

    ProductResponse findProductById(Long id);

    ProductPageResponse getProductByPage(int page, int limit,long id);
}
