package com.xiyou.domain;

public class ShopCartItemTo {


    private Book book;
    private Integer quantity = 0;
    private Float itemMoney = 0.0F;

    public ShopCartItemTo(Book book, Integer quantity) {
        this.book = book;
        this.quantity = quantity;
        this.itemMoney = this.getItemMoney();
    }

    public ShopCartItemTo() {
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

    public Float getItemMoney() {
        return itemMoney;
    }

    public void setItemMoney() {
        this.itemMoney = book.getBookPrice() * quantity;
    }

    public void increment(Integer newQuantity){
        this.quantity = this.quantity +newQuantity;
    }

}
