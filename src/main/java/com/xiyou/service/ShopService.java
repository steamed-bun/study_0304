package com.xiyou.service;

import java.util.List;

import com.xiyou.dao.ShopDAO;
import com.xiyou.dao.impl.ShopDAOImpl;
import com.xiyou.domain.City;
import com.xiyou.domain.County;
import com.xiyou.domain.Province;
import com.xiyou.domain.Shop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("shopService")
public class ShopService {

	@Autowired
	private ShopDAO shopDAO;

	public Shop sellectShop(String shopId){
		return shopDAO.selectShop(shopId);
	}
	
	public void delete(String shopId){
		shopDAO.delete(shopId);
	}
	
	public List<Province> selectProvinces() {
		return shopDAO.selectProvinces();
	}

	public List<City> selectCity(String provinceId) {
		return shopDAO.selectCity(provinceId);
	}

	public List<County> selectCounty(String cityId) {
		return shopDAO.selectCounty(cityId);
	}

	public void addShop(Shop shop){
		shopDAO.addShop(shop);
	}

}
