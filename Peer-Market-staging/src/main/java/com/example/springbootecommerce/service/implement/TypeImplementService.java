package com.example.springbootecommerce.service.implement;

import com.example.springbootecommerce.pojo.entity.Type;
import com.example.springbootecommerce.pojo.requests.TypeRequest;
import com.example.springbootecommerce.repository.TypeRepository;
import com.example.springbootecommerce.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeImplementService implements TypeService {

    @Autowired
    private TypeRepository typeRepository;
    @Override
    public Type saveType(TypeRequest typeRequest) {
        Type type = new Type();
        type.setName(typeRequest.getName());
        return typeRepository.save(type);
    }

    @Override
    public List<Type> listType() {
        return typeRepository.findAll();
    }
}
