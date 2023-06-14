package com.example.springbootecommerce.pojo.entity;


import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Entity
@Table(name = "address")
@Data
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "address",nullable = false)
    @Length(min = 10)
    private String address;

    @Column(name = "phone",nullable = false,unique = true)
    private String phone;

    @Column(name = "name_receiver",nullable = false)
    private String name_receiver;

    @ManyToOne(fetch = FetchType.EAGER)
    private User user;
}
