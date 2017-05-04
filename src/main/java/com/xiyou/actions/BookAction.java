package com.xiyou.actions;

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


	public String deleteBook(){
		bookService.deleteBook(book.getBookId().toString());
		return "deleteBook";
	}

	/**
	 * 已测
	 * 验证库存
	 * url:book-validateBookQuantity.action?book.bookId=13&book.quantity=20
	 * 库存不足返回{status:no}
	 * @retur
     */
	public String validateBookQuantity(){
		dataMap = BookStoreWebUtils.getDataMap(session);
		Integer quantity = bookService.getQuantity(book);
		if(quantity.intValue() < book.getQuantity()){
			dataMap.put("status","no");
		}
		return "validateBookQuantity";
	}

	/**
	 * 已测
	 * 添加book的图片
	 * url：book-addImages.action
	 * 需传入：book.bookId
	 * e.g. book-addImages.action?book.bookId=24&bookImages.imageURL=url1&bookImages.imageURL=url2
	 * @return
     */
	public String addImages(){
		System.out.println("addImages");
		dataMap = BookStoreWebUtils.getDataMap(session);
		if (bookImages != null && bookImages.size() > 0){
			bookService.addImages(book.getBookId().toString(),bookImages);
		}else {
			dataMap.put("status","no");
		}
		book = null;
		return "addImages";
	}

/*	public void prepareAddImages(){
		bookImages = new ArrayList<BookImages>(5);
	}*/

	/**
	 * 已测
	 * user和后台获取当前类型的所有书籍
	 * url:book-getBooksByCategory.action?book.category.categoryId=2
	 * @return
     */
	public String getBooksByCategory(){
		dataMap = BookStoreWebUtils.getDataMap(session);
		String categoryId = book.getCategory().getCategoryId().toString();
		List<Book> books = bookService.getBooksByCategory(categoryId);
		books = BookStoreWebUtils.setNull(books);
		dataMap.put("books",books);
		book = null;
		return "getBooksByCategory";
	}

	/**
	 * 已测
	 * seller得到其不同类型的书本信息
	 * 使用此接口的时候seller必须是登录状态
	 * url:book-getBooksByCategoryTo.action?book.category.categoryId=2
	 * @return
	 */
	public String getBooksByCategoryTo(){
		dataMap = BookStoreWebUtils.getDataMap(session);
		String categoryId = book.getCategory().getCategoryId().toString();
		String shopId = session.get("shopId").toString();
		List<Book> books = bookService.getBooksByCategoryTo(categoryId, shopId);
		books = BookStoreWebUtils.setNull(books);
		dataMap.put("books",books);
		book = null;
		return "getBooksByCategory";
	}



	/**
	 * 已测
	 * 添加和修改书本信息
	 * seller必须是登录状态
	 * url:book-addBook.action
	 * @return
     */
	public String addBook(){
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

	public Map<String, Object> getDataMap() {
		return dataMap;
	}

}
