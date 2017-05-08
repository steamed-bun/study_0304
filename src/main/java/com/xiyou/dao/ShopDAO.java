package com.xiyou.dao;

import com.xiyou.domain.Book;
import com.xiyou.domain.Shop;

import java.util.List;

public interface ShopDAO {

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
	
	/**
	 * 鏌ユ壘Shop閫氳繃shopId
	 * @param shopId
	 * @return
	 */
	Shop getShopByShopId(String shopId);

	Shop selectShop(String shopId);

}
