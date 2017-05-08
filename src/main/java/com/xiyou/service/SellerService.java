package com.xiyou.service;

import com.xiyou.dao.SellectDAO;
import com.xiyou.dao.SellerDAO;
import com.xiyou.dao.ShopDAO;
import com.xiyou.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("sellerService")
public class SellerService {

	@Autowired
	private SellerDAO sellerDAO;

	@Autowired
	private ShopDAO shopDAO;

	public int getTotalPageNo(){
		long tatalPageNo = sellerDAO.getTotalPageNo();
		return (int) tatalPageNo;
	}

	public List<Seller> getSellersForBack(Integer pageNum){
		List<Seller> sellers = sellerDAO.getSellersForBack(pageNum);
		return sellers;
	}

	public void addSeller(Seller seller){
		if (seller.getSelId() == null){
			Shop shop = Shop.getShop();
			System.out.println(shop);
			shopDAO.addShop(shop);
			seller.setShop(shop);
		}
		sellerDAO.addSeller(seller);
	}
	
	public Seller getSellerByEmial(String selTel,String selPassword){
		Seller seller = sellerDAO.getSellerByEmial(selTel,selPassword);
		return seller;
	}

	public Seller getSellerById(String selId){
		return sellerDAO.getSellerById(selId);
	}

	public String updateSelImage(String selImage, String selId){
		return sellerDAO.updateSelImage(selImage, selId);
	}
	
	public String updateSelWeiXin(String selWeiXin, String selId){
		return sellerDAO.updateSelWeiXin(selWeiXin, selId);
	}
}
