package com.example.springbootecommerce.service.implement;

import com.example.springbootecommerce.pojo.entity.ProductInformation;
import com.example.springbootecommerce.pojo.requests.ProductInformationRequest;
import com.example.springbootecommerce.pojo.requests.ProductRequest;
import com.example.springbootecommerce.repository.ProductInformationRepository;
import com.example.springbootecommerce.service.ProductInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductInformationImplementService implements ProductInformationService {
    @Autowired
    private ProductInformationRepository productInformationRepository;

    @Override
    public ProductInformation createProductInfo(ProductInformationRequest productInformationRequest) {
        ProductInformation pr = new ProductInformation();
        pr.setTrade_mark(productInformationRequest.getTrade_mark());
        pr.setMaterial(productInformationRequest.getMaterial());
        pr.setSample(productInformationRequest.getSample());
        pr.setStyle(productInformationRequest.getStyle());
        pr.setOrigin(productInformationRequest.getOrigin());
        pr.setSeason(productInformationRequest.getSeason());
        pr.setTall_fit(productInformationRequest.getTall_fit());
        pr.setVery_big(productInformationRequest.getVery_big());
        pr.setDesign(productInformationRequest.getDesign());
        pr.setCollar(productInformationRequest.getCollar());
        return productInformationRepository.save(pr);
    }

    @Override
    public void deleteProductInfo(Long id) {
        ProductInformation productInformation = productInformationRepository.findProductInformationById(id);
        if(productInformation == null){
            throw new RuntimeException("Cannot find product_info by id: "+ id);
        }
        productInformationRepository.delete(productInformation);
    }

    @Override
    public ProductInformation updateProductInfo(ProductInformationRequest productInformationRequest, Long id) {
        ProductInformation pr = productInformationRepository.findProductInformationById(id);
        if(pr == null){
            throw new RuntimeException("Cannot find product_info by id: "+ id);
        }
        pr.setTrade_mark(productInformationRequest.getTrade_mark());
        pr.setMaterial(productInformationRequest.getMaterial());
        pr.setSample(productInformationRequest.getSample());
        pr.setStyle(productInformationRequest.getStyle());
        pr.setOrigin(productInformationRequest.getOrigin());
        pr.setSeason(productInformationRequest.getSeason());
        pr.setTall_fit(productInformationRequest.getTall_fit());
        pr.setVery_big(productInformationRequest.getVery_big());
        pr.setDesign(productInformationRequest.getDesign());
        pr.setCollar(productInformationRequest.getCollar());

        return productInformationRepository.save(pr);
    }
}
