package com.example.springbootecommerce.service;

import com.example.springbootecommerce.pojo.entity.Address;
import com.example.springbootecommerce.pojo.entity.User;
import com.example.springbootecommerce.pojo.requests.AddressRequest;
import com.example.springbootecommerce.pojo.requests.UserRequest;

import java.io.IOException;
import java.util.List;

public interface AddressService {
    List<Address> listAll();
    Address saveAddress(AddressRequest addressRequest) throws IOException;

    Address updateAddress(AddressRequest addressRequest) throws IOException;

    Address findAddressById(AddressRequest addressRequest) throws IOException;
    void deleteAddress(Long id);

    List<Address> findAddressByUserId(Long uid);
}
