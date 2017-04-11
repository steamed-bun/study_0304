package com.xiyou.dao;

import java.util.List;

import com.xiyou.domain.Book;
import com.xiyou.domain.Category;

public interface BookDAO {

	/**
	 * 删除一本书
	 * @param bookId
	 */
	public abstract void deleteBook(String bookId);
	
	/**
	 * 添加一本书
	 * @param book
	 */
	public abstract void addBook(Book book);
	
	public abstract Book getBook(String bookId);
	
	/**
	 * 获取所有书籍
	 * @param shopId
	 * @return
	 */
	public abstract List<Book> getBooks(String shopId);
	
	public abstract List<Category> selectCategory();
	
}
