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
    public long getTradeSize(Integer itemId) {
        String hql = "SELECT count (t.itemId) FROM TradeItem t " +
                "WHERE t.itemId = :itemId";
        return (Long) getSession().createQuery(hql)
                .setInteger("itemId", itemId).uniqueResult();
    }

    @Override
    public Integer getStatusById(Integer itemId) {
        String hql = "SELECT t.status FROM TradeItem t WHERE t.itemId = :itemId";
        Integer status = (Integer) getSession().createQuery(hql).setInteger("itemId", itemId).uniqueResult();
        return status;
    }

    @Override
    public void deleteTradeItem(Integer itemId) {
        String hql  = "DELETE TradeItem t WHERE t.itemId = :itemId";
        getSession().createQuery(hql).setInteger("itemId", itemId).executeUpdate();
    }

    @Override
    public List<TradeItem> getTradeItems(String userId, Integer status) {
        String hql = "SELECT new TradeItem " +
                "( " +
                "i.price, i.status, i.trade.tradeTime, i.trade.tradeId, i.trade.totalPrice, i.book.bookId, i.book.bookName, i.book.bookPrice, " +
                "i.quantity, i.itemId " +
                ") " +
                "FROM TradeItem i " +
                "WHERE i.trade IN " +
                "(SELECT new Trade (t.tradeId) FROM Trade t WHERE t.user = :userId) " +
                "AND i.status = :status";
        @SuppressWarnings("unchecked")
        List<TradeItem> tradeItems = (List<TradeItem>) getSession().createQuery(hql)
                .setString("userId", userId)
                .setInteger("status", status)
                .list();
        return tradeItems;
    }

    @Override
    public void updateStatus(Integer itemId, Integer status) {
        String hql = "UPDATE TradeItem t SET t.status = (t.status + 1) " +
                "WHERE t.itemId = :itemId AND t.status = :status";
        getSession().createQuery(hql)
                .setInteger("itemId", itemId)
                .setInteger("status",status)
                .executeUpdate();
    }

    @Override
    public List<TradeItem> getTradeItemsByShopId(String shopId, Integer status) {
        String hql;
           if (!status.equals(2)){
               hql = "SELECT new TradeItem " +
                       "( " +
                       "i.price, i.status, i.trade.tradeTime, i.trade.tradeId, i.trade.totalPrice, i.book.bookId, i.book.bookName, i.book.bookPrice, " +
                       "i.quantity, i.itemId " +
                       ") " +
                       "FROM TradeItem i " +
                       "WHERE i.status = :status AND i.book IN " +
                       "(SELECT new Book (b.bookId) FROM Book b WHERE b.shop = :shopId)";
           }else {
               hql = "SELECT new TradeItem " +
                       "( " +
                       "i.price, i.status, i.trade.tradeTime, i.trade.tradeId, i.trade.totalPrice, i.book.bookId, i.book.bookName, i.book.bookPrice," +
                       "i.quantity, i.itemId " +
                       ") " +
                       "FROM TradeItem i " +
                       "WHERE i.status >= :status AND i.book IN " +
                       "(SELECT new Book (b.bookId) FROM Book b WHERE b.shop = :shopId)";
           }
        @SuppressWarnings("unchecked")
        List<TradeItem> tradeItems = (List<TradeItem>) getSession().createQuery(hql)
                .setInteger("status", status).setString("shopId", shopId).list();
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
