package com.xiyou.dao;

import com.xiyou.domain.Seller;

public interface SellerDAO {

	/**
	 * 添加一个买家
	 * @param seller
	 */
	String addSeller(Seller seller);
	
	/**
	 * 验证电话号码是否已注册
	 * @param selTelTem
	 * @return
	 */
	boolean validateTel(String selTelTem);
	
	/**
	 * 根据selId查找对应的Seller
	 * @param selId
	 * @return
	 */
	Seller selectSel(String selId);
	
	/**
	 * 跟新seller的selImage
	 * @param selImage
	 */
	void updateSelImage(String selImage,String selId);

	/**
	 * 跟新seller的selWeiXin
	 * @param selWeiXin
	 * @param selId
     */
	void updateSelWeiXin(String selWeiXin,String selId);
	
}
