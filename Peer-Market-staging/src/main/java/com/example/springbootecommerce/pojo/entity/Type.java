package com.example.springbootecommerce.pojo.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="types")
@Data
@NoArgsConstructor

public class Type {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name",length = 40,nullable = false,unique = true)
    private String name;
}
