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

    public void updateQuantity(List<TradeItem> tradeItems, Map<String, Object> dataMap)  throws DBException{
        for (TradeItem tradeItem: tradeItems) {
            dataMap.put("bookId",tradeItem.getBook().getBookId());
            bookDAO.updateQuantity(tradeItem.getBook().getBookId().toString(),tradeItem.getQuantity());
        }
    }

    public void addTrade(Trade trade){
        tradeDAO.addTrade(trade);
    }

    public void addTradeItems(List<TradeItem> tradeItems){
        tradeDAO.addTrades(tradeItems);
    }

}
