package com.xiyou.dao.impl;

import com.xiyou.dao.ShopCartItemDAO;
import com.xiyou.domain.ShopCartItem;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ShopCartItemDAOImpl extends BaseDAOImpl implements ShopCartItemDAO {


    @Override
    public void addShopItem(ShopCartItem shopCartItem) {
        getSession().saveOrUpdate(shopCartItem);
    }

    @Override
    public List<ShopCartItem> getShopItemByUserId(String userId) {

        String hql = "FROM ShopCartItem s " +
               "left outer join fetch s.user " +
                "left outer join fetch s.book " +
                "left outer join fetch s.book.category " +
                "left outer join fetch s.book.shop " +
                "left outer join fetch s.book.shop.province " +
                "left outer join fetch s.book.shop.county " +
                "left outer join fetch s.book.shop.city " +
                "WHERE s.user = :userId";
        @SuppressWarnings("unchecked")
        List<ShopCartItem> list = (List<ShopCartItem>) getSession().createQuery(hql).setString("userId",userId).list();
        return list;
    }
}
