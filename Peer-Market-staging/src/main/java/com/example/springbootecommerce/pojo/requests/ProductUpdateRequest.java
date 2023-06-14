package com.example.springbootecommerce.pojo.requests;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductUpdateRequest {
    @NotNull(message = "Name not null")
    private String title;

    @NotNull(message = "price not null")
    private Float price;

    @NotNull(message = "description not null")
    private String description;

    @NotNull(message = "quantity not null")
    private long quantity;
}
