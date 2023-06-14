package com.example.springbootecommerce.controller;

import com.example.springbootecommerce.pojo.entity.Address;
import com.example.springbootecommerce.pojo.entity.User;
import com.example.springbootecommerce.pojo.requests.AddressRequest;
import com.example.springbootecommerce.pojo.responses.NotiResponse;
import com.example.springbootecommerce.pojo.responses.ObjectResponse;
import com.example.springbootecommerce.repository.AddressRepository;
import com.example.springbootecommerce.service.AddressService;
import com.example.springbootecommerce.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
@CrossOrigin(maxAge = 3600)
@RequestMapping("/address")
public class AddressController {
    @Autowired
    private AddressService addressService;

    @GetMapping("")
    public ResponseEntity<ObjectResponse> getListAddress() {
        List<Address> addresses = addressService.listAll();
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Query list address successfully", addresses)
        );
    }

    @GetMapping("/get")
    ResponseEntity<ObjectResponse> findAddressByUserId(@RequestParam("id") Long id) {
        List<Address> findAddress = addressService.findAddressByUserId(id);
        if (findAddress != null) {
            return ResponseEntity.status(200).body(
                    new ObjectResponse(HttpStatus.OK, "Query address successfully", findAddress));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ObjectResponse(HttpStatus.NOT_FOUND, "Cannot found ",null));
        }
    }


    @PostMapping("/save")
    public ResponseEntity<ObjectResponse> insertAddress(@RequestBody AddressRequest addressRequest) throws IOException {
        Address createdAddress = addressService.saveAddress(addressRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new ObjectResponse(HttpStatus.CREATED, "Address created successfully", createdAddress));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<NotiResponse> deleteAddress(@RequestParam(value = "id") Long id) {
        addressService.deleteAddress(id);
        return ResponseEntity.status(200).body(
                new NotiResponse(HttpStatus.OK, "Delete address successfully")
        );
    }

    @PutMapping("/update")
    public ResponseEntity<ObjectResponse> updateAddress(@RequestBody AddressRequest addressRequest) throws IOException {
        Address updateAdd = addressService.updateAddress(addressRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new ObjectResponse(HttpStatus.CREATED, "Address update successfully", updateAdd));
    }
}
