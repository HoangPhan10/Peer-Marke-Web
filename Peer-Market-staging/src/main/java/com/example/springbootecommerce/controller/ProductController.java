package com.example.springbootecommerce.controller;


import com.example.springbootecommerce.pojo.entity.Product;
import com.example.springbootecommerce.pojo.entity.Type;
import com.example.springbootecommerce.pojo.requests.*;
import com.example.springbootecommerce.pojo.responses.NotiResponse;
import com.example.springbootecommerce.pojo.responses.ObjectResponse;
import com.example.springbootecommerce.pojo.responses.ProductPageResponse;
import com.example.springbootecommerce.pojo.responses.ProductResponse;
import com.example.springbootecommerce.service.ProductInformationService;
import com.example.springbootecommerce.service.ProductService;
import com.example.springbootecommerce.service.TypeService;
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
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService;
    @Autowired  
    private TypeService typeService;


    @GetMapping("")
    public ResponseEntity<ObjectResponse> getListProduct() {
        List<ProductResponse> products = productService.listAll();
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Query list product successfully", products)
        );
    }
    @GetMapping("/getProduct-info")
    public ResponseEntity<ObjectResponse> getProductById(@RequestParam("id") Long id) {
        ProductResponse product = productService.findProductById(id);
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Query list product successfully", product)
        );
    }
    @GetMapping("/shop-by-id")  
    public ResponseEntity<ObjectResponse> getProductByShopId(@RequestParam("id") Long id) {
        List<ProductResponse> products = productService.listProductByShopId(id);
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Query list product successfully", products)
        );
    }
    @GetMapping("/type-by-id")
    public ResponseEntity<ObjectResponse> getProductByTypeId(@RequestParam("id") Long id) {
        List<ProductResponse> products = productService.listProductByTypeId(id);
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Query list product successfully", products)
        );
    }
    @GetMapping("/shop-by-id-page")
    public ResponseEntity<ObjectResponse> getProductByPage(@RequestParam("page") int page, @RequestParam("limit") int limit, @RequestParam("id") long id) {
        ProductPageResponse productPageResponse = productService.getProductByPage(page, limit,id);
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Query list product successfully", productPageResponse)
        );
    }
    @PostMapping("/save")
    public ResponseEntity<ObjectResponse>  createProduct(@Valid @RequestBody ProductRequest productRequest){
        Product product = productService.saveProduct(productRequest);
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Create product successfully", product)
        );
    }


    @PostMapping("/type")
    public ResponseEntity<ObjectResponse>  createType(@Valid @RequestBody TypeRequest typeRequest){
        Type type = typeService.saveType(typeRequest);
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Create type successfully", type)
        );
    }
    @GetMapping("/type")
    public ResponseEntity<ObjectResponse>  listType(){
        List<Type> types = typeService.listType();
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Query list type successfully", types)
        );
    }

    @DeleteMapping("/delete")
    public ResponseEntity<NotiResponse> deleteProduct(@RequestParam("id") Long id) {
        productService.deleteProductById(id);
        return ResponseEntity.ok().body(
                new NotiResponse(HttpStatus.OK, "Delete Product successfully")
        );
    }

    @PostMapping("/update")
    public  ResponseEntity<ObjectResponse> updateProduct(@Valid @RequestBody ProductUpdateRequest productUpdateRequest, @RequestParam("id") Long id){
        Product product = productService.updateProduct(productUpdateRequest, id);
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "update product successfully", product)
        );
    }



}
