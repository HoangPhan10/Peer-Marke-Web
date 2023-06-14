package com.example.springbootecommerce.repository;

import com.example.springbootecommerce.pojo.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SizeRepository extends JpaRepository<Size,Long> {
    Size findSizeById(Long id);
    List<Size> findSizesByProductId(Long id);
}
