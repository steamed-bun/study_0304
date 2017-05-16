package com.xiyou.dao;

import com.xiyou.domain.Trade;
import com.xiyou.domain.TradeItem;

import java.util.List;

public interface TradeDAO {

    /**
     * 判断当前订单是否存在
     * @param itemId
     * @return
     */
    long getTradeSize(Integer itemId);

    /**
     * 获取当前订单的状态
     * @param itemId
     * @return
     */
    Integer getStatusById(Integer itemId);

    /**
     * 取消订单
     * @param itemId itemId
     */
    void deleteTradeItem(Integer itemId);

    /**
     * 已测
     * 获取当前user的某种状态的全部订单
     * @param userId userId
     * @param status status
     * @return
     */
    List<TradeItem> getTradeItems(String userId,Integer status);

    /**
     * 修改订单状态
     * @param itemId itemId
     */
    void updateStatus(Integer itemId, Integer status);

    /**
     * 已测
     * seller 查询其商铺的各类订单
     * @param shopId shopId
     * @param status 分类：已完成、未完成...
     * @return
     */
    List<TradeItem> getTradeItemsByShopId(String shopId, Integer status);

    /**
     * 已测
     * 获取当前seller或者当前shop的未完成订单数量
     * @param shopId shopId
     * @return 未完成订单数量
     */
    Integer getTradeNumByStatus(String shopId);

    /**
     * 已测
     * 添加一条trade
     * @param trade trade
     */
    void addTrade(Trade trade);

    /**
     * 添加TradeItems
     * @param tradeItems tradeItems
     */
    void addTrades(List<TradeItem> tradeItems);
}
