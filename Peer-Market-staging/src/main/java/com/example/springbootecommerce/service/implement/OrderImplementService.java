package com.example.springbootecommerce.service.implement;

import com.example.springbootecommerce.exception.UserNotFoundException;
import com.example.springbootecommerce.pojo.entity.*;
import com.example.springbootecommerce.pojo.requests.OrderRequest;
import com.example.springbootecommerce.pojo.requests.OrderRequestArr;
import com.example.springbootecommerce.pojo.requests.UpdateStatusRequest;
import com.example.springbootecommerce.pojo.responses.CartResponse;
import com.example.springbootecommerce.pojo.responses.OrderReponse;
import com.example.springbootecommerce.pojo.responses.ProductResponse;
import com.example.springbootecommerce.repository.*;
import com.example.springbootecommerce.service.CartService;
import com.example.springbootecommerce.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
public class OrderImplementService implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartService cartService;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private StatusRepository statusRepository;
    @Autowired
    private TransportRepository transportRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Order> createOrder(OrderRequest orderRequest) {
        List<Order> orders = new ArrayList<>();
        for (OrderRequestArr item: orderRequest.getOrder()) {
            Order order = new Order();
            order.setIdPayment(orderRequest.getIdPayment());
            order.setIdAddress(orderRequest.getIdAddress());
            order.setIdUser(orderRequest.getIdUser());
            if (orderRequest.getIdPayment() != 1){
                order.setIdStatus(1L);
            }else {
                order.setIdStatus(6L);
            }
            order.setMessage(item.getMessage());
            order.setIdShop(item.getIdShop());
            order.setIdTransport(item.getIdTransport());
            order.setIdCart(item.getIdCart());
            Cart cart = cartRepository.getCartById(item.getIdCart());
            cart.setDeletedAt(true);
            cartRepository.save(cart);
            order.setCreated(new Date());
            Order orderAdd = orderRepository.save(order);
            orders.add(orderAdd);
        }
        return orders;
    }

    @Override
    public List<Order> updateListOrder(List<Long> listOrder) {
        for (Long orderId : listOrder){
            Order order = orderRepository.getOrderById(orderId);
            order.setUpdated(new Date());
            order.setIdStatus(6L);
            orderRepository.save(order);
        }
        return null;
    }

    @Override
    public List<OrderReponse> listOrderByUserId(Long userId,Long status) {
        List<Order> orders = new ArrayList<>();
        if (status == 0) {
            orders = orderRepository.getOrdersByIdUser(userId);
        }else {
            orders = orderRepository.getOrdersByIdUserAndIdStatus(userId,status);
        }
        List<OrderReponse> orderReponseList = new ArrayList<>();
        for (Order order : orders){
            CartResponse cart = cartService.getCartById(order.getIdCart());
            Address address = addressRepository.findAddressById(order.getIdAddress());
            Payment payment = paymentRepository.getPaymentById(order.getIdPayment());
            Status status1 = statusRepository.getStatusById(order.getIdStatus());
            Transport transport = transportRepository.findTransportById(order.getIdTransport());
            User user = userRepository.findUserById(order.getIdUser());
            OrderReponse orderReponse = new OrderReponse();
            orderReponse.setUser(user);
            orderReponse.setAddress(address);
            orderReponse.setCart(cart);
            orderReponse.setPayment(payment);
            orderReponse.setStatus(status1);
            orderReponse.setTransport(transport);
            orderReponse.setMessage(order.getMessage());
            orderReponse.setOrderId(order.getId());
            orderReponseList.add(orderReponse);

        }
        return orderReponseList;
    }

    @Override
    public List<OrderReponse> listOrderByShopId(Long shopId, Long status) {
        List<Order> orders = new ArrayList<>();
        if (status == 0) {
            orders = orderRepository.getOrdersByIdShop(shopId);
        }else {
            orders = orderRepository.getOrdersByIdShopAndIdStatus(shopId,status);
        }
        List<OrderReponse> orderReponseList = new ArrayList<>();
        for (Order order : orders){
                CartResponse cart = cartService.getCartById(order.getIdCart());
            Address address = addressRepository.findAddressById(order.getIdAddress());
            Payment payment = paymentRepository.getPaymentById(order.getIdPayment());
            Status status1 = statusRepository.getStatusById(order.getIdStatus());
            Transport transport = transportRepository.findTransportById(order.getIdTransport());
            User user = userRepository.findUserById(order.getIdUser());
            OrderReponse orderReponse = new OrderReponse();
            orderReponse.setUser(user);
            orderReponse.setAddress(address);
            orderReponse.setCart(cart);
            orderReponse.setPayment(payment);
            orderReponse.setStatus(status1);
            orderReponse.setTransport(transport);
            orderReponse.setMessage(order.getMessage());
            orderReponse.setOrderId(order.getId());
            orderReponseList.add(orderReponse);

        }
        return orderReponseList;
    }

    @Override
    public List<OrderReponse> listOrderByStatus(Long status) {
        List<Order> orders = new ArrayList<>();
        if (status == 0) {
            orders = orderRepository.findAll();
        }else {
            orders = orderRepository.getOrdersByIdStatus(status);
        }

        List<OrderReponse> orderReponseList = new ArrayList<>();
        for (Order order : orders){
            CartResponse cart = cartService.getCartById(order.getIdCart());
            Address address = addressRepository.findAddressById(order.getIdAddress());
            Payment payment = paymentRepository.getPaymentById(order.getIdPayment());
            Status status1 = statusRepository.getStatusById(order.getIdStatus());
            Transport transport = transportRepository.findTransportById(order.getIdTransport());
            User user = userRepository.findUserById(order.getIdUser());
            OrderReponse orderReponse = new OrderReponse();
            orderReponse.setUser(user);
            orderReponse.setAddress(address);
            orderReponse.setCart(cart);
            orderReponse.setPayment(payment);
            orderReponse.setStatus(status1);
            orderReponse.setTransport(transport);
            orderReponse.setMessage(order.getMessage());
            orderReponse.setOrderId(order.getId());
            orderReponseList.add(orderReponse);

        }
        return orderReponseList;
    }

    @Override
    public List<OrderReponse> listOrders() {
        List<Order> orders = orderRepository.findAll();
        List<OrderReponse> orderReponseList = new ArrayList<>();
        for (Order order : orders){
            CartResponse cart = cartService.getCartById(order.getIdCart());
            Address address = addressRepository.findAddressById(order.getIdAddress());
            Payment payment = paymentRepository.getPaymentById(order.getIdPayment());
            Status status1 = statusRepository.getStatusById(order.getIdStatus());
            Transport transport = transportRepository.findTransportById(order.getIdTransport());
            User user = userRepository.findUserById(order.getIdUser());
            OrderReponse orderReponse = new OrderReponse();
            orderReponse.setUser(user);
            orderReponse.setAddress(address);
            orderReponse.setCart(cart);
            orderReponse.setPayment(payment);
            orderReponse.setStatus(status1);
            orderReponse.setTransport(transport);
            orderReponse.setMessage(order.getMessage());
            orderReponse.setOrderId(order.getId());
            orderReponseList.add(orderReponse);

        }
        return orderReponseList;
    }

    @Override
    public OrderReponse getOrderById(Long id) {
        Order order = orderRepository.getOrderById(id);
        CartResponse cart = cartService.getCartById(order.getIdCart());
        Address address = addressRepository.findAddressById(order.getIdAddress());
        Payment payment = paymentRepository.getPaymentById(order.getIdPayment());
        Status status1 = statusRepository.getStatusById(order.getIdStatus());
        Transport transport = transportRepository.findTransportById(order.getIdTransport());
        User user = userRepository.findUserById(order.getIdUser());
        OrderReponse orderReponse = new OrderReponse();
        orderReponse.setUser(user);
        orderReponse.setAddress(address);
        orderReponse.setCart(cart);
        orderReponse.setPayment(payment);
        orderReponse.setStatus(status1);
        orderReponse.setTransport(transport);
        orderReponse.setMessage(order.getMessage());
        return orderReponse;
    }

    @Override
    public Order updateStatusByOrderId(UpdateStatusRequest request) {
        Order order = orderRepository.getOrderById(request.getIdOrder());
        if (order == null) {
            throw new UserNotFoundException("Order not found for id " + request.getIdOrder());
        }
        if (request.getIdStatus() == 4) {
            CartResponse cart = cartService.getCartById(order.getIdCart());
            Cart cart1 = cart.getCart();
            ProductResponse productResponse = cart.getProductResponse();
            Product product = productResponse.getProduct();
            product.setQuantity(product.getQuantity() - cart1.getQuantity());
            product.setSold(product.getSold() + cart1.getQuantity());
            productRepository.save(product);
        }
        order.setIdStatus(request.getIdStatus());
        return orderRepository.save(order);
    }

}
