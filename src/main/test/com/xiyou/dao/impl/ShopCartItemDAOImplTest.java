package com.xiyou.dao.impl;

import com.xiyou.dao.ShopCartItemDAO;
import com.xiyou.domain.ShopCartItem;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:applicationContext-beans.xml","classpath:applicationContext.xml"})
public class ShopCartItemDAOImplTest {

    @Autowired
    private ShopCartItemDAO shopCartItemDAO;

    @Transactional
    @Test
    public void testAddShopItem() throws Exception {

    }

    @Transactional
    @Test
    public void testGetShopCartItemById() throws Exception {
        ShopCartItem shopCartItem = shopCartItemDAO.getShopCartItemById("11");
        System.out.println("hhaha");
    }

    @Test
    public void testGetShopItemByUserId() throws Exception {

    }
}