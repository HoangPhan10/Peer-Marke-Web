package com.example.springbootecommerce.pojo.requests;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressRequest {
    private String address;

    private String phone;

    private String name_receiver;
    private Long userId;

}
