package com.example.springbootecommerce.repository;

import com.example.springbootecommerce.pojo.entity.Address;
import com.example.springbootecommerce.pojo.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository <Address,Long>{
    List<Address> findAll();
    Address findAddressById(Long id);

    List<Address> getAddressesByUserId(Long id);
}
