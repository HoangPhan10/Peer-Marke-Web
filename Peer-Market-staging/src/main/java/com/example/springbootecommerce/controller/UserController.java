package com.example.springbootecommerce.controller;

import com.example.springbootecommerce.pojo.entity.User;
import com.example.springbootecommerce.pojo.requests.JwtRequest;
import com.example.springbootecommerce.pojo.requests.UserRequest;
import com.example.springbootecommerce.pojo.requests.UserRequestUpdate;
import com.example.springbootecommerce.pojo.responses.NotiResponse;
import com.example.springbootecommerce.pojo.responses.ObjectResponse;
import com.example.springbootecommerce.pojo.responses.UserPageResponse;
import com.example.springbootecommerce.service.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@Slf4j
@CrossOrigin(maxAge = 3600)
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/save")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ObjectResponse> saveUser(@Valid @RequestBody UserRequest userDTO) throws IOException {
        User user = userService.saveUser(userDTO);
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Create user successfully", user)
        );
    }

    @GetMapping("")
    ResponseEntity<ObjectResponse> getAllUser(@RequestParam(value = "limit",required = false) Integer limit,@RequestParam(value = "page",required = false) Integer page){
        UserPageResponse userPageResponse = null;
        if (limit!=null&&page!=null) {
            userPageResponse = userService.getUserByPage(page,limit);
        }else{
            userPageResponse = userService.getUserByPage(1,5);
        }
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK,"Query list user successfully",userPageResponse)
        );
    }

    @PostMapping("/get-info")
    public ResponseEntity<ObjectResponse> getUserByJWT(@RequestBody JwtRequest jwt) throws IOException {
        User user = userService.getUserByJWT(jwt.getJwt());
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Query user successfully", user)
        );
    }
    @GetMapping("/get")
    public ResponseEntity<ObjectResponse> getUserById(@RequestParam("id") Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Find User successfully", user)
        );
    }

    @PutMapping("/update")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ObjectResponse> updateUser(@Valid @RequestBody UserRequestUpdate userRequestUpdate, @RequestParam("id") Long id) {
        User user = userService.updateUser(userRequestUpdate, id);
        return ResponseEntity.ok().body(
                new ObjectResponse(HttpStatus.OK, "Update user successfully", user)
        );
    }

    @DeleteMapping("/delete")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<NotiResponse> deleteUser(@RequestParam("id") Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok().body(
                new NotiResponse(HttpStatus.OK, "Delete user successfully")
        );
    }



}
