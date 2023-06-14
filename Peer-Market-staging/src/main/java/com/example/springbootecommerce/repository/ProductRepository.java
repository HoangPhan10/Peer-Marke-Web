package com.example.springbootecommerce.repository;

import com.example.springbootecommerce.pojo.entity.Product;
import com.example.springbootecommerce.pojo.entity.Shop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;


@EnableJpaRepositories
@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    Product findProductById(Long id);
    Page<Product> findProductByShopId(Pageable pageable ,long shopId);
    Page<Product> findAll(Pageable pageable);
    List<Product> findProductsByShopId(long shopId);
    List<Product> findProductsByTypeId(long typeId);

}
