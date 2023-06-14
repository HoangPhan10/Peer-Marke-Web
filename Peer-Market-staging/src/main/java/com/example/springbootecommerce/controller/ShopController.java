package com.example.springbootecommerce.controller;


import com.example.springbootecommerce.pojo.entity.Role;
import com.example.springbootecommerce.pojo.entity.Shop;
import com.example.springbootecommerce.pojo.entity.User;
import com.example.springbootecommerce.pojo.requests.*;
import com.example.springbootecommerce.pojo.responses.JWTResponse;
import com.example.springbootecommerce.pojo.responses.NotiResponse;
import com.example.springbootecommerce.pojo.responses.ObjectResponse;
import com.example.springbootecommerce.repository.UserRepository;
import com.example.springbootecommerce.security.JWTGenerator;
import com.example.springbootecommerce.service.ShopService;
import com.example.springbootecommerce.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.TypeCollector;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/shop")
@CrossOrigin(maxAge = 3600)
public class ShopController {
    @Autowired
    private ShopService shopService;

    @PostMapping("/save")
    ResponseEntity<ObjectResponse> createShop(@RequestBody @Valid ShopRequest request) {
        Shop shop = shopService.createShop(request);
        return ResponseEntity.ok().body(
                new ObjectResponse(HttpStatus.OK, "Create shop successfully", shop)
        );
    }
    @GetMapping("")
    ResponseEntity<ObjectResponse> getShopByUserId(@RequestParam("id") Long id){
        Shop shop = shopService.getShopByUserId(id);
        return ResponseEntity.ok().body(
                new ObjectResponse(HttpStatus.OK, "Get shop successfully", shop)
        );
    }



}
