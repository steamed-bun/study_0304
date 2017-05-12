package com.xiyou.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.xiyou.domain.*;
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
    private BookService bookService;

    @Autowired
    private UserService userService;

    private Map<String, Object> session;
    private Map<String, Object> dataMap;
    private List<TradeItem> tradeItems = new ArrayList<TradeItem>(5);
    private List<ShopCartItem> shopCartItems = new ArrayList<ShopCartItem>(5);
    private Trade trade;
    private TradeItem tradeItem;
    private String status; //

    /**
     * 取消订单
     * trade-deleteTradeItem.action?tradeItem.itemId=1&tradeItem.book.bookId=18&tradeItem.quantity=12
     * @return dataMap
     */
    public String deleteTradeItem(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        Integer status = tradeService.getStatusById(tradeItem.getItemId());
        //如果0是上一个状态
        if (status.equals(0)){
            tradeService.deleteTradeItem(tradeItem.getItemId());
            bookService.revertQuantity(tradeItem.getBook().getBookId(), tradeItem.getQuantity());
        }else {
            dataMap.put("status", "no");
            dataMap.put("message", "此订单已发货，不能修改");
        }
        return SUCCESS;
    }

    /**
     * 修改订单状态
     * url:trade-updateTradeStatus.action?tradeItem.itemId=1
     * @return
     */
    public String updateTradeStatus(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        tradeService.updateStatus(tradeItem.getItemId());
        return SUCCESS;
    }

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
     * @return status : {0：success 1:购物车为空}
     *
     *
     * {"result":"库存不足","status":"no","bookId":12}
     */
    public String addTrade(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        trade = Trade.getTrade();
        User user = userService.getUserById(session.get("userId").toString());
        if (user != null){
            ShoppingCart shoppingCart = BookStoreWebUtils.getShoppingCart(session);
            if (shoppingCart.isEmpty()){
                System.out.println("无交易");
                dataMap.put("status", "1");
                dataMap.put("message", "购物车为空");
            }else {
                trade.setUser(user);//获得购买用户
                trade.setTotalPrice(shoppingCart.getTotalMoney());//获得购物总价
                /*try {
                    tradeService.updateQuantity(tradeItems,dataMap);
                } catch (DBException e) {
                    dataMap.put("status","2");
                    dataMap.put("message","库存不足");
                    return SUCCESS;
                }*/
                /*for (TradeItem tradeItem : tradeItems) {
                    price = tradeItem.getBook().getBookPrice() * tradeItem.getQuantity();
                    tradeItem.setPrice(price);
                    totalPrice += price;
                }
                trade.setQuantity(tradeItems.size());
                trade.setTotalPrice(totalPrice);*/
                //获取购物车所有数据并转换为订单数组
                Map<Integer, ShopCartItemTo> shopCartItemToMap = shoppingCart.getShopCartItemTos();
                List<ShopCartItemTo> shopCartItemTos = new ArrayList<ShopCartItemTo>(shopCartItemToMap.values());
                trade.setQuantity(shopCartItemTos.size());
                tradeService.addTrade(trade);
                List<TradeItem> tradeItems = new ArrayList<TradeItem>(shopCartItemTos.size());
                TradeItem tradeItem ;
                for (ShopCartItemTo shopCartItemTo : shopCartItemTos) {
                    tradeItem = new TradeItem();
                    tradeItem.setPrice(shopCartItemTo.getItemMoney());//获取购物车一条数据的价格
                    tradeItem.setTrade(trade);//关联当前总交易
                    tradeItem.setQuantity(shopCartItemTo.getQuantity());//获取购物车一条数据购买数量
                    tradeItem.setBook(shopCartItemTo.getBook());
                    tradeItem.setStatus(0);//重复设置为默认状态
                    tradeItems.add(tradeItem);
                }
                tradeService.addTradeItems(tradeItems);
//                shopCartService.deleteShopItems(shopCartItems);
                shoppingCart.clear();//清空购物车
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

    public TradeItem getTradeItem() {
        return tradeItem;
    }

    public void setTradeItem(TradeItem tradeItem) {
        this.tradeItem = tradeItem;
    }
}
