package com.xiyou.dao.impl;

import com.xiyou.dao.TradeDAO;
import com.xiyou.domain.Trade;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:applicationContext-beans.xml","classpath:applicationContext.xml"})
public class TradeDAOImplTest {

    @Autowired
    private TradeDAO tradeDAO;

    @Transactional
    @Test
    public void testUpdateStatus(){
        tradeDAO.updateStatus(18,1);
    }

    @Transactional
    @Test
    public void testDeleteTradeItem(){
        tradeDAO.deleteTradeItem(1);
    }

    @Transactional
    @Test
    public void testGetTradeItems(){
        tradeDAO.getTradeItems("37",1);
    }

    @Transactional
    @Test
    public void testGetTradeItemsByShopId(){
        System.out.println(tradeDAO.getTradeItemsByShopId("25",3));
    }

    @Transactional
    @Test
    public void testGetTradeNumByStatus() throws Exception {
        System.out.println(tradeDAO.getTradeNumByStatus("25"));
    }

    @Test
    public void testAddTrade() throws Exception {

    }

    @Test
    public void testAddTrades() throws Exception {

    }
}