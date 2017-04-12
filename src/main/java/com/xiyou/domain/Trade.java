package com.xiyou.domain;

import java.sql.Date;

public class Trade {

	private Integer tradeId;
	private Date tradeTime;
	private User user;
	private Integer status;
    private Book book;
    private int quantity;
    private float totalPrice;

	public Integer getTradeId() {
		return tradeId;
	}
	public void setTradeId(Integer tradeId) {
		this.tradeId = tradeId;
	}
	public Date getTradeTime() {
		return tradeTime;
	}
	public void setTradeTime(Date tradeTime) {
		this.tradeTime = tradeTime;
	}

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Trade(Integer tradeId, Date tradeTime, User user, Integer status, Book book, int quantity, float totalPrice) {
        this.tradeId = tradeId;
        this.tradeTime = tradeTime;
        this.user = user;
        this.status = status;
        this.book = book;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }

    public Trade() {
		super();
	}
	
}
