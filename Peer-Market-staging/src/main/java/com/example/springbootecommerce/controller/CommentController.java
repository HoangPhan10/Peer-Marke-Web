package com.example.springbootecommerce.controller;

import com.example.springbootecommerce.pojo.entity.Address;
import com.example.springbootecommerce.pojo.entity.Comment;
import com.example.springbootecommerce.pojo.entity.User;
import com.example.springbootecommerce.pojo.requests.AddressRequest;
import com.example.springbootecommerce.pojo.requests.CommentRequest;
import com.example.springbootecommerce.pojo.responses.NotiResponse;
import com.example.springbootecommerce.pojo.responses.ObjectResponse;
import com.example.springbootecommerce.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@Slf4j
@CrossOrigin(maxAge = 3600)
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping("/create")
    public ResponseEntity<ObjectResponse> createComment(@RequestBody CommentRequest commentRequest) throws IOException {
        Comment createdComment = commentService.saveComment(commentRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new ObjectResponse(HttpStatus.CREATED, "Address created successfully", createdComment));
    }

    @GetMapping("/product_comment")
    public ResponseEntity<ObjectResponse> getListCommentByProductId(@RequestParam("id") Long id) {
        List<Comment> commentList = commentService.getListCommentByProductId(id);
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Query list comment successfully", commentList)
        );
    }
    @GetMapping("/list")
    public ResponseEntity<ObjectResponse> getListCommentAll() {
        List<Comment> commentList = commentService.listAll();
        return ResponseEntity.status(200).body(
                new ObjectResponse(HttpStatus.OK, "Query list comment successfully", commentList)
        );
    }

    @DeleteMapping("/delete_comment")
    public ResponseEntity<NotiResponse> deleteComment(@RequestParam(value = "id") Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.status(200).body(
                new NotiResponse(HttpStatus.OK, "Delete comment successfully")
        );
    }
}
