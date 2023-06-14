package com.example.springbootecommerce.repository;

import com.example.springbootecommerce.pojo.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart,Long> {
    Cart getCartById(Long id);
    List<Cart> getCartsByUserIdAndDeletedAt(Long id,Boolean deleted);
    void deleteCartById(Long id);
}
