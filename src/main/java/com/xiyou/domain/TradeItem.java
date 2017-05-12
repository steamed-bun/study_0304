package com.xiyou.domain;

//import java.sql.Date;
import java.util.Date;
import java.util.Set;


public class TradeItem {

	private Integer itemId;
	private Integer quantity;
	private Book book;
	private Trade trade;
	private Integer status = 0;//订单完成情况 默认为0
	private float price;

	public TradeItem(float price, Integer status, Date tradeTime, Integer bookId, String bookName, Integer quantity, Integer itemId) {
		this.price = price;
		this.status = status;
		this.trade = new Trade(new java.sql.Date(tradeTime.getTime()));
		this.book = new Book(bookId,bookName);
		this.quantity = quantity;
		this.itemId = itemId;
	}

	public TradeItem(Integer itemId, Integer quantity, Book book, Trade trade, Integer status, float price) {
		this.itemId = itemId;
		this.quantity = quantity;
		this.book = book;
		this.trade = trade;
		this.status = status;
		this.price = price;
	}

	public TradeItem() {
		super();
	}

	@Override
	public String toString() {
		return "TradeItem{" +
				"itemId=" + itemId +
				", quantity=" + quantity +
				", book=" + book +
				", trade=" + trade +
				", status=" + status +
				", price=" + price +
				'}';
	}

	public Integer getItemId() {
		return itemId;
	}

	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public Trade getTrade() {
		return trade;
	}

	public void setTrade(Trade trade) {
		this.trade = trade;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}
}
