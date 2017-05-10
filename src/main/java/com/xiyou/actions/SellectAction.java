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
	private Map<String, Object> dataMap;
	private String provinceId;
	private String cityId;
	private Category category;

	/**
	 * 已测
	 * 删除子类
	 * url:select-deleteCategory.action?category.categoryId=5
	 * @return null
     */
	public String deleteCategory(){
		dataMap = BookStoreWebUtils.getDataMap(session);
		try {
			sellectService.deleteCategory(category.getCategoryId());
			dataMap.put("noDelete", "yesDelete");
		} catch (Exception e) {
			dataMap.put("status", "no");
			dataMap.put("noDelete","noDelete");
			this.setCategory(null);
			return SUCCESS;
		}
		this.setCategory(null);
		return SUCCESS;
	}

	/**
	 * 已测
	 * 添加一个子类
	 * url:select-saveCategory.action?category.categoryPId=1&category.categoryName=test
	 * @return
     */
	public String saveCategory(){
		dataMap = BookStoreWebUtils.getDataMap(session);
		sellectService.saveCategory(category);
		this.setCategory(null);
		return SUCCESS;
	}

	/**
	 * 已测
	 * 修改小类别
	 * url:select-updateCategory.action?category.categoryId=5&category.categoryName=haha
	 * @return
     */
	public String updateCategory(){
		dataMap = BookStoreWebUtils.getDataMap(session);
		sellectService.updateCategory(category.getCategoryId().toString(), category.getCategoryName());
		this.setCategory(null);
		return "updateCategory";
	}

	/**
	 * 已测
	 * 根据大类别获取小类别
	 * url:select-selectCategory.action?category.categoryPId=1
	 * @return
     */
	public String selectCategory(){
		dataMap = BookStoreWebUtils.getDataMap(session);
		dataMap.put("category",sellectService.getCategory(category.getCategoryPId()));
		dataMap.put("categories",sellectService.getCatrgory(category.getCategoryPId().toString()));
		this.setCategory(null);
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
