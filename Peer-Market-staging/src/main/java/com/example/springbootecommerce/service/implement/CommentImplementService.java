package com.example.springbootecommerce.service.implement;

import com.example.springbootecommerce.exception.UserNotFoundException;
import com.example.springbootecommerce.pojo.entity.Address;
import com.example.springbootecommerce.pojo.entity.Comment;
import com.example.springbootecommerce.pojo.entity.Product;
import com.example.springbootecommerce.pojo.entity.User;
import com.example.springbootecommerce.pojo.requests.CommentRequest;
import com.example.springbootecommerce.repository.CommentRepository;
import com.example.springbootecommerce.repository.ProductRepository;
import com.example.springbootecommerce.repository.UserRepository;
import com.example.springbootecommerce.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
public class CommentImplementService implements CommentService {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    @Override
    public Comment saveComment(CommentRequest commentRequest) {
        Comment comment = new Comment();
        User user = userRepository.findUserById(commentRequest.getId_user());
        if(user == null){
            throw new UserNotFoundException("Cannot find user by id"+commentRequest.getId_user());
        }
        Product product = productRepository.findProductById(commentRequest.getId_product());
        if(product == null){
            throw new RuntimeException("Cannot find product by id"+commentRequest.getId_product());
        }
        comment.setComment(commentRequest.getComment());
        comment.setIdCart(commentRequest.getId_cart());
        comment.setRate(commentRequest.getRate());
        comment.setUser(user);
        comment.setIdProduct(commentRequest.getId_product());
        comment.setCreatedAt(new Date());
        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> getListCommentByProductId(Long id) {
        return commentRepository.findCommentsByIdProduct(id);
    }

    @Override
    public void deleteComment(Long id) {
        Comment comment = commentRepository.findCommentById(id);
        if(comment == null){
            throw new UserNotFoundException("Comment not found id ="+id);
        }
        commentRepository.deleteById(id);
    }

    @Override
    public List<Comment> listAll() {
            return commentRepository.findAll();
    }

    @Override
    public List<Comment> getListCommentAll(Long id) {
        List<Comment> commentList = commentRepository.findCommentsByIdProduct(id);
        return commentList;
    }


//    @Override
//    public Comment updateComment(CommentRequest commentRequest) throws IOException {
//        Product product = productRepository.findProductById(commentRequest.getId_product());
//        if(product == null) {
//            throw new RuntimeException();
//        }
//        Comment comment = commentRepository.findCommentByProductId(commentRequest.getId_product());
//    }
}
