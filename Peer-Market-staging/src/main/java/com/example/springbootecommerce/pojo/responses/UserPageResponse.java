package com.example.springbootecommerce.pojo.responses;

import com.example.springbootecommerce.pojo.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPageResponse {
    private List<User> users;
    private Integer total;
    private Long totalElement;
}
