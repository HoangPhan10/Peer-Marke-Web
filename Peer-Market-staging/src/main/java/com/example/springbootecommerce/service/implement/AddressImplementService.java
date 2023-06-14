package com.example.springbootecommerce.service.implement;

import com.example.springbootecommerce.exception.UserNotFoundException;
import com.example.springbootecommerce.pojo.entity.Address;
import com.example.springbootecommerce.pojo.entity.Role;
import com.example.springbootecommerce.pojo.entity.User;
import com.example.springbootecommerce.pojo.requests.AddressRequest;
import com.example.springbootecommerce.repository.AddressRepository;
import com.example.springbootecommerce.repository.RoleRepository;
import com.example.springbootecommerce.repository.UserRepository;
import com.example.springbootecommerce.service.AddressService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.compress.archivers.cpio.CpioArchiveOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
@Slf4j
@Service
public class AddressImplementService implements AddressService {

    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Address> listAll() {
        return addressRepository.findAll();
    }

    @Override
    public Address saveAddress(AddressRequest addressRequest) throws IOException {
        User user = userRepository.findUserById(addressRequest.getUserId());
        if(user == null){
            throw new UserNotFoundException();
        }
        Address address = new Address();
        address.setAddress(addressRequest.getAddress());
        address.setName_receiver(addressRequest.getName_receiver());
        address.setPhone(addressRequest.getPhone());
        address.setUser(user);
        addressRepository.save(address);
        return address;
    }

    @Override
    public Address updateAddress(AddressRequest addressRequest) throws IOException {
        Address address = addressRepository.findAddressById(addressRequest.getUserId());
        if(address == null) {
            throw new UserNotFoundException("Address not found for id " +addressRequest.getUserId());
        }
        address.setAddress(addressRequest.getAddress());
        address.setName_receiver(addressRequest.getName_receiver());
        address.setPhone(addressRequest.getPhone());
        return addressRepository.save(address);
    }

    @Override
    public Address findAddressById(AddressRequest addressRequest) throws IOException {
//        Address address = addressRepository.findAddressById(addressRequest.getUserId());
        return null;
    }

    @Override
    public void deleteAddress(Long id) {
        Address address = addressRepository.findAddressById(id);
        if(address == null){
            throw new UserNotFoundException("Address not found id ="+id);
        }
        addressRepository.deleteById(id);
    }

    @Override
    public List<Address> findAddressByUserId(Long uid) {
        List<Address> addresses = addressRepository.getAddressesByUserId(uid);
        return addresses;
    }

}
