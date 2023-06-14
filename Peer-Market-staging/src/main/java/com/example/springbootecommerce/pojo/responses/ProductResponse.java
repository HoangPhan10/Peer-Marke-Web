package com.example.springbootecommerce.pojo.responses;

import com.example.springbootecommerce.pojo.entity.Color;
import com.example.springbootecommerce.pojo.entity.Image;
import com.example.springbootecommerce.pojo.entity.Product;
import com.example.springbootecommerce.pojo.entity.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private Product product;
    private List<Color> colors;
    private List<Image> images;
    private List<Size> sizes;
}
