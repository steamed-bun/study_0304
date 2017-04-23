package com.xiyou.dao.impl;

import com.xiyou.dao.SellectDAO;
import com.xiyou.domain.City;
import com.xiyou.domain.County;
import com.xiyou.domain.Province;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SellectDAOImpl extends BaseDAOImpl implements SellectDAO{

    @Override
    public List<Province> selectProvinces() {
        String hql = "from Province";
        @SuppressWarnings("unchecked")
        List<Province> list = getSession().createQuery(hql).list();
        return list;
    }

    @Override
    public List<City> selectCity(String provinceId) {
        String hql = "SELECT new City(c.cityId, c.cityName) from City c WHERE c.province = :provinceId";

        @SuppressWarnings("unchecked")
        List<City> list = getSession().createQuery(hql).setString("provinceId", provinceId).list();
        return list;
    }

    @Override
    public List<County> selectCounty(String cityId) {
        String hql = "SELECT new County (c.countyId, c.countyName) from County c " +
                "WHERE c.city = :cityId";
        @SuppressWarnings("unchecked")
        List<County> list = getSession().createQuery(hql).setString("cityId", cityId).list();
        return list;
    }

}
