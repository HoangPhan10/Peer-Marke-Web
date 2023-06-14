package com.example.springbootecommerce.repository;

import com.example.springbootecommerce.pojo.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status,Long> {
    Status getStatusById(Long id);
}
