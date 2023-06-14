package com.example.springbootecommerce.pojo.responses;


import com.example.springbootecommerce.pojo.entity.Cart;
import com.example.springbootecommerce.pojo.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartResponse {
    private Cart cart;
    private ProductResponse productResponse;
}
