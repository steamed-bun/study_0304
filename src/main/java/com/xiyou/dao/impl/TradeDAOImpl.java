package com.xiyou.dao.impl;

import com.xiyou.dao.TradeDAO;
import com.xiyou.domain.Trade;
import com.xiyou.domain.TradeItem;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TradeDAOImpl extends BaseDAOImpl implements TradeDAO {


    @Override
    public void addTrade(Trade trade) {
        getSession().saveOrUpdate(trade);
    }

    @Override
    public void addTrades(List<TradeItem> tradeItems) {
        Session session = getSession();
        for (TradeItem tradeItem : tradeItems) {
            session.save(tradeItem);
        }
    }
}
