package com.xiyou.dao;

import java.util.List;

import com.xiyou.domain.Book;
import com.xiyou.domain.BookImages;
import com.xiyou.domain.Category;

public interface BookDAO {

	Category getCategoryById();

	/**
	 * 已测
	 * 此方法可以同时查出类别
	 * @param book bookId
	 * @return book
     */
	Book getBookById(Book book);

	/**
	 * 已测
	 * 更新点击量
	 * @param book bookId
     */
	void updateClickNum(Book book);

	/**
	 * 已测
	 * 更新任意张图片
	 * @param bookImages imageId&imageURL
     */
	void updateBookImage(List<BookImages> bookImages);

	/**
	 * 已测
	 * 删除任意张图片
	 * @param bookImages 图片Id
     */
	void deleteBookImage(List<BookImages> bookImages);

	/**
	 * 获取书本数量
	 * @param book bookId
	 * @return 书本数量
     */
	Integer getQuantity(Book book);

	void updateQuantity(String bookId, Integer quantity);

	/**
	 * 批量插入bookImages
	 * @param bookImages bookImages.urls
     */
	void batchImages(List<BookImages> bookImages);

	/**
	 * 获取当前类型的书本信息，供买家和后台管理使用
	 * @param categoryId 类型Id
	 * @return books
     */
	List<Book> getBooksByCategory(String categoryId);

	/**
	 * 获取当前类型的书本信息，需要当前shopId
	 * @param categoryId 类型Id
	 * @return books
	 */
	List<Book> getBooksByCategoryTo(String categoryId, String shopId);

	/**
	 * 删除一本书
	 * @param bookId bookId
	 */
	void deleteBook(String bookId);
	
	/**
	 * 添加一本书
	 * @param book 前台得到的book
	 */
	void addBook(Book book);

	/**
	 * 已测
	 * 根据Id获得Book对象全部
	 * @param bookId bookId
	 * @return book
     */
	Book getBook(String bookId);

	/**
	 * 获取Book仅仅包含BookId
	 * @param bookId bookId
	 * @return book
     */
	Book getBookTo(String bookId);

	/**
	 * 已测
	 * 获取所有书籍
	 * @param shopId shopId
	 * @return books
	 */
	List<Book> getBooks(String shopId);

	List<Category> selectCategory();
	
}
