package com.xiyou.actions;

import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Preparable;
import com.xiyou.domain.Seller;
import com.xiyou.domain.ShopCartItem;
import com.xiyou.domain.ShoppingCart;
import com.xiyou.service.BookService;
import com.xiyou.service.ShopCartService;
import com.xiyou.service.UserService;
import com.xiyou.util.BookStoreWebUtils;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.sql.Date;
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
    private ShoppingCart shoppingCart;
    private String cartItemId;

    Map<String, Object> session;
    private String bookId;

    //已测
    public String addShopItem(){

        //String userId = session.get("userId").toString();
        String userId = "1";
        shopCartItem.setCartItemId(1);
        shopCartItem.setQuantity(7);
        shopCartItem.setItemTime(new Date(new java.util.Date().getTime()));
        if(userId == null){
            //即用户未登录,应返回登录页面，或提示未登录
        }else{
            shopCartItem.setUser(userService.getUserById(userId));
        }
        if(bookId != null){
            shopCartItem.setBook(bookService.getBook(bookId));
        }else{
            //出错页面
        }
        //向虚拟购物车中添加
        shoppingCart = BookStoreWebUtils.getShoppingCart(session);
        shoppingCart.getShopCartItems().put(shopCartItem.getCartItemId(),shopCartItem);
        //向数据库中添加
        System.out.println(session.get("ShoppingCart"));
        shopCartService.addShopCartItem(shopCartItem);

        return "addShopItem";
    }

    public void prepareAddShopItem(){
        if(cartItemId.equals("")){
            shopCartItem = new ShopCartItem();
        }else {
            //seller = selService.selectSeller(cartItemId);
            //shopCartItem =
        }
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

    public String getCartItemId() {
        return cartItemId;
    }

    public void setCartItemId(String cartItemId) {
        this.cartItemId = cartItemId;
    }
}
