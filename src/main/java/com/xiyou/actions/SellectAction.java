package com.xiyou.actions;

import java.util.List;

import com.opensymphony.xwork2.ActionSupport;
import com.xiyou.domain.City;
import com.xiyou.domain.County;
import com.xiyou.service.ShopService;

public class SellectAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	private ShopService shopService;
	private String provinceId;
	private String cityId;
	private List<City> cities;
	private List<County> counties;

	public String selectCities(){
		cities = shopService.selectCity(provinceId);
		return "selectCities";
	}
	
	public String selectCounties(){
		counties = shopService.selectCounty(cityId);
		return "selectCounties";
	}

	public List<City> getCities() {
		return cities;
	}

	public void setCities(List<City> cities) {
		this.cities = cities;
	}

	public List<County> getCounties() {
		return counties;
	}

	public void setCounties(List<County> counties) {
		this.counties = counties;
	}

	public void setShopService(ShopService shopService) {
		this.shopService = shopService;
	}

	public void setCityId(String cityId) {
		this.cityId = cityId;
	}

	public void setProvinceId(String provinceId) {
		this.provinceId = provinceId;
	}
}
