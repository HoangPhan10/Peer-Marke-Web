package com.example.springbootecommerce.repository;

import com.example.springbootecommerce.pojo.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment,Long> {
    Payment getPaymentById(Long id);
}
