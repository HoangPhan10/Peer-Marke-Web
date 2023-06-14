package com.example.springbootecommerce.pojo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@Table(name = "orders")
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long idStatus;
    private Long idAddress;
    private Long idPayment;
    private Long idUser;
    private Long idShop;
    private Long idCart;
    private Long idTransport;
    private String message;
    private Date created;
    private Date updated;
}
