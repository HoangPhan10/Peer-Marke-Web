package com.example.springbootecommerce.pojo.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "shops")
@NoArgsConstructor

public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 45,nullable = false, unique = true)
    private String Name;

    @OneToOne(fetch = FetchType.EAGER)
    private User user;

    @OneToOne(fetch = FetchType.EAGER)
    private Address address;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name="shops_transports",
            joinColumns = @JoinColumn(name="shop_id"),
            inverseJoinColumns = @JoinColumn(name="transport_id")
    )
    private List<Transport> transports = new ArrayList<>();


}
