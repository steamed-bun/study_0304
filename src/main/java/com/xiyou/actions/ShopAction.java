package com.xiyou.actions;

import java.util.Map;

import org.apache.struts2.interceptor.RequestAware;
import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Preparable;
import com.xiyou.domain.Shop;
import com.xiyou.service.ShopService;

public class ShopAction extends ActionSupport implements SessionAware, RequestAware,
			ModelDriven<Shop>, Preparable {

	private static final long serialVersionUID = 1L;
	
	private Shop shop;
	private String shopId;
	private ShopService shopService;
	private Map<String, Object> session;
	Map<String, Object> request;

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

	public void setShopService(ShopService shopService) {
		this.shopService = shopService;
	}

	public String delete(){
		String shopId = session.get("shopId").toString();
		shopService.delete(shopId);
		System.out.println(shopId);
		return "delete";
	}
	
	public String addShop(){
		String selId = session.get("selId").toString();
		if(shopId == null){
			shopId = shopService.addShop(selId, shop);
			session.put("shopId", shopId);
		}else{
			shopService.addShop(selId, shop);
		}
		return "addShop";
	}
	
	public void prepareAddShop(){
		if(shopId == null){
			shop = new Shop();
		}else {
			shop = shopService.sellectShop(shopId);
		}
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

}
