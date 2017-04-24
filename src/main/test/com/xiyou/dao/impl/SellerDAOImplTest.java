package com.xiyou.dao.impl;

import com.xiyou.dao.SellerDAO;
import com.xiyou.dao.ShopDAO;
import com.xiyou.domain.Seller;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:applicationContext-beans.xml","classpath:applicationContext.xml"})
public class SellerDAOImplTest {

    @Autowired
    private SellerDAO sellerDAO;

    @Autowired
    private ShopDAO shopDAO;

    @Transactional
    @Test
    public void testAddSeller() throws Exception {
        Seller seller = sellerDAO.getSellerById("8");
        sellerDAO.addSeller(seller);
    }

    @Test
    public void testValidateTel() throws Exception {

    }

    @Test
    public void testGetSellerById() throws Exception {

    }

    @Transactional
    @Test
    public void testGetSellerByEmial() throws Exception {
        System.out.println(sellerDAO.getSellerByEmial("12@","1234"));
    }

    @Test
    public void testUpdateSelImage() throws Exception {

    }

    @Test
    public void testUpdateSelWeiXin() throws Exception {

    }

    @Transactional
    @Test
    public void testGetWeixinURLByShopId(){
        System.out.println(sellerDAO.getWeixinURLByShopId("25"));
    }
}