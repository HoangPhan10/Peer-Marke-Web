package com.example.springbootecommerce.service;

import com.example.springbootecommerce.pojo.entity.Comment;
import com.example.springbootecommerce.pojo.requests.CommentRequest;

import java.util.List;

public interface CommentService {

    Comment saveComment(CommentRequest commentRequest);

    List<Comment> getListCommentByProductId(Long id);

    void deleteComment(Long id);

    List<Comment> listAll();

    List<Comment> getListCommentAll(Long id);


//    Comment updateComment(CommentRequest commentRequest) throws IOException;

}
