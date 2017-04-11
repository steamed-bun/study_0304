package com.xiyou.service;

import java.util.List;

import com.xiyou.dao.impl.BookDAOImpl;
import com.xiyou.dao.impl.ShopDAOImpl;
import com.xiyou.domain.Book;
import com.xiyou.domain.Category;
import com.xiyou.domain.Shop;

public class BookService {

	private BookDAOImpl bookDAOImpl;
	private ShopDAOImpl shopDAOImpl;
	
	public void setBookDAOImpl(BookDAOImpl bookDAOImpl) {
		this.bookDAOImpl = bookDAOImpl;
	}
	
	public void setShopDAOImpl(ShopDAOImpl shopDAOImpl) {
		this.shopDAOImpl = shopDAOImpl;
	}

	public Book getBook(String bookId){
		return bookDAOImpl.getBook(bookId);
	}
	
	public Shop getShopByShopId(String shopId){
		return shopDAOImpl.getShopByShopId(shopId);
	}

	public void deleteBook(String bookId){
		bookDAOImpl.deleteBook(bookId);
	}

	public List<Book> getBooks(String shopId){
		return bookDAOImpl.getBooks(shopId);
	}

	public void addBook(Book book){
		bookDAOImpl.addBook(book);
	}
	
	public List<Category> selectCategory(){
		return bookDAOImpl.selectCategory();
	}
	
}
