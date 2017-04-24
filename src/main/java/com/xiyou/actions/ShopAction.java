package com.xiyou.actions;

import java.util.Map;

import com.xiyou.util.BookStoreWebUtils;
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
	private Map<String, Object> dataMap;
	private String status = "yes";

	public String delete(){
		String shopId = session.get("shopId").toString();
		shopService.delete(shopId);
		System.out.println(shopId);
		return "delete";
	}

	/**
	 * shop本是自动注册的，所以只有修改
	 * 需要seller是登录状态
	 * url：shop-updateShop.action
	 * 必须传参shop.shopId
	 * @return
     */
	public String updateShop(){
		dataMap = BookStoreWebUtils.getDataMap(session);
		shopService.addShop(shop);
		session.put("shopId", shop.getShopId());
		shop = null;
		return "updateShop";
	}
	
	public void prepareUpdateShop(){
		shop = shopService.sellectShop(session.get("shopId").toString());
	}

	public String selectShop(){
		dataMap = BookStoreWebUtils.getDataMap(session);
		shopId = session.get("shopId").toString();
		if(shopId != null){
			shop = shopService.sellectShop(shopId);
		}
		dataMap.put("shop",shop);
		this.setShop(null);
		return "selectShop";
	}

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

	public Map<String, Object> getDataMap() {
		return dataMap;
	}
}
