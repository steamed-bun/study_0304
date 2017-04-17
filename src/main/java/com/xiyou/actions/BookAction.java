package com.xiyou.actions;

import java.util.List;
import java.util.Map;

//import com.coocaa.fire.utils.JsonUtils;
import org.apache.struts2.interceptor.RequestAware;
import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Preparable;
import com.xiyou.domain.Book;
import com.xiyou.domain.Category;
import com.xiyou.domain.Shop;
import com.xiyou.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller("bookAction")
public class BookAction extends ActionSupport implements ModelDriven<Book>, 
						SessionAware, Preparable, RequestAware{

	private static final long serialVersionUID = 1L;

	@Autowired
	private BookService bookService;

	private Book book;
	Map<String, Object> session;
	Map<String, Object> request;
	List<Book> books;
	private String bookId;
	private String status = "yes";

	public String deleteBook(){
		bookService.deleteBook(bookId);
		return "deleteBook";
	}
	
	public String getSelect(){
		List<Category> categories = bookService.selectCategory();
		request.put("categories", categories);
		return "getSelect";
	}
	
	public void prepareGetSelect(){
		if(bookId != null){
			bookService.getBook(bookId);
		}
	}
	
	public String  getBooks(){
		String shopId = session.get("shopId").toString();
		books = bookService.getBooks(shopId);
		System.out.println(books);
//		request.put("books", bookService.getBooks(shopId));
		return "getBooks";
	}


	public String addBook(){
		//Seller seller = bookService.selectShopBySelId(session.get("selId").toString());
		if (book.getBookId() == null){
			Shop shop = bookService.getShopByShopId(session.get("shopId").toString());
			book.setShop(shop);
			bookService.addBook(book);
			this.setBook(null);
		}else {
			bookService.addBook(book);
			this.setBook(null);
		}
		return "addBook";
	}
	
	public void prepareAddBook(){
		if(book.getBookId() == null){
			book = new Book(); 
		}else {
			book = bookService.getBook(book.getBookId().toString());
		}
	}

	@Override
	public Book getModel() {
		return book;
	}

	@Override
	public void setSession(Map<String, Object> session) {
		this.session = session;
	}


	@Override
	public void prepare() throws Exception {
	}

	@Override
	public void setRequest(Map<String, Object> request) {
		this.request = request;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public String getBookId() {
		return bookId;
	}

	public void setBookId(String bookId) {
		this.bookId = bookId;
	}

	public String getStatus() {
		return status;
	}

}
