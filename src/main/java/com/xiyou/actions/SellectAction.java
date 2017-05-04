package com.xiyou.actions;

import java.util.Map;

import com.opensymphony.xwork2.ActionSupport;
import com.xiyou.domain.Category;
import com.xiyou.service.SellectService;
import com.xiyou.util.BookStoreWebUtils;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller("sellectAction ")
public class SellectAction extends ActionSupport implements SessionAware{

	private static final long serialVersionUID = 1L;

	@Autowired
	private SellectService sellectService;

	Map<String, Object> session;
	Map<String, Object> dataMap;
	private String provinceId;
	private String cityId;
	private Category category;

	/**
	 * 修改小类别
	 * url:select-updateCategory.action?category.categoryId=5&category.categoryName=haha
	 * @return
     */
	public String updateCategory(){
		sellectService.updateCategory(category.getCategoryId().toString(), category.getCategoryName());
		return "updateCategory";
	}

	/**
	 * 根据大类别获取小类别
	 * url:select-getCategory.action?category.categoryPId=1
	 * @return
     */
	public String selectCategory(){
		dataMap = BookStoreWebUtils.getDataMap(session);
		dataMap.put("categories",sellectService.getCatrgory(category.getCategoryPId().toString()));
		return SUCCESS;
	}

	/**
	 * 获取所有省份信息
	 * url:select-getProvince.action
	 * @return
     */
	public String getProvince(){
		dataMap = BookStoreWebUtils.getDataMap(session);
		dataMap.put("province", sellectService.selectProvinces());
		return SUCCESS;
	}

	/**
	 * 获取所有市信息
	 * url:select-getCities.action
	 * 需传入provinceId
	 * @return
     */
	public String getCities(){
		dataMap = BookStoreWebUtils.getDataMap(session);
		dataMap.put("cities",sellectService.selectCity(provinceId));
		return SUCCESS;
	}
	/**
	 * 获取所有县信息
	 * url:select-getCounties.action
	 * 需传入cityId
	 * @return
	 */
	public String getCounties(){
		dataMap = BookStoreWebUtils.getDataMap(session);
		dataMap.put("counties",sellectService.selectCounty(cityId));
		return SUCCESS;
	}

	public void setCityId(String cityId) {
		this.cityId = cityId;
	}

	public void setProvinceId(String provinceId) {
		this.provinceId = provinceId;
	}

	public Map<String, Object> getDataMap() {
		return dataMap;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Category getCategory() {
		return category;
	}

	@Override
	public void setSession(Map<String, Object> session) {
		this.session = session;
	}
}
