package com.example.springbootecommerce.service.implement;

import com.example.springbootecommerce.exception.UserNotFoundException;
import com.example.springbootecommerce.pojo.entity.Address;
import com.example.springbootecommerce.pojo.entity.Shop;
import com.example.springbootecommerce.pojo.entity.Transport;
import com.example.springbootecommerce.pojo.entity.User;
import com.example.springbootecommerce.pojo.requests.ShopRequest;
import com.example.springbootecommerce.repository.AddressRepository;
import com.example.springbootecommerce.repository.ShopRepository;
import com.example.springbootecommerce.repository.TransportRepository;
import com.example.springbootecommerce.repository.UserRepository;
import com.example.springbootecommerce.service.ShopService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@Transactional
public class ShopImplementService implements ShopService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private ShopRepository shopRepository;
    @Autowired
    private TransportRepository transportRepository;

    @Override
    public Shop createShop(ShopRequest request) {
        Shop shop = new Shop();
        User user = userRepository.findUserById(request.getId_user());
        if(user == null){
            throw new UserNotFoundException("Cannot find user by id : "+ request.getId_user());
        }
        Address address = addressRepository.findAddressById(request.getId_address());

        if(address == null){
            throw new UserNotFoundException("Cannot find address by id : "+ request.getId_address());
        }
        shop.setUser(user);
        shop.setAddress(address);
        shop.setName(request.getName());
        List<Transport> ts = new ArrayList<>();
        for(Long id_transport : request.getList_transport()){
            Transport transport1 = transportRepository.findTransportById(id_transport);
            ts.add(transport1);
        }
        shop.setTransports(ts);
        return shopRepository.save(shop);
    }

    @Override
    public Shop getShopByUserId(Long id) {
        Shop shop = shopRepository.findShopsByUserId(id);
        if(shop == null){
            throw new UserNotFoundException("Cannot find shop by user_id : " + id);
        }
        return shop;
    }
}
