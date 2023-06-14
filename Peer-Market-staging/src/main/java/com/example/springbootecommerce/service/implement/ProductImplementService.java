package com.example.springbootecommerce.service.implement;

import com.example.springbootecommerce.exception.UserNotFoundException;
import com.example.springbootecommerce.pojo.entity.*;
import com.example.springbootecommerce.pojo.requests.ProductInformationRequest;
import com.example.springbootecommerce.pojo.requests.ProductRequest;
import com.example.springbootecommerce.pojo.requests.ProductUpdateRequest;
import com.example.springbootecommerce.pojo.responses.ProductPageResponse;
import com.example.springbootecommerce.pojo.responses.ProductResponse;
import com.example.springbootecommerce.repository.*;
import com.example.springbootecommerce.service.ProductService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
@Slf4j
@Transactional
public class ProductImplementService implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private SizeRepository sizeRepository;
    @Autowired
    private ShopRepository shopRepository;
    @Autowired
    private TypeRepository typeRepository;
    @Autowired
    private ProductInformationRepository productInformationRepository;
    @Override
    public Product saveProduct(ProductRequest productRequest) {
        Product product = new Product();

        Shop shop = shopRepository.findShopsById(productRequest.getId_shop());
        if(shop == null){
            throw new RuntimeException("Cannot find shop by id_shop: "+
                                productRequest.getId_shop());
        }product.setShop(shop);

        Type type = typeRepository.findTypeById(productRequest.getId_type());
        if(type == null){
            throw new RuntimeException("Cannot find type by id_type: "+
                    productRequest.getId_type());
        }
        product.setType(type);

        ProductInformation productInformation = productInformationRepository.findProductInformationById(productRequest.getProduct_info_id());
        if(productInformation == null){
            throw new RuntimeException("Cannot find product_info by id_type: "+
                    productRequest.getProduct_info_id());
        }
        product.setProductInformation(productInformation);

        product.setTitle(productRequest.getTitle());
        product.setPrice(productRequest.getPrice());
        product.setDescription(productRequest.getDescription());
        product.setQuantity(productRequest.getQuantity());
        product.setCreatedAt(new Date());

        return productRepository.save(product);
    }

    @Override
    public void deleteProductById(Long id) {
        Product product = productRepository.findProductById(id);
        if(product == null){
            throw new UserNotFoundException("Product cannot find by id : "+ id);
        }
        productInformationRepository.deleteProductInformationById(product.getProductInformation().getId());

        List<Image> images = imageRepository.findImageByProductId(id);
        if(images.size() > 0){
            imageRepository.deleteAll(images);
        }

        List<Color> colors = colorRepository.findColorByProductId(id);
        if(colors.size() > 0){
            colorRepository.deleteAll(colors);
        }

        List<Size> sizes = sizeRepository.findSizesByProductId(id);
        if(sizes.size() > 0 ){
            sizeRepository.deleteAll(sizes);
        }
        productRepository.delete(product);
    }

    @Override
    public Product updateProduct(ProductUpdateRequest productUpdateRequesttRequestRequest, Long id) {
        Product product = productRepository.findProductById(id);
        if(product == null){
            throw  new UserNotFoundException("Cannot find product by id : "+id);
        }
        product.setTitle(productUpdateRequesttRequestRequest.getTitle());
        product.setPrice(productUpdateRequesttRequestRequest.getPrice());
        product.setQuantity(productUpdateRequesttRequestRequest.getQuantity());
        product.setDescription(productUpdateRequesttRequestRequest.getDescription());
        return productRepository.save(product);
    }

    @Override
    public List<ProductResponse > listAll() {
        List<Product> products = productRepository.findAll();
        List<ProductResponse> productResponses = new ArrayList<>();
        for (Product product : products) {
            ProductResponse productResponse = new ProductResponse();
            List<Image> images = imageRepository.findImageByProductId(product.getId());
            List<Size> sizes = sizeRepository.findSizesByProductId(product.getId());
            List<Color> colors = colorRepository.findColorByProductId(product.getId());
            productResponse.setProduct(product);
            productResponse.setSizes(sizes);
            productResponse.setImages(images);
            productResponse.setColors(colors);
            productResponses.add(productResponse);
        }
        return productResponses;
    }

    @Override
    public List<ProductResponse> listProductByTypeId(Long typeId) {
        List<Product> products = productRepository.findProductsByTypeId(typeId);
        List<ProductResponse> productResponses = new ArrayList<>();
        for (Product product : products) {
            ProductResponse productResponse = new ProductResponse();
            List<Image> images = imageRepository.findImageByProductId(product.getId());
            List<Size> sizes = sizeRepository.findSizesByProductId(product.getId());
            List<Color> colors = colorRepository.findColorByProductId(product.getId());
            productResponse.setProduct(product);
            productResponse.setSizes(sizes);
            productResponse.setImages(images);
            productResponse.setColors(colors);
            productResponses.add(productResponse);
        }
        return productResponses;
    }
    @Override
    public List<ProductResponse> listProductByShopId(Long id) {
        List<Product> products = productRepository.findProductsByShopId(id);
        List<ProductResponse> productResponses = new ArrayList<>();
        for (Product product : products) {
            ProductResponse productResponse = new ProductResponse();
            List<Image> images = imageRepository.findImageByProductId(product.getId());
            List<Size> sizes = sizeRepository.findSizesByProductId(product.getId());
            List<Color> colors = colorRepository.findColorByProductId(product.getId());
            productResponse.setProduct(product);
            productResponse.setSizes(sizes);
            productResponse.setImages(images);
            productResponse.setColors(colors);
            productResponses.add(productResponse);
        }
        return productResponses;
    }

    @Override
    public ProductResponse findProductById(Long id) {
        Product product = productRepository.findProductById(id);
        if(product == null){
            throw  new RuntimeException("Cannot find product by id : "+id);
        }
        ProductResponse productResponse = new ProductResponse();
        List<Image> images = imageRepository.findImageByProductId(product.getId());
        List<Size> sizes = sizeRepository.findSizesByProductId(product.getId());
        List<Color> colors = colorRepository.findColorByProductId(product.getId());
        productResponse.setProduct(product);
        productResponse.setSizes(sizes);
        productResponse.setImages(images);
        productResponse.setColors(colors);
        return productResponse;
    }

    @Override
    public ProductPageResponse getProductByPage(int page, int limit, long id) {
        Pageable pageable = PageRequest.of(page-1,limit);
        Page<Product> productPage = productRepository.findProductByShopId(pageable,id);
        if (id == 0) {
            productPage = productRepository.findAll(pageable);
        }
        Integer totalPage = productPage.getTotalPages();
        Long totalElement = productPage.getTotalElements();
        List<ProductResponse> productResponses = new ArrayList<>();
        for (Product product : productPage){
            ProductResponse productResponse = new ProductResponse();
            List<Image> images = imageRepository.findImageByProductId(product.getId());
            List<Size> sizes = sizeRepository.findSizesByProductId(product.getId());
            List<Color> colors = colorRepository.findColorByProductId(product.getId());
            productResponse.setProduct(product);
            productResponse.setSizes(sizes);
            productResponse.setImages(images);
            productResponse.setColors(colors);
            productResponses.add(productResponse);
        }
        ProductPageResponse productPageResponse = new ProductPageResponse(productResponses,totalPage,totalElement);
        return productPageResponse;
    }
}
