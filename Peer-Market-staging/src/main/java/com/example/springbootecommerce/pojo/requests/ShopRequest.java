package com.example.springbootecommerce.pojo.requests;


import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShopRequest {
    @NotNull(message = "Name not null")
    private String name;
    @NotNull(message = "id_user not null")
    private Long id_user;
    @NotNull(message = "id_address not null")
    private Long id_address;
    @NotNull(message = "list transport not null")
    private List<Long> list_transport;
}
