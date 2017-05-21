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

    public void deleteItem(Integer itemId){
        tradeDAO.deleteItem(itemId);
    }

    public void updateStatus(Integer tradeId){
        tradeDAO.updateStatus(tradeId);
    }

    public void updateAddress(Integer tradeId, Integer addressId){
        tradeDAO.updateAddress(tradeId, addressId);
    }

    public void addItem(TradeItem tradeItem){
        tradeDAO.addItem(tradeItem);
    }

    public List<TradeItem> getTradeItemsByUserId(String userId, Integer status){
        return tradeDAO.getTradeItems(userId, status);
    }

    public int getTradeSize(Integer itemId){
        int count = (int) tradeDAO.getTradeSize(itemId);
        return count;
    }

    public Integer getStatusById(Integer itemId){
        return tradeDAO.getStatusById(itemId);
    }

    public void deleteTradeItem(Integer itemId){
        tradeDAO.deleteTradeItem(itemId);
    }

    public  void updateStatus(Integer itemId, Integer status){
        tradeDAO.updateStatus(itemId, status);
    }

    public Integer getTradeNumByStatus(String shopId){
        return tradeDAO.getTradeNumByStatus(shopId);
    }

    public List<TradeItem> getTradeItemsByShopId(String shopId, Integer status){
        return tradeDAO.getTradeItemsByShopId(shopId, status);
    }

    public void updateQuantity(Integer bookId, Integer quantity)  throws DBException{
        bookDAO.updateQuantity(bookId, quantity);
    }

    public void addTrade(Trade trade){
        tradeDAO.addTrade(trade);
    }

    public void addTradeItems(List<TradeItem> tradeItems){
        tradeDAO.addTrades(tradeItems);
    }

}
