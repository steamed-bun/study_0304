package com.xiyou.actions;

import java.util.Map;

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
public class ShopAction extends ActionSupport implements SessionAware, RequestAware,
			ModelDriven<Shop>, Preparable {

	private static final long serialVersionUID = 1L;

	@Autowired
	private ShopService shopService;

	private Shop shop;
	private String shopId;
	private Map<String, Object> session;
	Map<String, Object> request;

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
	
	public String selectSelect(){
		request.put("province", shopService.selectProvinces());
		return "selectSelect";
	}
	
	public void prepareSelectSelect(){
		if(shopId != null){
			shopService.sellectShop(shopId);
		}
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
	
	@Override
	public void setRequest(Map<String, Object> arg0) {
		this.request = arg0;
	}

	public void setShop(Shop shop) {
		this.shop = shop;
	}

	public Shop getShop() {
		return shop;
	}

	public String getShopId() {
		return shopId;
	}

	public void setShopId(String shopId) {
		this.shopId = shopId;
	}
}
