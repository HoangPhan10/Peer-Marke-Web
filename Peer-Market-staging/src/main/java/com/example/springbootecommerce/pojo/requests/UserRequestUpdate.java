package com.example.springbootecommerce.pojo.requests;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestUpdate {
    @Length(min = 3,message = "First name must be a character more than 3 characters")
    private String username;
    @Email(message = "Email is a not valid email address")
    private String email;
    private String name;
    private String role;
}

