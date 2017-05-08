package com.xiyou.dao.impl;

import com.xiyou.dao.ShopDAO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:applicationContext-beans.xml","classpath:applicationContext.xml"})
public class ShopDAOImplTest {

    @Autowired
    private ShopDAO shopDAO;

    @Test
    @Transactional
    public void testUpdateShopGrade() throws Exception {
        shopDAO.updateShopGrade(25, 3);
    }

    @Test
    public void testAddShop() throws Exception {

    }

    @Test
    public void testSelectShop() throws Exception {

    }

    @Test
    public void testGetShopByShopId() throws Exception {

    }

    @Test
    public void testSelectProvinces() throws Exception {

    }

    @Test
    public void testSelectCity() throws Exception {

    }

    @Test
    public void testDelete() throws Exception {

    }
}