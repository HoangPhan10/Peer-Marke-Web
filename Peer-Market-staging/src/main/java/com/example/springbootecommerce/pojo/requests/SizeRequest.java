package com.example.springbootecommerce.pojo.requests;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SizeRequest {
    @NotNull(message = "Size not null")
    private List<String> sizes;
    @NotNull(message = "id_product not null")
    private Long id_product;
}
