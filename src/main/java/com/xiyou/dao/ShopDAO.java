package com.xiyou.dao;

import java.util.List;

import com.xiyou.domain.City;
import com.xiyou.domain.County;
import com.xiyou.domain.Province;
import com.xiyou.domain.Shop;

public interface ShopDAO {

	public abstract void delete(String shopId);
	
	/**
	 * ���һ��shop��ͬʱ�޸�seller��shopId
	 * @param shop
	 */
	public abstract String addShop(String selId,Shop shop);
	
	/**
	 * 鏌ユ壘Shop閫氳繃shopId
	 * @param shopId
	 * @return
	 */
	public abstract Shop getShopByShopId(String shopId);
	
	public abstract List<Province> selectProvinces();
	
	public abstract List<City> selectCity(String provinceId);
	
	public abstract List<County> selectCounty(String cityId);
}
