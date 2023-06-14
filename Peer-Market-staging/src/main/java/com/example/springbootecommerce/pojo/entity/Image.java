package com.example.springbootecommerce.pojo.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "images")
@Data
@NoArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String title;

    @ElementCollection
    @CollectionTable(name = "image_urls", joinColumns = @JoinColumn(name = "image_id"))
    @Column(name = "url")
    private List<String> urls = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    private Product product;

}
