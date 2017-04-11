package com.xiyou.service;

import com.xiyou.dao.impl.SellerDAOImpl;
import com.xiyou.domain.Seller;

public class SellerService {

	private SellerDAOImpl sellerDAOImpl;

	public void setSellerDAOImpl(SellerDAOImpl sellerDAOImpl) {
		this.sellerDAOImpl = sellerDAOImpl;
	}

	public String addSeller(Seller seller){
		return sellerDAOImpl.addSeller(seller);
	}
	
	public Seller selectSeller(String selId){
		Seller seller = sellerDAOImpl.selectSel(selId); 
		return seller;
	}
	
	public void updateSelImage(String selImage, String selId){
		sellerDAOImpl.updateSelImage(selImage, selId);
	}
	
	public void updateSelWeiXin(String selWeiXin, String selId){
		sellerDAOImpl.updateSelWeiXin(selWeiXin, selId);
	}
}
