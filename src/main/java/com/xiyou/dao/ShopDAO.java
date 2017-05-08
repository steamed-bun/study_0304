package com.xiyou.dao;

import com.xiyou.domain.Shop;

public interface ShopDAO {

	/**
	 * 书本详情页所需部分shop信息
	 * @param shopId
	 * @return
     */
	Shop getShopById(Integer shopId);

	/**
	 * 已测
	 * 更新shopGrade
	 * @param shopId shopId
	 * @param shopGrade shopGrade
     */
	void updateShopGrade(Integer shopId, Integer shopGrade);

	/**
	 * 更新shopImage
	 * @param shopImage
	 * @param shopId
     * @return
     */
	String updateShopImage(String shopImage,String shopId);

	void delete(String shopId);

	/**
	 * 已测
	 * 添加一条shop数据
	 * @param shop
     */
	void addShop(Shop shop);

	Shop selectShop(String shopId);

}
