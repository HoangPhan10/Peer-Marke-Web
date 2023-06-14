package com.example.springbootecommerce.controller;


import com.example.springbootecommerce.config.VnpayConfig;
import com.example.springbootecommerce.pojo.entity.Payment;
import com.example.springbootecommerce.pojo.requests.VnpayRequest;
import com.example.springbootecommerce.pojo.responses.ObjectResponse;
import com.example.springbootecommerce.pojo.responses.PaymentResponse;
import com.example.springbootecommerce.service.PaymentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/payment")
@CrossOrigin(maxAge = 3600)
@Slf4j
public class VnpayController {
    @Autowired
    private PaymentService paymentService;
    @PostMapping("/vnpay")
    public ResponseEntity<ObjectResponse> createVnpay(@RequestBody VnpayRequest vnpayRequest) throws UnsupportedEncodingException {
        PaymentResponse paymentResponse = paymentService.createVnpay(vnpayRequest);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ObjectResponse(HttpStatus.OK, "Create payment vnpay successfully",paymentResponse)
        );
    }
    @GetMapping("")
    public ResponseEntity<ObjectResponse> getListPayments() {
        List<Payment> paymentList = paymentService.getListPayments();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ObjectResponse(HttpStatus.OK,"Query list payment successfully",paymentList)
        );
    }

    @GetMapping("/vnpay/success")
    public RedirectView getVnpaySuccess(
            @RequestParam("vnp_ResponseCode") String vnpResponseCode,
            @RequestParam("list_id") List<Long> list
    ) throws URISyntaxException {
        return paymentService.paymentSuccess(vnpResponseCode,list);
    }
}
