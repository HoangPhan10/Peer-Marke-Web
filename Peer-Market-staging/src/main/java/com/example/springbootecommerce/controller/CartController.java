package com.example.springbootecommerce.controller;

import com.example.springbootecommerce.pojo.entity.Cart;
import com.example.springbootecommerce.pojo.requests.CartRequest;
import com.example.springbootecommerce.pojo.responses.CartResponse;
import com.example.springbootecommerce.pojo.responses.NotiResponse;
import com.example.springbootecommerce.pojo.responses.ObjectResponse;

import com.example.springbootecommerce.service.CartService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/carts")
@RestController
@Slf4j
@CrossOrigin(maxAge = 3600)
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping("/create")
    public ResponseEntity<ObjectResponse> createCart(@RequestBody @Valid CartRequest cartRequest) {
        Cart cart = cartService.createCart(cartRequest);
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Create cart successfully", cart)
        );
    }

    @GetMapping("/list-by-user-id")
    public ResponseEntity<ObjectResponse> getListCartByUserId(@RequestParam("id") Long id){
        List<CartResponse> carts = cartService.listCartByUserId(id);
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Query list cart by user id successfully", carts)
        );
    }

    @GetMapping("/get")
    public ResponseEntity<ObjectResponse> getCartById(@RequestParam("id") Long id){
        CartResponse cart = cartService.getCartById(id);
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Query cart by cart id successfully", cart)
        );
    }

    @DeleteMapping("/delete")
    public ResponseEntity<NotiResponse> deleteCart(@RequestParam("id") Long id){
        cartService.deleteCart(id);
        return ResponseEntity.status(200).body(
                new NotiResponse(HttpStatus.OK, "Delete cart by id successfully")
        );
    }
}
