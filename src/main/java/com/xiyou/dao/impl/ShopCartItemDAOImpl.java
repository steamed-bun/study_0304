package com.xiyou.dao.impl;

import com.xiyou.dao.ShopCartItemDAO;
import com.xiyou.domain.ShopCartItem;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("shopCartItemDAOImpl")
public class ShopCartItemDAOImpl extends BaseDAOImpl implements ShopCartItemDAO {


    @Override
    public String addShopItem(ShopCartItem shopCartItem) {
        //getSession().saveOrUpdate(shopCartItem);
        return getSession().save(shopCartItem).toString();
    }

    @Override
    public ShopCartItem getShopCartItemById(String cartItemId) {
        String hql = "FROM ShopCartItem s " +
                "left outer join fetch s.user " +
                "left outer join fetch s.book " +
                "left outer join fetch s.book.bookImages " +
                "left outer join fetch s.book.category " +
                "left outer join fetch s.book.shop " +
                "left outer join fetch s.book.shop.province " +
                "left outer join fetch s.book.shop.county " +
                "left outer join fetch s.book.shop.city " +
                "WHERE s.cartItemId = :cartItemId";
        @SuppressWarnings("unchecked")
        ShopCartItem shopCartItem = (ShopCartItem) getSession().createQuery(hql)
                .setString("cartItemId",cartItemId).uniqueResult();
        return shopCartItem;
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
