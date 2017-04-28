package com.xiyou.actions;

import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Preparable;
import com.xiyou.domain.Book;
import com.xiyou.domain.User;
import com.xiyou.domain.ShopCartItem;
import com.xiyou.service.BookService;
import com.xiyou.service.ShopCartService;
import com.xiyou.service.UserService;
import com.xiyou.util.BookStoreWebUtils;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.sql.Date;
import java.util.List;
import java.util.Map;

@Controller("shopCartAction")
public class ShopCartAction implements SessionAware, ModelDriven<ShopCartItem>,
        Preparable{

    @Autowired
    private BookService bookService;

    @Autowired
    private UserService userService;

    @Autowired
    private ShopCartService shopCartService;

    private ShopCartItem shopCartItem;
    private String userId;
    private Map<String, Object> session;
    private Map<String, Object> dataMap;
    private String bookId;
//    private ShoppingCart shoppingCart;

    /**
     * 已测
     * 1、添加
     * url:cart-addShopItem.action?bookId=4&shopCartItem.quantity=3
     * 测试时user必须是登录状态
     * @return
     */
    public String addShopItem(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        userId = session.get("userId").toString();
        shopCartItem.setItemTime(new Date(new java.util.Date().getTime()));
        User user = userService.getUserById(userId);
        shopCartItem.setUser(user);
        if (bookId != null){
            Book book = bookService.getBook(bookId);
            if (book != null){
                shopCartItem.setBook(book);
            }else {
                dataMap.put("status","no");
                System.out.println("查无此书！");
            }
        }else{
            dataMap.put("status","no");
            System.out.println("未传入bookId！");
        }
        shopCartService.addShopCartItem(shopCartItem);
        shopCartItem = null;
        /*
        向虚拟购物车中添加
        1、获得虚拟购物车
        shoppingCart = BookStoreWebUtils.getShoppingCart(session);
        2、加入购物车
        shopCartItem = shopCartService.getShopCartItemById(cartItemId);
        shoppingCart.getShopCartItems().put(shopCartItem.getCartItemId(),shopCartItem);
        */
        return "addShopItem";
    }

    public void prepareAddShopItem(){
        if(shopCartItem.getCartItemId() == null){
            shopCartItem = new ShopCartItem();
        }else {
            shopCartItem = shopCartService
                    .getShopCartItemById(shopCartItem.getCartItemId().toString());
        }
    }

    /**
     * 已测
     * 获取当前user的购物车信息
     * url:cart-getAllCartItem.action
     * 必须在user登录状态
     * @return 返回至data中,需先查看 status {购物车有值：yes , 无值 ：no}
     * 有值再查看信息 name是shopCartItems
     */
    public String getAllCartItem(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        String userId = session.get("userId").toString();
        List<ShopCartItem> shopCartItems = shopCartService.getShopItemByUserId(userId);
        if(shopCartItems == null | shopCartItems.size() <= 0){
            dataMap.put("status","no");
        }else {
            dataMap.put("shopCartItems", shopCartItems);
        }
        return "getAllCartItem";
    }

    /**
     * 已测
     * 更新quantity
     * url:cart-updateCartItem.action?shopCartItem.quantity=5&shopCartItem.cartItemId=1
     * @return
     */
    public String updateCartItem(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        String quatity = shopCartItem.getQuantity().toString();
        String cartItemId = shopCartItem.getCartItemId().toString();
        shopCartService.updateQuantity(quatity, cartItemId);
        return "updateCartItem";
    }

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }

    @Override
    public ShopCartItem getModel() {
        return shopCartItem;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    @Override
    public void prepare() throws Exception {
    }

    public Map<String, Object> getDataMap() {
        return dataMap;
    }

    public ShopCartItem getShopCartItem() {
        return shopCartItem;
    }

    public void setShopCartItem(ShopCartItem shopCartItem) {
        this.shopCartItem = shopCartItem;
    }

}
