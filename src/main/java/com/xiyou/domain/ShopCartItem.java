package com.xiyou.domain;

import javax.persistence.Entity;
import java.sql.Date;

//@Entity(name = "shopCartItem")
public class ShopCartItem {

    private Integer cartItemId;
    private User user;
    private Date itemTime;
    private Book book;
    private Integer quantity;

    @Override
    public String toString() {
        return "ShopCartItem{" +
                "cartItemId=" + cartItemId +
                ", user=" + user +
                ", itemTime=" + itemTime +
                ", book=" + book +
                ", quantity=" + quantity +
                '}';
    }

    public Integer getCartItemId() {
        return cartItemId;
    }

    public void setCartItemId(Integer cartItemId) {
        this.cartItemId = cartItemId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getItemTime() {
        return itemTime;
    }

    public void setItemTime(Date itemTime) {
        this.itemTime = itemTime;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public ShopCartItem(Integer cartItemId, User user, Date itemTime, Book book, Integer quantity) {
        this.cartItemId = cartItemId;
        this.user = user;
        this.itemTime = itemTime;
        this.book = book;
        this.quantity = quantity;
    }

    public ShopCartItem() {
    }
}
