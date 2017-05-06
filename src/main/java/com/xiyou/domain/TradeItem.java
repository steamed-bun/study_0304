package com.xiyou.domain;

public class TradeItem {

	private Integer itemId;
	private Integer quantity;
	private Book book;
	private Trade trade;
	private Integer status;
	private float price;

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
