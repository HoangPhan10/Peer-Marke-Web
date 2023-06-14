package com.example.springbootecommerce.pojo.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ObjectResponse {
    private HttpStatus status;
    private String message;
    private Object data;
}
