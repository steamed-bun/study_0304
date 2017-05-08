package com.xiyou.service;

import java.util.List;

import com.xiyou.dao.BookDAO;
import com.xiyou.dao.ShopDAO;
import com.xiyou.dao.impl.BookDAOImpl;
import com.xiyou.dao.impl.ShopDAOImpl;
import com.xiyou.domain.Book;
import com.xiyou.domain.BookImages;
import com.xiyou.domain.Category;
import com.xiyou.domain.Shop;
import com.xiyou.exception.DBException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("bookService")
public class BookService {

	@Autowired
	private BookDAO bookDAO;

	@Autowired
	private ShopDAO shopDAO;

	public int getTotalPageNo(){
		long tatalPageNo = bookDAO.getTotalPageNo();
		return (int) tatalPageNo;
	}

	public void updataGoodBook(Integer bookId, Integer goodBook){
		bookDAO.updataGoodBook(bookId, goodBook);
	}

	public int getTotalPageNo(String categoryId, String shopId){
		long tatalPageNo = bookDAO.getTotalPageNo(categoryId, shopId);
		return (int) tatalPageNo;
	}

	public int getTotalPageNo(String categoryId){
		long tatalPageNo = bookDAO.getTotalPageNo(categoryId);
		return (int) tatalPageNo;
	}

	public List<Book> getTopBooks(String categoryId){
		return bookDAO.getTopBooks(categoryId);
	}

	public Category getCategoryById(Integer categoryId){
		return bookDAO.getCategoryById(categoryId);
	}

	public Book getBookById(Book book){
		book = bookDAO.getBookById(book);
		return book;
	}

	public void updateClickNum(Book book){
		bookDAO.updateClickNum(book);
	}

	public void updateBookImage(List<BookImages> bookImages){
		bookDAO.updateBookImage(bookImages);
	}

	public void deleteBookImage(List<BookImages> bookImages){
		bookDAO.deleteBookImage(bookImages);
	}

	public Integer getQuantity(Book book){
		return bookDAO.getQuantity(book);
	}

	public void addImages(Book book, List<BookImages> bookImages){
		for (BookImages bookImage: bookImages ) {
			bookImage.setBook(book);
		}
		bookDAO.batchImages(bookImages);
	}

	public List<Book> getBooksByCategory(String categoryId, Integer pageNum){
		return bookDAO.getBooksByCategory(categoryId, pageNum);
	}

	public Shop getShopByShopId(String shopId){
		return shopDAO.selectShop(shopId);
	}

	public void deleteBook(Integer bookId){
		bookDAO.deleteBook(bookId);
	}

	public List<Book> getBooks(Integer pageNum){
		List<Book> books = bookDAO.getBooks(pageNum);
		return books;
	}

	public void addBook(Book book){
		bookDAO.addBook(book);
	}

	public Book getBook(String bookId){
		return bookDAO.getBook(bookId);
	}

	public List<Book> getBooksByCategoryTo(String categoryId, String shopId, Integer pageNum){
		return bookDAO.getBooksByCategoryTo(categoryId, shopId, pageNum);
	}

}
