package com.xiyou.actions;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.xiyou.domain.BookImages;
import com.xiyou.util.BookStoreWebUtils;
import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Preparable;
import com.xiyou.domain.Book;
import com.xiyou.domain.Shop;
import com.xiyou.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller("bookAction")
public class BookAction extends ActionSupport implements ModelDriven<Book>, 
						SessionAware, Preparable {

	private static final long serialVersionUID = 1L;

	@Autowired
	private BookService bookService;

	private Map<String, Object> dataMap;
	private Map<String, Object> session;
	private Book book;
	private List<BookImages> bookImages;

	/**
	 * 添加book的图片
	 * url：book-addImages.action
	 * 需传入：book.bookId
	 * e.g. book-addImages.action?book.bookId=24&bookImages.imageURL=url1&bookImages.imageURL=url2
	 * @return
     */
	public String addImages(){
		System.out.println("addImages");
		if (bookImages != null && bookImages.size() > 0){
			bookService.addImages(book.getBookId().toString(),bookImages);
		}
		dataMap = BookStoreWebUtils.getDataMap(session);
		book = null;
		return "addImages";
	}

	public void prepareAddImages(){
		bookImages = new ArrayList<BookImages>(5);
	}

	public String deleteBook(){
		bookService.deleteBook(book.getBookId().toString());
		return "deleteBook";
	}

	/**
	 * url:book-getBooksByCategory.action?book.category.categoryId=2
	 * @return
     */
	public String getBooksByCategory(){
		dataMap = BookStoreWebUtils.getDataMap(session);
		String id = book.getCategory().getCategoryId().toString();
		List<Book> list = bookService.getBooksByCategory(id);
		dataMap.put("books",list);
		book = null;
		return "getBooksByCategory";
	}

/*	public String getSelect(){
		List<Category> categories = bookService.selectCategory();
		request.put("categories", categories);
		return "getSelect";
	}
	
	public void prepareGetSelect(){
		if(bookId != null){
			bookService.getBook(bookId);
		}
	}
*/
	/**
	 * 获取当前登录shop的所有书籍
	 * url：book-getBooks.action
	 * @return
     */
	public String getBooks(){
		dataMap = BookStoreWebUtils.getDataMap(session);
		String shopId = session.get("shopId").toString();
		dataMap.put("books",bookService.getBooks(shopId));
		return "getBooks";
	}

	public String addBook(){
		//Seller seller = bookService.selectShopBySelId(session.get("selId").toString());
		dataMap = BookStoreWebUtils.getDataMap(session);
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

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public List<BookImages> getBookImages() {
		return bookImages;
	}

	public void setBookImages(List<BookImages> bookImages) {
		this.bookImages = bookImages;
	}
//	public String getStatus() {
//		return status;
//	}

	public Map<String, Object> getDataMap() {
		return dataMap;
	}

}
