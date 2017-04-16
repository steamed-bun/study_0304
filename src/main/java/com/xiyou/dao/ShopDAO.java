package com.xiyou.dao;

import java.util.List;

import com.xiyou.domain.City;
import com.xiyou.domain.County;
import com.xiyou.domain.Province;
import com.xiyou.domain.Shop;

public interface ShopDAO {

	void delete(String shopId);
	
	/**
	 * ���һ��shop��ͬʱ�޸�seller��shopId
	 * @param shop
	 */
	String addShop(String selId,Shop shop);
	
	/**
	 * 鏌ユ壘Shop閫氳繃shopId
	 * @param shopId
	 * @return
	 */
	Shop getShopByShopId(String shopId);

	Shop selectShop(String shopId);

	List<Province> selectProvinces();
	
	List<City> selectCity(String provinceId);
	
	List<County> selectCounty(String cityId);
}
