package com.example.springbootecommerce.pojo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length =100)
    private String title;

    @Column(nullable = false, length =20)
    private Float price;

    @Column(nullable = false, length =1000)
    private String description;

    @Column(nullable = false, length =20)
    private long quantity;
    private long sold = 0;
    private Date createdAt;
    private Date updatedAt;

    @ManyToOne(fetch = FetchType.EAGER)
    private Shop shop;

    @ManyToOne(fetch = FetchType.EAGER)
    private Type type;

    @OneToOne(fetch = FetchType.EAGER)
    private ProductInformation productInformation;
}
