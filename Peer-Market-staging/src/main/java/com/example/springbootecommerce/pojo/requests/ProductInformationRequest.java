package com.example.springbootecommerce.pojo.requests;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductInformationRequest {
    @NotNull(message = "trade_mark not null")
    private String trade_mark;
    @NotNull(message = "material not null")
    private String material;
    @NotNull(message = "sample not null")
    private String sample;
    @NotNull(message = "style not null")
    private String style;
    @NotNull(message = "origin not null")
    private String origin;
    @NotNull(message = "season not null")
    private String season;
    @NotNull(message = "tall_fit not null")
    private String tall_fit;
    @NotNull(message = "very_big not null")
    private String very_big;
    @NotNull(message = "design not null")
    private String design;
    @NotNull(message = "collar not null")
    private String collar;

}
