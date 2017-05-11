package com.xiyou.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.xiyou.domain.ShopCartItem;
import com.xiyou.domain.User;
import com.xiyou.domain.Trade;
import com.xiyou.domain.TradeItem;
import com.xiyou.exception.DBException;
import com.xiyou.service.BookService;
import com.xiyou.service.ShopCartService;
import com.xiyou.service.TradeService;
import com.xiyou.service.UserService;
import com.xiyou.util.BookStoreWebUtils;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller("tradeAction")
public class TradeAction extends ActionSupport implements SessionAware{

    @Autowired
    private TradeService tradeService;

    @Autowired
    private ShopCartService shopCartService;

    @Autowired
    private UserService userService;

    private Map<String, Object> session;
    private Map<String, Object> dataMap;
    private List<TradeItem> tradeItems = new ArrayList<TradeItem>(5);
    private List<ShopCartItem> shopCartItems = new ArrayList<ShopCartItem>(5);
    private Trade trade;
    private String status; //

    /**
     * seller必须是登录状态
     * seller获取TradeItems的接口
     * url:trade-getTradeItemBySelId.action?status=3
     * @return
     */
    public String getTradeItemBySelId(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        String shopId = session.get("shopId").toString();
        List<TradeItem> tradeItems = tradeService.getTradeItemsByShopId(shopId, status);
        BookStoreWebUtils.setNullTradeItems(tradeItems);
        int i = 0;
        for (TradeItem tradeItem : tradeItems) {
            dataMap.put(i + "", tradeItem );
            i++;
        }
        dataMap.put("size", i);
        tradeItems.clear();
        return SUCCESS;
    }

    /**
     * seller必须是登录状态
     * 获取当前seller是否有未完成订单
     * url:trade-getTradeNumByStatus.action
     * @return {yes:有  no:没有}
     */
    public String getTradeNumByStatus(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        String shopId = session.get("shopId").toString();
        Integer tradeNum = tradeService.getTradeNumByStatus(shopId);
        if (tradeNum > 0){
            dataMap.put("status", "no");
        }
        return SUCCESS;
    }

    /**
     * user 必须是登录状态
     * 添加订单
     * url:trade-addTrade.action?shopCartItems[0].cartItemId=1&tradeItems[0].book.bookPrice=4.5&tradeItems[0].quantity=2&tradeItems[0].book.bookId=13&tradeItems[1].book.bookPrice=5&tradeItems[1].quantity=3&tradeItems[1].book.bookId=12
     *
     * @return {"result":"库存不足","status":"no","bookId":12}
     */
    public String addTrade(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        trade = Trade.getTrade();
        User user = userService.getUserById(session.get("userId").toString());
        if (user != null){
            if (tradeItems == null || tradeItems.size() <= 0 ){
                System.out.println("无交易");
            }else {
                float totalPrice = 0;
                float price;
                trade.setUser(user);
                try {
                    tradeService.updateQuantity(tradeItems,dataMap);
                } catch (DBException e) {
                    dataMap.put("status","no");
                    dataMap.put("result","库存不足");
                    return "stock";
                }
                for (TradeItem tradeItem : tradeItems) {
                    price = tradeItem.getBook().getBookPrice() * tradeItem.getQuantity();
                    tradeItem.setPrice(price);
                    totalPrice += price;
                }
                trade.setQuantity(tradeItems.size());
                trade.setTotalPrice(totalPrice);
                tradeService.addTrade(trade);
                for (TradeItem tradeItem : tradeItems) {
                    tradeItem.setTrade(trade);
                }
                tradeService.addTradeItems(tradeItems);
                shopCartService.deleteShopItems(shopCartItems);
            }
        }else {
            System.out.println("无此用户！or用户未登录");
        }
        return "addTrade";
    }

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }

    public List<TradeItem> getTradeItems() {
        return tradeItems;
    }

    public void setTradeItems(List<TradeItem> tradeItems) {
        this.tradeItems = tradeItems;
    }

    public List<ShopCartItem> getShopCartItems() {
        return shopCartItems;
    }

    public void setShopCartItems(List<ShopCartItem> shopCartItems) {
        this.shopCartItems = shopCartItems;
    }

    public Map<String, Object> getDataMap() {
        return dataMap;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
