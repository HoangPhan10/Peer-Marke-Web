package com.example.springbootecommerce.controller;

import com.example.springbootecommerce.pojo.entity.Order;
import com.example.springbootecommerce.pojo.requests.OrderRequest;
import com.example.springbootecommerce.pojo.requests.UpdateStatusRequest;
import com.example.springbootecommerce.pojo.responses.ObjectResponse;
import com.example.springbootecommerce.pojo.responses.OrderReponse;
import com.example.springbootecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(maxAge = 3600)
public class OrderController {
    @Autowired
    private OrderService orderService;
    @PostMapping("/create")
    public ResponseEntity<ObjectResponse> createOrder(@RequestBody OrderRequest orderRequest){
        List<Order> orders =  orderService.createOrder(orderRequest);
        return ResponseEntity.ok().body(
                new ObjectResponse(HttpStatus.CREATED,"Create Order successfully",orders)
        );
    }
    @GetMapping("/list-users")
    public ResponseEntity<ObjectResponse> listOrderByUser(@RequestParam("id") Long id,@RequestParam("status") Long status){
        List<OrderReponse> orders2 = orderService.listOrderByUserId(id,status);
        return ResponseEntity.ok().body(
                new ObjectResponse(HttpStatus.OK,"Query list order by user id successfully",orders2)
        );
    }
    @GetMapping("/list")
    public ResponseEntity<ObjectResponse> listOrder(){
        List<OrderReponse> orders2 = orderService.listOrders();
        return ResponseEntity.ok().body(
                new ObjectResponse(HttpStatus.OK,"Query list order successfully",orders2)
        );
    }
    @GetMapping("/list-shops")
    public ResponseEntity<ObjectResponse> listOrderByShop(@RequestParam("id") Long id,@RequestParam("status") Long status){
        List<OrderReponse> orders2 = orderService.listOrderByShopId(id,status);
        return ResponseEntity.ok().body(
                new ObjectResponse(HttpStatus.OK,"Query list order by user id successfully",orders2)
        );
    }
    @GetMapping("/list-status")
    public ResponseEntity<ObjectResponse> listOrderByStatus(@RequestParam("status") Long status){
        List<OrderReponse> orders2 = orderService.listOrderByStatus(status);
        return ResponseEntity.ok().body(
                new ObjectResponse(HttpStatus.OK,"Query list order by user id successfully",orders2)
        );
    }
    @GetMapping("/get")
    public ResponseEntity<ObjectResponse> getOrderById(@RequestParam("id") Long id){
        OrderReponse orderReponse = orderService.getOrderById(id);
        return ResponseEntity.ok().body(
                new ObjectResponse(HttpStatus.OK,"Query order by id successfully",orderReponse)
        );
    }
    @PutMapping("/update-status")
    public ResponseEntity<ObjectResponse> updateStatusOrder(@RequestBody UpdateStatusRequest request){
        Order order = orderService.updateStatusByOrderId(request);
        return ResponseEntity.ok().body(
                new ObjectResponse(HttpStatus.OK,"Update status order by id successfully",order)
        );
    }
}
