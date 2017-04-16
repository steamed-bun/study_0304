package com.xiyou.service;

import java.util.List;

import com.xiyou.dao.BookDAO;
import com.xiyou.dao.ShopDAO;
import com.xiyou.dao.impl.BookDAOImpl;
import com.xiyou.dao.impl.ShopDAOImpl;
import com.xiyou.domain.Book;
import com.xiyou.domain.Category;
import com.xiyou.domain.Shop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("bookService")
public class BookService {

	@Autowired
	private BookDAO bookDAO;

	@Autowired
	private ShopDAO shopDAO;
	@Autowired
	private BookDAOImpl bookDAOImpl;

	public Shop getShopByShopId(String shopId){
		return shopDAO.getShopByShopId(shopId);
	}

	public void deleteBook(String bookId){
		bookDAO.deleteBook(bookId);
	}

	public List<Book> getBooks(String shopId){
		return bookDAO.getBooks(shopId);
	}

	public void addBook(Book book){
		bookDAO.addBook(book);
	}
	
	public List<Category> selectCategory(){
		return bookDAO.selectCategory();
	}

	public Book getBook(String bookId){
		return bookDAO.getBook(bookId);
	}

}
