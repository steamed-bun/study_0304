package com.xiyou.service;

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
public class SellerServiceTest {

    @Autowired
    private SellerService sellerService;

    @Transactional
    @Test
    public void testAddSeller() throws Exception {
        Seller seller = new Seller(1,"133","erdd",13,"sssz","fssa","gdfsd","rssa","fdds");
        sellerService.addSeller(seller);
    }
}