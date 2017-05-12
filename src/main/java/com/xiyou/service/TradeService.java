package com.xiyou.service;

import com.xiyou.dao.BookDAO;
import com.xiyou.dao.TradeDAO;
import com.xiyou.domain.Trade;
import com.xiyou.domain.TradeItem;
import com.xiyou.exception.DBException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TradeService {

    @Autowired
    private TradeDAO tradeDAO;

    @Autowired
    private BookDAO bookDAO;

    public Integer getStatusById(Integer itemId){
        return tradeDAO.getStatusById(itemId);
    }

    public void deleteTradeItem(Integer itemId){
        tradeDAO.deleteTradeItem(itemId);
    }

    public  void updateStatus(Integer itemId){
        tradeDAO.updateStatus(itemId);
    }

    public Integer getTradeNumByStatus(String shopId){
        return tradeDAO.getTradeNumByStatus(shopId);
    }

    public List<TradeItem> getTradeItemsByShopId(String shopId, String status){
        return tradeDAO.getTradeItemsByShopId(shopId, status);
    }

    public void updateQuantity(List<TradeItem> tradeItems, Map<String, Object> dataMap)  throws DBException{
        for (TradeItem tradeItem: tradeItems) {
            dataMap.put("bookId",tradeItem.getBook().getBookId());
            bookDAO.updateQuantity(tradeItem.getBook().getBookId(),tradeItem.getQuantity());
        }
    }

    public void addTrade(Trade trade){
        tradeDAO.addTrade(trade);
    }

    public void addTradeItems(List<TradeItem> tradeItems){
        tradeDAO.addTrades(tradeItems);
    }

}
