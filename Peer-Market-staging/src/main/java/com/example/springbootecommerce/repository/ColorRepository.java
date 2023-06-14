package com.example.springbootecommerce.repository;

import com.example.springbootecommerce.pojo.entity.Color;
import com.example.springbootecommerce.pojo.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ColorRepository extends JpaRepository<Color,Long> {
    Color findColorById(Long id);


    List<Color> findColorByProductId(Long id);
}
