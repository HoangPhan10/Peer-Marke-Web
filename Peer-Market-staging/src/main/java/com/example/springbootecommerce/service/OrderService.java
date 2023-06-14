package com.example.springbootecommerce.service;

import com.example.springbootecommerce.pojo.entity.Order;
import com.example.springbootecommerce.pojo.requests.OrderRequest;
import com.example.springbootecommerce.pojo.requests.UpdateStatusRequest;
import com.example.springbootecommerce.pojo.responses.OrderReponse;

import java.util.List;

public interface OrderService {
    List<Order> createOrder(OrderRequest orderRequest);
    List<Order> updateListOrder(List<Long> listOrder);
    List<OrderReponse> listOrderByUserId(Long userId, Long status);
    List<OrderReponse> listOrderByShopId(Long shopId, Long status);
    List<OrderReponse> listOrderByStatus(Long status);
    List<OrderReponse> listOrders();
    OrderReponse getOrderById(Long id);
    Order updateStatusByOrderId(UpdateStatusRequest request);
}
