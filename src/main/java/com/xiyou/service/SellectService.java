package com.xiyou.service;

import com.xiyou.dao.SellectDAO;
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

    public List<Province> selectProvinces() {
        return sellectDAO.selectProvinces();
    }

    public List<City> selectCity(String provinceId) {
        return sellectDAO.selectCity(provinceId);
    }

    public List<County> selectCounty(String cityId) {
        return sellectDAO.selectCounty(cityId);
    }

}
