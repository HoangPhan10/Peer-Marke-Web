package com.example.springbootecommerce.repository;

import com.example.springbootecommerce.pojo.entity.Transport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository
public interface TransportRepository extends JpaRepository<Transport,Long> {
    Transport findTransportById(Long id);

    Transport findTransportByName(String name);
}
