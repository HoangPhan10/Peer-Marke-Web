package com.example.springbootecommerce.pojo.requests;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageUpdateRequest {
    @NotNull(message = "title not null")
    private String title;

    @NotNull(message = "url not null")
    private List<String> urls;
}
