package com.xiyou.service;

import com.xiyou.dao.ShopDAO;
import com.xiyou.domain.Shop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("shopService")
public class ShopService {

	@Autowired
	private ShopDAO shopDAO;

	public String updateShopImage(String shopImage, String shopId){
		return shopDAO.updateShopImage(shopImage, shopId);
	}

	public Shop sellectShop(String shopId){
		return shopDAO.selectShop(shopId);
	}
	
	public void delete(String shopId){
		shopDAO.delete(shopId);
	}

	public void addShop(Shop shop){
		shopDAO.addShop(shop);
	}

}
