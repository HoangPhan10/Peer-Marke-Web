package com.example.springbootecommerce.pojo.requests;


import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartRequest {
    private Long userId;
    private Long productId;
    private Long quantity;
    private String size;
    private String color;
    private Long total;
}
