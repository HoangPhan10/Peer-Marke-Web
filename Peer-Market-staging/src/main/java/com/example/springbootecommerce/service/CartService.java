package com.example.springbootecommerce.service;

import com.example.springbootecommerce.pojo.entity.Cart;
import com.example.springbootecommerce.pojo.requests.CartRequest;
import com.example.springbootecommerce.pojo.responses.CartResponse;

import java.util.List;

public interface CartService {
    Cart createCart(CartRequest cartRequest);
    CartResponse getCartById(Long id);
    List<CartResponse> listCartByUserId(Long id);
    void deleteCart(Long id);
}
