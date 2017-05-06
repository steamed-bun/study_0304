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
    public List<TradeItem> getTradeItemsByShopId(String shopId, String status) {
        String hql = "FROM TradeItem t LEFT OUTER JOIN FETCH t.book "+
                "WHERE t.status = :status AND t.book IN " +
                "(SELECT new Book (b.bookId) FROM Book b WHERE b.shop = :shopId)";
        @SuppressWarnings("unchecked")
        List<TradeItem> tradeItems = (List<TradeItem>) getSession().createQuery(hql)
                .setString("status", status).setString("shopId", shopId).list();
        return tradeItems;
    }

    @Override
    public Integer getTradeNumByStatus(String shopId) {
        String hql = "SELECT COUNT (t.itemId) FROM TradeItem t " +
                "WHERE t.status < 2 AND t.book IN " +
                "(SELECT new Book (b.bookId) FROM Book b WHERE b.shop = :shopId)";
        Long tradeNum = (Long) getSession().createQuery(hql).setString("shopId", shopId).uniqueResult();
        return tradeNum.intValue();
    }

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
