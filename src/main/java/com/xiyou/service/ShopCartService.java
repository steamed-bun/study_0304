package com.xiyou.service;

import com.xiyou.dao.ShopCartItemDAO;
import com.xiyou.domain.ShopCartItem;
import com.xiyou.util.BookStoreWebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("shopCartService")
public class ShopCartService {

    @Autowired
    private ShopCartItemDAO shopCartItemDAO;

    public void deleteShopItems(List<ShopCartItem> shopCartItems){
        shopCartItemDAO.deleteShopItems(shopCartItems);
    }

    public void addShopCartItem(ShopCartItem shopCartItem){
        shopCartItemDAO.addShopItem(shopCartItem);
    }

    public ShopCartItem getShopCartItemById(String cartItemId){
        return shopCartItemDAO.getShopCartItemById(cartItemId);
    }

    public List<ShopCartItem> getShopItemByUserId(String userId){
        List<ShopCartItem> shopCartItems = shopCartItemDAO.getShopItemByUserId(userId);
        shopCartItems = BookStoreWebUtils.setNullTo(shopCartItems);
        return shopCartItems;
    }

    public void updateQuantity(String quantity, String cartItemId){
        shopCartItemDAO.updateQuantity(quantity, cartItemId);
    }

}
