package com.xiyou.actions;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.xiyou.domain.Province;
import org.apache.struts2.interceptor.RequestAware;
import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Preparable;
import com.xiyou.domain.Shop;
import com.xiyou.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller("shopAction")
public class ShopAction extends ActionSupport implements SessionAware,
			ModelDriven<Shop>, Preparable {

	private static final long serialVersionUID = 1L;

	@Autowired
	private ShopService shopService;

	private Shop shop;
	private String shopId;
	private Map<String, Object> session;
	private List<Province> provinces;
	private String status;

	Map<String, Object> dataMap;

	public ShopAction() {
		this.dataMap = new HashMap<String, Object>();
	}

	public String delete(){
		String shopId = session.get("shopId").toString();
		shopService.delete(shopId);
		System.out.println(shopId);
		return "delete";
	}

	/**
	 * shop本是自动注册的，所以只有修改
	 * url：shop-updateShop.action
	 * 必须传参shop.shopId
	 * @return
     */
	public String updateShop(){
		shopService.addShop(shop);
		session.put("shopId", shop.getShopId());
		return "updateShop";
	}
	
	public void prepareUpdateShop(){
		shop = shopService.sellectShop(shopId);
	}

	public String selectShop(){
		shopId = session.get("shopId").toString();
		if(shopId != null){
			shop = shopService.sellectShop(shopId);
		}
		return "selectShop";
	}



	
/*
	public void prepareSelectSelect(){
		if(shopId != null){
			shopService.sellectShop(shopId);
		}
	}
*/

	@Override
	public Shop getModel() {
		return shop;
	}

	@Override
	public void setSession(Map<String, Object> session) {
		this.session = session;
	}
	
	@Override
	public void prepare() throws Exception {
	}

	public void setShop(Shop shop) {
		this.shop = shop;
	}

	public Shop getShop() {
		return shop;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}



	public List<Province> getProvinces() {
		return provinces;
	}

	public Map<String, Object> getDataMap() {
		return dataMap;
	}
}
