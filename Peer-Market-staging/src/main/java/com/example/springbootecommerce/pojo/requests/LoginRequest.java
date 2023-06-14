package com.example.springbootecommerce.pojo.requests;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    @Email(message = "Email is a not valid email address")
    private String email;
    @Length(min = 6,message = "Password must be a character more than 6 characters")
    private String password;
}
