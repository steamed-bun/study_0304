package com.xiyou.service;

import com.xiyou.dao.SellectDAO;
import com.xiyou.domain.Category;
import com.xiyou.domain.City;
import com.xiyou.domain.County;
import com.xiyou.domain.Province;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SellectService {

    @Autowired
    private SellectDAO sellectDAO;

    public void deleteCategory(Integer categoryId){
        sellectDAO.deleteCategory(categoryId);
    }

    public void saveCategory(Category category){
        sellectDAO.saveCatefgory(category);
    }

    public void updateCategory(String categoryId, String categoryName){
        sellectDAO.updateCategory(categoryId, categoryName);
    }

    public List<Province> selectProvinces() {
        return sellectDAO.selectProvinces();
    }

    public List<City> selectCity(String provinceId) {
        return sellectDAO.selectCity(provinceId);
    }

    public List<County> selectCounty(String cityId) {
        return sellectDAO.selectCounty(cityId);
    }

    public List<Category> getCatrgory(String categoryPId){
        return sellectDAO.getCategory(categoryPId);
    }

}
