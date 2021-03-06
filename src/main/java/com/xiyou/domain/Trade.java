package com.xiyou.domain;

import java.sql.Date;

public class Trade {

	private Integer tradeId;
	private Date tradeTime;
	private User user;
	private Integer status;
    private int quantity;
    private float totalPrice;//购物车所有书本的总价\
    private Address address;

    public Trade(Integer tradeId) {
        this.tradeId = tradeId;
    }

    public Trade(Integer tradeId, Date tradeTime, float totalPrice) {
        this.tradeId = tradeId;
        this.tradeTime = tradeTime;
        this.totalPrice = totalPrice;
    }

    public static Trade getTrade(){
        Trade trade = new Trade();
        trade.setTradeTime(new Date(new java.util.Date().getTime()));
        trade.setStatus(0);
        return trade;
    }

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

    public Trade(Integer tradeId, Date tradeTime, User user, Integer status, int quantity, float totalPrice, Address address) {
        this.tradeId = tradeId;
        this.tradeTime = tradeTime;
        this.user = user;
        this.status = status;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.address = address;
    }

    public Trade() {
		super();
	}

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
}
