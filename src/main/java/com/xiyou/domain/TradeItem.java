package com.xiyou.domain;

public class TradeItem {

	private Integer itemId;
	private int quantity;
	private Book bookId;
	private Trade tradeId;
	private boolean deal;

	public Integer getItemId() {
		return itemId;
	}

	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Book getBookId() {
		return bookId;
	}

	public void setBookId(Book bookId) {
		this.bookId = bookId;
	}

	public Trade getTradeId() {
		return tradeId;
	}

	public void setTradeId(Trade tradeId) {
		this.tradeId = tradeId;
	}

	public boolean isDeal() {
		return deal;
	}

	public void setDeal(boolean deal) {
		this.deal = deal;
	}

	public TradeItem(Integer itemId, int quantity, Book bookId, Trade tradeId,
			boolean deal) {
		super();
		this.itemId = itemId;
		this.quantity = quantity;
		this.bookId = bookId;
		this.tradeId = tradeId;
		this.deal = deal;
	}

	public TradeItem() {
		super();
	}

}
