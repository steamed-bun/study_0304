package com.xiyou.dao;

import com.xiyou.domain.Seller;

import java.util.List;

public interface SellerDAO {

	/**
	 * 已测
	 * 修改当前seller的密码
	 * @param email
	 * @param password
     */
	void updatePassword(String email, String password);

	/**
	 * 已测
	 * 验证是否 有该seller
	 * @param email
	 * @return
     */
	long getSelByEmail(String email);

	/**
	 * 已测
	 * 后台搜索一个seller
	 * @param shopId shopId
	 * @return seller
     */
	Seller getSellerForBack(Integer shopId);

	/**
	 * 已测
	 * 得到seller的总页数
	 * @return 页数
     */
	long getTotalPageNo();

	/**
	 * 已测
	 * 后台获取seller 包括其shop 需要的字段
	 * @param pageNum 页数
	 * @return sellers
     */
	List<Seller> getSellersForBack(Integer pageNum);

	/**
	 * 已测
	 * 添加一个买家
	 * @param seller seller
	 */
	void addSeller(Seller seller) throws Exception;

	/**
	 * 已测
	 * 根据selId查找对应的Seller
	 * @param selId selId
	 * @return seller
	 */
	Seller getSellerById(String selId);

	/**
	 * 已测
	 * 登录
	 * @param selEmail selEmail
	 * @param password password
     * @return seller
     */
	Seller getSellerByEmial(String selEmail, String password);
	
	/**
	 * 更新seller的selImage
	 * @param selImage selImage
	 */
	String updateSelImage(String selImage,String selId);

	/**
	 * 更新seller的selWeiXin
	 * @param selWeiXin selWeiXin
	 * @param selId selId
     */
	String updateSelWeiXin(String selWeiXin,String selId);

	/**
	 * 已测
	 * 根据shopId得到seller的weixin
	 * @param shopId shopId
	 * @return seller的weixin url
     */
	String getWeixinURLByShopId(String shopId);

}
