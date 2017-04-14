package com.xiyou.service;

import com.xiyou.dao.ShopDAO;
import com.xiyou.dao.impl.SellerDAOImpl;
import com.xiyou.dao.impl.ShopDAOImpl;
import com.xiyou.domain.Seller;
import com.xiyou.domain.Shop;
import org.springframework.beans.factory.annotation.Autowired;

public class SellerService {

	private SellerDAOImpl sellerDAOImpl;

	@Autowired
	private ShopDAO shopDAO;

	public void setSellerDAOImpl(SellerDAOImpl sellerDAOImpl) {
		this.sellerDAOImpl = sellerDAOImpl;
	}

	public String addSeller(Seller seller){
		return sellerDAOImpl.addSeller(seller);
	}
	
	public Seller getSellerByEmial(String selTel,String selPassword){
		Seller seller = sellerDAOImpl.getSellerByEmial(selTel,selPassword);
		return seller;
	}

	public Seller getSellerById(String selId){
		return sellerDAOImpl.getSellerById(selId);
	}

	public void updateSelImage(String selImage, String selId){
		sellerDAOImpl.updateSelImage(selImage, selId);
	}
	
	public void updateSelWeiXin(String selWeiXin, String selId){
		sellerDAOImpl.updateSelWeiXin(selWeiXin, selId);
	}
}
