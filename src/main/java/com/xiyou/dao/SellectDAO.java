package com.xiyou.dao;

import com.xiyou.domain.City;
import com.xiyou.domain.County;
import com.xiyou.domain.Province;

import java.util.List;

public interface SellectDAO {


    List<Province> selectProvinces();

    List<City> selectCity(String provinceId);

    List<County> selectCounty(String cityId);

}
