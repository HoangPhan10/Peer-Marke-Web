package com.example.springbootecommerce.pojo.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 128,nullable = false,unique = true)
    private String email;
    @Column(length = 64,nullable = false)
    private String password;
    @Column(length = 45,nullable = false)
    private String username;
    @Column(length = 1000)
    private String photo;
    private String card;
    @Column(length = 45,nullable = false)
    private String name;
    private Boolean isActive = true;
    private Date createdAt;
    private Date updatedAt;
    @ManyToOne(fetch = FetchType.EAGER)
    private Role role;

}
