package com.example.springbootecommerce.pojo.requests;

import com.example.springbootecommerce.pojo.entity.Type;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TypeRequest {
    @NotNull(message = "Name not null")
    private String name;


}
