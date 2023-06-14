package com.example.springbootecommerce.pojo.requests;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequestArr {
    private String message;
    private Long idCart;
    private Long idShop;
    private Long idTransport;
}
