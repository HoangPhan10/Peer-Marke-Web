package com.example.springbootecommerce.pojo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
@Entity
@Table(name = "comment")
@Data
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length =200)
    private String comment;
    @Column(nullable = false, length =5)
    private long rate ;
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;
    private Long idProduct;
    private Long idCart;
    private Date createdAt;
    private Date updatedAt;
}
