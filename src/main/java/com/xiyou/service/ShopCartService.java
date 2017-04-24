package com.xiyou.service;

import com.xiyou.dao.ShopCartItemDAO;
import com.xiyou.domain.ShopCartItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("shopCartService")
public class ShopCartService {

    @Autowired
    private ShopCartItemDAO shopCartItemDAO;

    public void addShopCartItem(ShopCartItem shopCartItem){
        shopCartItemDAO.addShopItem(shopCartItem);
    }

    public ShopCartItem getShopCartItemById(String cartItemId){
        return shopCartItemDAO.getShopCartItemById(cartItemId);
    }

    public List<ShopCartItem> getShopItemByUserId(String userId){
        return shopCartItemDAO.getShopItemByUserId(userId);
    }

    public void updateQuantity(String quantity, String cartItemId){
        shopCartItemDAO.updateQuantity(quantity, cartItemId);
    }

}
