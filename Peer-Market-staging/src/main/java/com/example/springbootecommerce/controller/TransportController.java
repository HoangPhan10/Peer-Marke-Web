package com.example.springbootecommerce.controller;

import com.example.springbootecommerce.pojo.entity.Transport;
import com.example.springbootecommerce.pojo.requests.TransportRequest;
import com.example.springbootecommerce.pojo.responses.NotiResponse;
import com.example.springbootecommerce.pojo.responses.ObjectResponse;
import com.example.springbootecommerce.service.TransportService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@CrossOrigin(maxAge = 3600)
@RequestMapping("/transports")
public class TransportController {
    @Autowired
    private TransportService transportService;
    @PostMapping("/create")
    public ResponseEntity<ObjectResponse> createTransport(@Valid @RequestBody TransportRequest transportRequest){
        Transport transport = transportService.save(transportRequest);
        return ResponseEntity.ok().body(
                new ObjectResponse(HttpStatus.OK, "Create transport successfully", transport)
        );
    }
    @GetMapping("")
    public ResponseEntity<ObjectResponse> getListTransport(){
        List<Transport> transports = transportService.getListTransport();
        return ResponseEntity.ok().body(
                new ObjectResponse(HttpStatus.OK, "List transports successfully", transports)
        );
    }
    @DeleteMapping("/delete")
    public ResponseEntity<NotiResponse> deleteTransport(@RequestParam("id") Long id){
        transportService.deleteTransport(id);
        return ResponseEntity.ok().body(
                new NotiResponse(HttpStatus.OK, "Delete transport successfully")
        );
    }
}
