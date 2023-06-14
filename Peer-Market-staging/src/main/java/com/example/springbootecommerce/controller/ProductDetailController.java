package com.example.springbootecommerce.controller;

import com.example.springbootecommerce.pojo.entity.*;
import com.example.springbootecommerce.pojo.requests.*;
import com.example.springbootecommerce.pojo.responses.NotiResponse;
import com.example.springbootecommerce.pojo.responses.ObjectResponse;
import com.example.springbootecommerce.service.ColorService;
import com.example.springbootecommerce.service.ImageService;
import com.example.springbootecommerce.service.ProductInformationService;
import com.example.springbootecommerce.service.SizeService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@CrossOrigin(maxAge = 3600)
@RequestMapping("/product-detail")
public class ProductDetailController {
    @Autowired
    private ColorService colorService;
    @Autowired
    private SizeService sizeService;
    @Autowired
    private ImageService imageService;
    @Autowired
    private ProductInformationService productInformationService;

    @PostMapping("/create-product-info")
    public ResponseEntity<ObjectResponse> createProductInfo(@Valid @RequestBody  ProductInformationRequest productInformationRequest){
        ProductInformation productInfo = productInformationService.createProductInfo(productInformationRequest);
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Create Size successfully", productInfo)
        );
    }
    @DeleteMapping("/delete-product-info")
    public ResponseEntity<NotiResponse> deleteProductInfo(@RequestParam("id") Long id){
        productInformationService.deleteProductInfo(id);
        return ResponseEntity.status(200).body(
                new NotiResponse(HttpStatus.OK, "Delete product_info successfully")
        );
    }
    @PostMapping("/update-product-info")
    public ResponseEntity<ObjectResponse> updateProductInfo(@Valid @RequestBody ProductInformationRequest productInformationRequest,
                                                            @RequestParam("id") Long id){
        ProductInformation productInformation = productInformationService.updateProductInfo(productInformationRequest,id);
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Update product_info successfully", productInformation)
        );
    }

    @PostMapping("/create-size")
    public ResponseEntity<ObjectResponse> createSize(@Valid @RequestBody SizeRequest sizeRequest){
        Size size = sizeService.createSize(sizeRequest);
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Create Size successfully", size)
        );
    }
    @DeleteMapping("/delete-size")
    public ResponseEntity<NotiResponse> deleteSize(@RequestParam("id") Long id){
        sizeService.deleteSize(id);
        return ResponseEntity.status(200).body(
                new NotiResponse(HttpStatus.OK, "Delete Size successfully")
        );
    }
    @GetMapping("/sizes")
    public ResponseEntity<ObjectResponse> getListSize(){
        List<Size> sizes = sizeService.listSizeAll();
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Query list size successfully", sizes)
        );
    }
    @GetMapping("/product-size")
    public ResponseEntity<ObjectResponse> getSizeByProductId(@RequestParam("id") Long id){
        List<Size> sizes = sizeService.listSizeByProductID(id);
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Query list size successfully", sizes)
        );
    }

    @PostMapping("/create-color")
    public ResponseEntity<ObjectResponse> createColor(@Valid @RequestBody ColorRequest colorRequest){
        Color color = colorService.createColor(colorRequest);
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Create color successfully", color)
        );
    }
    @GetMapping("/colors")
    public ResponseEntity<ObjectResponse> getListColor(){
        List<Color> colors = colorService.listColorAll();
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Query list color successfully", colors)
        );
    }
    @DeleteMapping("/delete-color")
    public ResponseEntity<NotiResponse> deleteColor(@RequestParam("id") Long id){
        colorService.deleteColor(id);
        return ResponseEntity.status(200).body(
                new NotiResponse(HttpStatus.OK, "Delete color successfully")
        );
    }
    @GetMapping("/product-color")
    public ResponseEntity<ObjectResponse> getColorByProductId(@RequestParam("id") Long id){
        List<Color> colors = colorService.listColorByProductID(id);
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Query list color successfully", colors)
        );
    }

    @PostMapping("/create-image")
    public ResponseEntity<ObjectResponse> createImage(@Valid @RequestBody ImageRequest imageRequest){
        Image image = imageService.createImage(imageRequest);
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Create image successfully", image)
        );
    }

    @GetMapping("/images")
    public ResponseEntity<ObjectResponse> getListImage(){
        List<Image> images = imageService.listImageAll();
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Query list image successfully", images)
        );
    }
    @DeleteMapping("/delete-image")
    public ResponseEntity<NotiResponse> deleteImage(@RequestParam("id") Long id){
        imageService.deleteImage(id);
        return ResponseEntity.status(200).body(
                new NotiResponse(HttpStatus.OK, "Delete image successfully")
        );
    }
    @PostMapping("/update-image")
    public ResponseEntity<ObjectResponse> updateImage(@Valid @RequestBody ImageUpdateRequest imageUpdateRequest, @RequestParam("id") Long id){
        Image image = imageService.updateImage(imageUpdateRequest, id);
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "update image successfully", image)
        );
    }

    @GetMapping("/product-image")
    public ResponseEntity<ObjectResponse> getImageByProductId(@RequestParam("id") Long id){
        List<Image> images = imageService.listImageByProductID(id);
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Query list image successfully", images)
        );
    }
}
