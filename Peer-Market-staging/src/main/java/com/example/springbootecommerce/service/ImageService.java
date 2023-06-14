package com.example.springbootecommerce.service;

import com.example.springbootecommerce.pojo.entity.Image;
import com.example.springbootecommerce.pojo.requests.ImageRequest;
import com.example.springbootecommerce.pojo.requests.ImageUpdateRequest;

import java.util.List;

public interface ImageService {
    Image createImage(ImageRequest imageRequest);


    List<Image> listImageAll();

    void deleteImage(Long id);

    Image updateImage(ImageUpdateRequest imageUpdateRequest, Long id);

    List<Image> listImageByProductID(Long id);
}
