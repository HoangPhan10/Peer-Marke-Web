package com.example.springbootecommerce.repository;

import com.example.springbootecommerce.pojo.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TypeRepository extends JpaRepository<Type,Long> {
    Type findTypeById(Long id);
}
