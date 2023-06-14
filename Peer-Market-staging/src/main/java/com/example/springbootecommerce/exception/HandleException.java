package com.example.springbootecommerce.exception;


import com.example.springbootecommerce.pojo.responses.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.sql.SQLIntegrityConstraintViolationException;

@RestControllerAdvice
@Slf4j
public class HandleException {

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<ErrorResponse> sqlIntegrityConstraintViolationException(Exception exception){
        log.error("exception -> {}",exception.getMessage());
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.CONFLICT,exception.getMessage());
        return ResponseEntity.badRequest().body(
                errorResponse
        );
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ErrorResponse> userNotFoundException(Exception exception){
        log.error("Exception -> {}",exception.getMessage());
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND, exception.getMessage());
        return  ResponseEntity.badRequest().body(
                errorResponse
        );
    }
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public ResponseEntity<ErrorResponse> methodNotAllowed(Exception ex){
        log.error("Exception -> {}",ex.getMessage());
        return ResponseEntity.badRequest().body(
                new ErrorResponse(HttpStatus.METHOD_NOT_ALLOWED,ex.getMessage())
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorResponse> methodArgumentNotValidException(MethodArgumentNotValidException exception){
        String errMessage = exception.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        log.error("Exception -> {}",errMessage);
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST,errMessage);
        return ResponseEntity.badRequest().body(
                errorResponse
        );
    }
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorResponse> exception(Exception exception){
        log.error("Exception -> {}",exception.getMessage());
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST,exception.getMessage());
        return ResponseEntity.badRequest().body(
                errorResponse
        );
    }
    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorResponse> accessDenied(AccessDeniedException exception){
        log.error("Exception -> {}",exception.getMessage());
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.UNAUTHORIZED,exception.getMessage());
        return ResponseEntity.badRequest().body(
                errorResponse
        );
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorResponse> illegalArgumentException(Exception exception){
        log.error("Exception -> {}",exception.getMessage());
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST,exception.getMessage());
        return ResponseEntity.badRequest().body(
                errorResponse
        );
    }
}
