package com.xiyou.dao;

import com.xiyou.domain.Seller;

public interface SellerDAO {

	/**
	 * 已测
	 * 添加一个买家
	 * @param seller
	 */
//	String addSeller(Seller seller);

	void addSeller(Seller seller);

	/**
	 * 验证电话号码是否已注册
	 * @param selTelTem
	 * @return
	 */
	boolean validateTel(String selTelTem);
	
	/**
	 * 已测
	 * 根据selId查找对应的Seller
	 * @param selId
	 * @return
	 */
	Seller getSellerById(String selId);

	/**
	 * 已测
	 * 登录
	 * @param selEmail
	 * @param password
     * @return
     */
	Seller getSellerByEmial(String selEmail, String password);
	
	/**
	 * 更新seller的selImage
	 * @param selImage
	 */
	String updateSelImage(String selImage,String selId);

	/**
	 * 更新seller的selWeiXin
	 * @param selWeiXin
	 * @param selId
     */
	String updateSelWeiXin(String selWeiXin,String selId);

	/**
	 * 已测
	 * 根据shopId得到seller的weixin
	 * @param shopId
	 * @return
     */
	String getWeixinURLByShopId(String shopId);

}
