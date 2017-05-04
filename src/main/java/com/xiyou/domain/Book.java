package com.xiyou.domain;

import java.util.HashSet;
import java.util.Set;

public class Book {

	private Integer bookId;
	private String bookName;
	private Set<BookImages> bookImages = new HashSet<BookImages>();
	private String author;
	private Category category;
	private float bookPrice;
	private int quantity;
	private int likes;
	private int noLike;
	private String publicationDate;// 出版日期
	private String publisher;// 出版社
	private String summary;// 简介
	private Shop shop;

	public Book(Integer bookId, String bookName, Integer quantity) {
		this.bookId = bookId;
		this.bookName = bookName;
		this.quantity = quantity;
	}

	public Book(Integer bookId) {
		this.bookId = bookId;
	}

	public Book(Integer bookId, String bookName, float bookPrice, int quantity, int likes) {
		this.bookId = bookId;
		this.bookName = bookName;
		this.bookPrice = bookPrice;
		this.quantity = quantity;
		this.likes = likes;
	}

	public Book(Integer bookId, String bookName, String author, float bookPrice, int quantity, int likes, int noLike, String publicationDate, String publisher, String summary) {
		this.bookId = bookId;
		this.bookName = bookName;
		this.author = author;
		this.bookPrice = bookPrice;
		this.quantity = quantity;
		this.likes = likes;
		this.noLike = noLike;
		this.publicationDate = publicationDate;
		this.publisher = publisher;
		this.summary = summary;
	}

	public Book(Integer bookId, String bookName, Set<BookImages> bookImages, String author, Category category, float bookPrice, int quantity, int likes, int noLike, String publicationDate, String publisher, String summary, Shop shop) {
		this.bookId = bookId;
		this.bookName = bookName;
		this.bookImages = bookImages;
		this.author = author;
		this.category = category;
		this.bookPrice = bookPrice;
		this.quantity = quantity;
		this.likes = likes;
		this.noLike = noLike;
		this.publicationDate = publicationDate;
		this.publisher = publisher;
		this.summary = summary;
		this.shop = shop;
	}

	public Integer getBookId() {
		return bookId;
	}

	public void setBookId(Integer bookId) {
		this.bookId = bookId;
	}

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public float getBookPrice() {
		return bookPrice;
	}

	public void setBookPrice(float bookPrice) {
		this.bookPrice = bookPrice;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public int getLikes() {
		return likes;
	}

	public void setLikes(int likes) {
		this.likes = likes;
	}

	public int getNoLike() {
		return noLike;
	}

	public void setNoLike(int noLike) {
		this.noLike = noLike;
	}

	public String getPublicationDate() {
		return publicationDate;
	}

	public void setPublicationDate(String publicationDate) {
		this.publicationDate = publicationDate;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public Shop getShop() {
		return shop;
	}

	public void setShop(Shop shop) {
		this.shop = shop;
	}

	public Book() {
		super();
	}

	public Set getBookImages() {
		return bookImages;
	}

	public void setBookImages(Set bookImages) {
		this.bookImages = bookImages;
	}


/*	@Override
	public String toString() {
		return "Book [bookId=" + bookId + ", bookName=" + bookName
				+ ", author=" + author + ", category=" + category
				+ ", bookImages=" + bookImages + ", bookPrice=" + bookPrice
				+ ", quantity=" + quantity + ", likes=" + likes + ", noLike="
				+ noLike + ", publicationDate=" + publicationDate
				+ ", publisher=" + publisher + ", summary=" + summary
				+ ", shop=" + shop + "]";
	}*/

}
