package com.example.springbootecommerce.service;

import com.example.springbootecommerce.pojo.entity.Payment;
import com.example.springbootecommerce.pojo.requests.VnpayRequest;
import com.example.springbootecommerce.pojo.responses.PaymentResponse;
import org.springframework.web.servlet.view.RedirectView;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.util.List;

public interface PaymentService {
    PaymentResponse createVnpay(VnpayRequest vnpayRequest) throws UnsupportedEncodingException;
    List<Payment> getListPayments();
    RedirectView paymentSuccess(String vnp_ResponseCode, List<Long> listId) throws URISyntaxException;
}
