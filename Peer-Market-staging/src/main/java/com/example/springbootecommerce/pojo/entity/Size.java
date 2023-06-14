package com.example.springbootecommerce.pojo.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name="sizes")
@Data
@NoArgsConstructor

public class Size {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ElementCollection
    @CollectionTable(name = "size_values", joinColumns = @JoinColumn(name = "size_id"))
    @Column(name = "size", nullable = false)
    private List<String> sizes;
    @ManyToOne(fetch = FetchType.EAGER)
    private Product product;

}
