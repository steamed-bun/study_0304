package com.xiyou.actions;

import com.opensymphony.xwork2.ModelDriven;
import com.xiyou.domain.ShopCartItem;
import com.xiyou.service.BookService;
import com.xiyou.service.ShopCartService;
import com.xiyou.service.UserService;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.sql.Date;
import java.util.Map;

@Controller("shopCartAction")
public class ShopCartAction implements SessionAware, ModelDriven<ShopCartItem>{

    @Autowired
    private BookService bookService;

    @Autowired
    private UserService userService;

    @Autowired
    private ShopCartService shopCartService;

    private ShopCartItem shopCartItem;


    Map<String, Object> session;
    private String bookId;

    //已测
    public String addShopItem(){

        String userId = session.get("userId").toString();
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

        shopCartService.addShopCartItem(shopCartItem);

        return "addShopItem";
    }

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    @Override
    public ShopCartItem getModel() {
        shopCartItem = new ShopCartItem();
        return shopCartItem;
    }
}
