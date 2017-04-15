package com.xiyou.dao;

import com.xiyou.domain.ShopCartItem;

import java.util.List;

public interface ShopCartItemDAO {

    /**
     * 已测
     * 添加一条记录购物
     * @param shopCartItem
     */
    String addShopItem(ShopCartItem shopCartItem);

    /**
     * 获取一条ShopCartItem数据
     * @return
     */
    ShopCartItem getShopCartItemById(String cartItemId);

    /**
     * 已测
     * 根据userId找到其购物车所有信息
     * @param userId
     * @return
     */
    List<ShopCartItem> getShopItemByUserId(String userId);

}
