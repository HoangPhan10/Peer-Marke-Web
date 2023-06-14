package com.example.springbootecommerce.pojo.requests;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageRequest {
    @NotNull(message = "title not null")
    private String title;
    @NotNull(message = "urls not null")
    private List<String> urls;
    @NotNull(message = "id_product not null")
    private Long id_product;
}
