package com.example.springbootecommerce;

import com.example.springbootecommerce.pojo.entity.Role;
import com.example.springbootecommerce.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootECommerceApplication {
    public static void main(String[] args) {

        SpringApplication.run(SpringBootECommerceApplication.class, args);
    }

}
