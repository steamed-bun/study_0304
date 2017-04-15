package com.xiyou.service;

import com.xiyou.dao.ShopCartItemDAO;
import com.xiyou.domain.ShopCartItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShopCartService {

    @Autowired
    private ShopCartItemDAO shopCartItemDAO;

    public String addShopCartItem(ShopCartItem shopCartItem){
        return shopCartItemDAO.addShopItem(shopCartItem);
    }

    public ShopCartItem getShopCartItemById(String cartItemId){
        return shopCartItemDAO.getShopCartItemById(cartItemId);
    }

}
