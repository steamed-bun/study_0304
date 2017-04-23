package com.xiyou.dao.impl;

import com.xiyou.dao.SellectDAO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:applicationContext-beans.xml","classpath:applicationContext.xml"})
public class SellectDAOImplTest {

    @Autowired
    private SellectDAO sellectDAO;

    @Transactional
    @Test
    public void testSelectCity() throws Exception {
        System.out.println(sellectDAO.selectCity("1"));
    }

    @Transactional
    @Test
    public void testSelectCounty() throws Exception {
        System.out.println(sellectDAO.selectCounty("1"));
    }
}