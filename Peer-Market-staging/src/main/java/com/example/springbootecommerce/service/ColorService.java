package com.example.springbootecommerce.service;

import com.example.springbootecommerce.pojo.entity.Color;
import com.example.springbootecommerce.pojo.requests.ColorRequest;

import java.util.List;

public interface ColorService {
    Color createColor(ColorRequest colorRequest);



    List<Color> listColorAll();

    void deleteColor(Long id);

    List<Color> listColorByProductID(Long id);
}
