package com.xiyou.service;

import com.xiyou.dao.SellerDAO;
import com.xiyou.dao.ShopDAO;
import com.xiyou.domain.Seller;
import com.xiyou.domain.Shop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("sellerService")
public class SellerService {

	@Autowired
	private SellerDAO sellerDAO;

	@Autowired
	private ShopDAO shopDAO;

	public void addSeller(Seller seller){
		Shop shop = Shop.getShop();
		shopDAO.addShop(shop);
		seller.setShop(shop);
		sellerDAO.addSeller(seller);
	}
	
	public Seller getSellerByEmial(String selTel,String selPassword){
		Seller seller = sellerDAO.getSellerByEmial(selTel,selPassword);
		return seller;
	}

	public Seller getSellerById(String selId){
		return sellerDAO.getSellerById(selId);
	}

	public void updateSelImage(String selImage, String selId){
		sellerDAO.updateSelImage(selImage, selId);
	}
	
	public void updateSelWeiXin(String selWeiXin, String selId){
		sellerDAO.updateSelWeiXin(selWeiXin, selId);
	}
}
