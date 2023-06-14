package com.example.springbootecommerce.service;

import com.example.springbootecommerce.pojo.entity.Role;
import com.example.springbootecommerce.pojo.entity.Shop;
import com.example.springbootecommerce.pojo.requests.RoleRequest;
import com.example.springbootecommerce.pojo.requests.ShopRequest;

public interface ShopService {

    Shop createShop(ShopRequest request);

    Shop getShopByUserId(Long id);

}
