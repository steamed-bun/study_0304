package com.xiyou.dao;

import com.xiyou.domain.City;
import com.xiyou.domain.County;
import com.xiyou.domain.Province;

import java.util.List;

public interface SellectDAO {


    List<Province> selectProvinces();

    /**
     * 已测
     * 实现不关联查询
     * @param provinceId
     * @return
     */
    List<City> selectCity(String provinceId);

    /**
     * 已测
     * 同上
     * @param cityId
     * @return
     */
    List<County> selectCounty(String cityId);

}
