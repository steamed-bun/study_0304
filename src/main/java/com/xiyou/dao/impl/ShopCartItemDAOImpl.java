package com.xiyou.dao.impl;

import com.xiyou.dao.ShopCartItemDAO;
import com.xiyou.domain.ShopCartItem;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("shopCartItemDAOImpl")
public class ShopCartItemDAOImpl extends BaseDAOImpl implements ShopCartItemDAO {


    @Override
    public void deleteShopItems(List<ShopCartItem> shopCartItems) {
        String hql = "DELETE FROM ShopCartItem s WHERE s.cartItemId = :cartItemId";
        for (ShopCartItem shopCartItem : shopCartItems) {
            getSession().createQuery(hql).setInteger("cartItemId", shopCartItem.getCartItemId().intValue());
        }
    }

    @Override
    public void addShopItem(ShopCartItem shopCartItem) {
        getSession().saveOrUpdate(shopCartItem);
    }

    @Override
    public ShopCartItem getShopCartItemById(String cartItemId) {
        String hql = "FROM ShopCartItem s " +
                "left outer join fetch s.user " +
                "left outer join fetch s.book " +
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
        String hql = "FROM ShopCartItem s WHERE s.user = :userId";
        @SuppressWarnings("unchecked")
        List<ShopCartItem> list = (List<ShopCartItem>) getSession().createQuery(hql)
                .setString("userId",userId).list();
        return list;
    }

    @Override
    public void updateQuantity(String quantity, String cartItemId) {
        String hql = "UPDATE ShopCartItem s SET s.quantity = :quantity " +
                "WHERE s.cartItemId = :cartItemId";
        getSession().createQuery(hql).setString("quantity",quantity).setString("cartItemId",cartItemId).executeUpdate();
    }
}
