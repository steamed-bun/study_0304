package com.xiyou.dao;

import com.xiyou.domain.Trade;
import com.xiyou.domain.TradeItem;

import java.util.List;

public interface TradeDAO {

    /**
     * 添加一条trade
     * @param trade
     */
    void addTrade(Trade trade);

    void addTrades(List<TradeItem> tradeItems);
}
