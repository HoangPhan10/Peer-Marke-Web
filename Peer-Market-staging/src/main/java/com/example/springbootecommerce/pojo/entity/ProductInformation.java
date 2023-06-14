package com.example.springbootecommerce.pojo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "product_information")
@Data
public class ProductInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length =100)
    private String trade_mark;
    @Column(nullable = false, length =100)
    private String material;
    @Column(nullable = false, length =100)
    private String sample;
    @Column(nullable = false, length =100)
    private String style;
    @Column(nullable = false, length =100)
    private String origin;
    @Column(nullable = false, length =100)
    private String season;
    @Column(nullable = false, length =100)
    private String tall_fit;
    @Column(nullable = false, length =100)
    private String very_big;
    @Column(nullable = false, length =100)
    private String design;
    @Column(nullable = false, length =100)
    private String collar;
}
