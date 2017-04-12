package com.xiyou.service;

import com.xiyou.dao.ShopCartItemDAO;
import com.xiyou.domain.ShopCartItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShopCartService {

    @Autowired
    private ShopCartItemDAO shopCartItemDAO;

    public void addShopCartItem(ShopCartItem shopCartItem){
        shopCartItemDAO.addShopItem(shopCartItem);
    }

}
