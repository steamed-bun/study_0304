package com.xiyou.dao;

import com.xiyou.domain.Seller;

public interface SellerDAO {

	/**
	 * 添加一个买家
	 * @param seller
	 */
	public abstract String addSeller(Seller seller);
	
	/**
	 * 验证电话号码是否已注册
	 * @param selTelTem
	 * @return
	 */
	public abstract boolean validateTel(String selTelTem);	
	
	/**
	 * 根据selId查找对应的Seller
	 * @param selId
	 * @return
	 */
	public abstract Seller selectSel(String selId);	
	
	/**
	 * 跟新seller的selImage
	 * @param selImage
	 */
	public abstract void updateSelImage(String selImage,String selId);
	
	/**
	 * 跟新seller的selWeiXin
	 * @param selImage
	 */
	public abstract void updateSelWeiXin(String selWeiXin,String selId);
	
}
