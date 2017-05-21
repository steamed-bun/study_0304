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

//    private static final String TRADE_KEY = "order";

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
    private Address address;

    /**
     * 删除一条item
     * url:trade-deleteItem.action?tradeItem.itemId=1
     * @return
     */
    public String deleteItem(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        tradeService.deleteItem(tradeItem.getItemId());
        return SUCCESS;
    }

    /**
     * trade-updateAddress?trade.tradeId=19&trade.address.addressId=1
     * @return
     */
    public String updateAddress(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        tradeService.updateAddress(trade.getTradeId(), trade.getAddress().getAddressId());
        tradeService.updateStatus(trade.getTradeId());
        return SUCCESS;
    }

    /**
     * trade-slapAddTrade.action?tradeItem.book.bookId=1&tradeItem.book.bookPrice=12.4&tradeItem.quantity=19
     *
     */
    public String slapAddTrade(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        trade = Trade.getTrade();
        Object userId = session.get("userId");
        if (userId == null){
            dataMap.put("status", "no");
            dataMap.put("message", "此用户登录超时，重新登录");
            return SUCCESS;
        }
        User user = userService.getUserById(userId.toString());
        try {
            tradeService.updateQuantity(tradeItem.getBook().getBookId(), tradeItem.getQuantity());
        }catch (DBException e){
            dataMap.put("status", "no");
            System.out.println();
            dataMap.put("message", "库存不足");
            return SUCCESS;
        }
        trade.setUser(user);
        trade.setQuantity(tradeItem.getQuantity());
        float price = tradeItem.getQuantity()*tradeItem.getBook().getBookPrice();
        trade.setTotalPrice(price);
        tradeService.addTrade(trade);
        tradeItem.setTrade(trade);
        tradeItem.setPrice(price);
        tradeItem.setStatus(-1);
        tradeService.addItem(tradeItem);
        this.setTradeItem(null);
        return SUCCESS;
    }

    /**
     * user获取当前状态所有订单
     * trade-getTradeItemsByUserId.action?tradeItem.status=?
     * {
     *     status=0:待发货（有取消订单的按钮）
     *     status=1:已发货（有确认收货的按钮）
     *     status=2:待评价 (有点赞或点down的按钮)
     *     status=3:已完成
     * }
     * @return
     */
    public  String getTradeItemsByUserId(){
        dataMap = BookStoreWebUtils.getDataMap(session);
//        String userId = session.get("userId").toString();
        Object object = session.get("userId");
        if (object == null){
            dataMap.put("status", "no");
            dataMap.put("meseage", "用户未登录");
            return SUCCESS;
        }
        String userId = object.toString();
        List<TradeItem> tradeItems1 = tradeService.getTradeItemsByUserId(userId, tradeItem.getStatus());
        dataMap.put("tradeItems", tradeItems1);
        this.setTradeItem(null);
        return SUCCESS;
    }

    public String updateNoLike(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        bookService.updateNoLike(tradeItem.getBook().getBookId());
        this.setTradeItem(null);
        return SUCCESS;
    }

    /**
     * 点赞
     * url : trade-updateLike.action?tradeItem。book.bookId=1&tradeItem.status=2&tradeItem.itemId=1
     * 这个2是死的 不变的
     * @return
     */
    public String updateLike(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        tradeService.updateStatus(tradeItem.getItemId(), tradeItem.getStatus());

        bookService.updateLike(tradeItem.getBook().getBookId());
        this.setTradeItem(null);
        return SUCCESS;
    }

    /**
     * 取消订单
     * trade-deleteTradeItem.action?tradeItem.itemId=1&tradeItem.book.bookId=18&tradeItem.quantity=12
     * @return dataMap
     */
    public String deleteTradeItem(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        Integer status = tradeService.getStatusById(tradeItem.getItemId());
        if (status.equals(0)){
            tradeService.deleteTradeItem(tradeItem.getItemId());
            bookService.revertQuantity(tradeItem.getBook().getBookId(), tradeItem.getQuantity());
        }else {
            dataMap.put("status", "no");
            dataMap.put("message", "此订单已发货，不能修改");
        }
        this.setTradeItem(null);
        return SUCCESS;
    }

    /**
     * 修改订单状态
     * url:trade-updateTradeStatus.action?tradeItem.itemId=1&tradeItem.status=?
     * {
     *      卖家确认发货status=0
     *      买家确认收货status=1
     * }
     * @return
     */
    public String updateTradeStatus(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        Integer itemId = tradeItem.getItemId();
        Integer status = tradeItem.getStatus();
        if (status.equals(0)){
            int count = tradeService.getTradeSize(itemId);
            if (count != 1){
                dataMap.put("status", "no");
                dataMap.put("message1", "如果是买家就提示:卖家刚才发货喽...");
                dataMap.put("message2", "如果是卖家家就提示:买家刚刚取消订单啦...");
                this.setTradeItem(null);
                return SUCCESS;
            }
        }
        if (status < tradeService.getStatusById(itemId)){
            dataMap.put("status", "no");
            dataMap.put("message", "此订单已修改，请勿重复操作");
            this.setTradeItem(null);
            return SUCCESS;
        }
        tradeService.updateStatus(itemId, tradeItem.getStatus());
        this.setTradeItem(null);
        return SUCCESS;
    }

    /**
     * seller必须是登录状态
     * seller获取TradeItems的接口
     * url:trade-getTradeItemBySelId.action?tradeItem.status=3
     * @return
     */
    public String getTradeItemBySelId(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        String shopId = session.get("shopId").toString();
        tradeItems = tradeService.getTradeItemsByShopId(shopId, tradeItem.getStatus());
        BookStoreWebUtils.setNullTradeItems(tradeItems);
        int i = 0;
        for (TradeItem tradeItem : tradeItems) {
            dataMap.put(i + "", tradeItem );
            i++;
        }
        dataMap.put("size", i);
        dataMap.put("tradeItems", tradeItems);
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
     * 已测
     * user 必须是登录状态
     * 添加订单
     * url:trade-addTrade.action
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
                    tradeItem.setStatus(-1);//重复设置为默认状态
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

    public TradeItem getTradeItem() {
        return tradeItem;
    }

    public void setTradeItem(TradeItem tradeItem) {
        this.tradeItem = tradeItem;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Trade getTrade() {
        return trade;
    }

    public void setTrade(Trade trade) {
        this.trade = trade;
    }
}
