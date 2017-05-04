package com.xiyou.dao;

import java.util.List;

import com.xiyou.domain.Book;
import com.xiyou.domain.BookImages;
import com.xiyou.domain.Category;
import com.xiyou.domain.TradeItem;

public interface BookDAO {

	Integer getQuantity(Book book);

	void updateQuantity(String bookId, Integer quantity);

	/**
	 * 获取一张book的图片
	 * @return
     */
	String getBookImageByBookId(List<String> bookIds);

	/**
	 * 批量插入bookImages
	 * @param bookImages
     */
	void batchImages(List<BookImages> bookImages);

	/**
	 * 获取当前类型的书本信息，供买家和后台管理使用
	 * @param categoryId
	 * @return
     */
	List<Book> getBooksByCategory(String categoryId);

	/**
	 * 获取当前类型的书本信息，需要当前shopId
	 * @param categoryId
	 * @return
	 */
	List<Book> getBooksByCategoryTo(String categoryId, String shopId);

	/**
	 * 删除一本书
	 * @param bookId
	 */
	void deleteBook(String bookId);
	
	/**
	 * 添加一本书
	 * @param book
	 */
	void addBook(Book book);

	/**
	 * 已测
	 * 根据Id获得Book对象全部
	 * @param bookId
	 * @return
     */
	Book getBook(String bookId);

	/**
	 * 获取Book仅仅包含BookId
	 * @param bookId
	 * @return
     */
	Book getBookTo(String bookId);

	/**
	 * 已测
	 * 获取所有书籍
	 * @param shopId
	 * @return
	 */
	List<Book> getBooks(String shopId);

	List<Category> selectCategory();
	
}
