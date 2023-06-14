package com.example.springbootecommerce.repository;

import com.example.springbootecommerce.pojo.entity.Shop;
import com.example.springbootecommerce.pojo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface ShopRepository extends JpaRepository<Shop,Long> {

    Shop findShopsByUserId(Long id);
    Shop findShopsById(Long id);
}
