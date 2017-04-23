package com.xiyou.dao;

import java.util.List;

import com.xiyou.domain.Book;
import com.xiyou.domain.BookImages;
import com.xiyou.domain.Category;

public interface BookDAO {

	/**
	 * 批量插入bookImages
	 * @param bookImages
     */
	void batchImages(List<BookImages> bookImages);

	List<Book> getBooksByCategory(String categoryId);

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
	 * 根据Id获得Book对象
	 * @param bookId
	 * @return
     */
	Book getBook(String bookId);

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
