package com.xiyou.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Preparable;
import com.xiyou.domain.*;
import com.xiyou.exception.DBException;
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

@Controller("shopCartToAction")
public class ShopCartToAction extends ActionSupport implements SessionAware, ModelDriven<ShopCartItemTo>,
        Preparable{

    @Autowired
    private BookService bookService;

    private ShopCartItemTo shopCartItemTo;
    private Map<String, Object> session;
    private Map<String, Object> dataMap;
    private ShoppingCart shoppingCart;

    /**
     * 更新数量
     * url: cartTo-updateItemQuantity.action?shopCartItemTo.quantity=23&shopCartItemTo.book.bookId=17
     * @return
     */
    public String updateItemQuantity(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        shoppingCart = BookStoreWebUtils.getShoppingCart(session);
        Integer bookId = shopCartItemTo.getBook().getBookId();
        Integer newQuantity = shopCartItemTo.getQuantity();
        Integer oldQuantity = shoppingCart.getItemQuantity(bookId);
        Integer stock = newQuantity - oldQuantity;
        try {
            bookService.updateQuantity(bookId, stock);
        }catch (DBException e){
            dataMap.put("status", "no");
            dataMap.put("message", "库存不足");
            return SUCCESS;
        }
        shoppingCart.updateItemQuantity(bookId, newQuantity);
        return SUCCESS;
    }

    /**
     * 已测
     * 购物车添加 一条数据
     * cartTo-addShopCartItem.action?shopCartItemTo.book.*=book&shopCartItemTo.quantity=12
     * book.* =
     * {
     *    book.bookId=18
     *    book.bookName=新书3
     *    book.author=我们怎么
     *    book.bookPrice=0.5
     *    book.bookImages.imageURL=imageURL
     * }
     * cartTo-addShopCartItem.action?shopCartItemTo.book.bookImages.imageURL=url2&shopCartItemTo.book.bookPrice=0.5&shopCartItemTo.book.bookId=18&shopCartItemTo.book.bookName=新书3&shopCartItemTo.book.author=我们怎么&shopCartItemTo.quantity=12
     * @return status
     */
    public String addShopCartItem(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        try {
            bookService.updateQuantity(shopCartItemTo.getBook().getBookId(), shopCartItemTo.getQuantity());
        }catch (DBException e){
            dataMap.put("status", "no");
            dataMap.put("message", "库存不足");
            return SUCCESS;
        }
        shoppingCart = BookStoreWebUtils.getShoppingCart(session);
        shoppingCart.addShopCartItemTo(shopCartItemTo);
        dataMap.put("totalNum", shoppingCart.getBookNumber());
        this.setShopCartItemTo(null);
        return SUCCESS;
    }

    /**
     * 已测
     * 获取购物车所有数据
     * cartTo-getShopCart.action
     * @return
     */
    public String getShopCart(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        shoppingCart = BookStoreWebUtils.getShoppingCart(session);
        dataMap.put("shopCart", shoppingCart.getItems());
        dataMap.put("totalMoney", shoppingCart.getTotalMoney());
        return SUCCESS;
    }

    /**
     * 已测
     * 删除一条Item
     * url: cartTo-deleteItem.action?shopCartItemTo.book.bookId=17&shopCartItemTo.quantity=12
     * @return no data
     */
    public String deleteItem(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        Integer bookId = shopCartItemTo.getBook().getBookId();
        bookService.revertQuantity(bookId, shopCartItemTo.getQuantity());
        shoppingCart = BookStoreWebUtils.getShoppingCart(session);
        shoppingCart.removeItem(bookId);
        return SUCCESS;
    }

    /**
     * 已测
     * 清空购物车
     * url: cartTo-clearShopCart.action
     * @return
     */
    public String clearShopCart(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        shoppingCart = BookStoreWebUtils.getShoppingCart(session);
        shoppingCart.clear();
        return SUCCESS;
    }

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }

    @Override
    public ShopCartItemTo getModel() {
        return shopCartItemTo;
    }

    @Override
    public void prepare() throws Exception {
    }

    public Map<String, Object> getDataMap() {
        return dataMap;
    }

    public ShopCartItemTo getShopCartItemTo() {
        return shopCartItemTo;
    }

    public void setShopCartItemTo(ShopCartItemTo shopCartItemTo) {
        this.shopCartItemTo = shopCartItemTo;
    }
}
