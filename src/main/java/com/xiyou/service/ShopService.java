package com.xiyou.service;

import java.util.List;

import com.xiyou.dao.impl.ShopDAOImpl;
import com.xiyou.domain.City;
import com.xiyou.domain.County;
import com.xiyou.domain.Province;
import com.xiyou.domain.Shop;


public class ShopService {

	private ShopDAOImpl shopDAOImpl;

	public void setShopDAOImpl(ShopDAOImpl shopDAOImpl) {
		this.shopDAOImpl = shopDAOImpl;
	}
	
	public Shop sellectShop(String shopId){
		return shopDAOImpl.selectShop(shopId);
	}
	
	public void delete(String shopId){
		shopDAOImpl.delete(shopId);
	}
	
	public List<Province> selectProvinces() {
		return shopDAOImpl.selectProvinces();
	}

	public List<City> selectCity(String provinceId) {
		return shopDAOImpl.selectCity(provinceId);
	}

	public List<County> selectCounty(String cityId) {
		return shopDAOImpl.selectCounty(cityId);
	}	
	public String addShop(String selId, Shop shop){
		return shopDAOImpl.addShop(selId,shop);
	}
		
}
