package com.example.springbootecommerce.pojo.requests;

import com.example.springbootecommerce.pojo.entity.Shop;
import com.example.springbootecommerce.pojo.entity.Type;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
    @NotNull(message = "Name not null")
    private String title;

    @NotNull(message = "price not null")
    private Float price;

    @NotNull(message = "description not null")
    private String description;

    @NotNull(message = "quantity not null")
    private long quantity;

    @NotNull(message = "id_shop not null")
    private Long id_shop;

    @NotNull(message = "id_type not null")
    private Long id_type;

    @NotNull(message = "product_info_id not null")
    private Long product_info_id;
}
