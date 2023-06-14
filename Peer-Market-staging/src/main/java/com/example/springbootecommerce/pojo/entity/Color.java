package com.example.springbootecommerce.pojo.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name="colors")
@Data
@NoArgsConstructor

public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ElementCollection
    @CollectionTable(name = "color_values", joinColumns = @JoinColumn(name = "color_id"))
    @Column(name = "color", nullable = false)
    private List<String> colors;
    @ManyToOne(fetch = FetchType.EAGER)
    private Product product;
}
