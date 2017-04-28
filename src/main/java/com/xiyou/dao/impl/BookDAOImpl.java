package com.xiyou.dao.impl;

import java.util.List;

import com.xiyou.dao.BookDAO;
import com.xiyou.domain.Book;
import com.xiyou.domain.BookImages;
import com.xiyou.domain.Category;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

@Repository("bookDAOImpl")
public class BookDAOImpl extends BaseDAOImpl implements BookDAO {

	@Override
	public void addBook(Book book) {
		getSession().saveOrUpdate(book);
	}
	
	@Override
	public List<Book> getBooks(String shopId) {
		String hql = "FROM Book b " +
				"WHERE b.shop = :shopId order by b.bookId";
		
		@SuppressWarnings("unchecked")
		List<Book> list = getSession().createQuery(hql).setString("shopId", shopId).list();
		return list;
				
	}

	@Override
	public List<Category> selectCategory() {
		String hql = "from Category";
		@SuppressWarnings("unchecked")
		List<Category> categories = getSession().createQuery(hql).list();
		return categories;
	}

	@Override
	public List<Book> getBooksByCategory(String categoryId) {
		String hql = "FROM Book AS b " +
				"WHERE b.category = :categoryId";
		@SuppressWarnings("unchecked")
		List<Book> books = getSession().createQuery(hql).setString("categoryId",categoryId).list();
		return books;
	}

	@Override
	public List<Book> getBooksByCategoryTo(String categoryId, String shopId) {
		String hql = "FROM Book AS b " +
				"WHERE b.category = :categoryId AND b.shop = :shopId";
		@SuppressWarnings("unchecked")
		List<Book> books = getSession().createQuery(hql).setString("categoryId",categoryId)
				.setString("shopId",shopId).list();
		return books;
	}

	@Override
	public void deleteBook(String bookId) {
		String hql = "DELETE Book b WHERE b.bookId = :bookId";
		getSession().createQuery(hql).setString("bookId", bookId).executeUpdate();
		
	}

	@Override
	public Book getBook(String bookId) {
		String hql = "FROM Book b " +
				"WHERE b.bookId = :bookId";
		Book book = (Book) getSession().createQuery(hql).setString("bookId", bookId).uniqueResult();
		return book;
	}

	@Override
	public Book getBookTo(String bookId) {
		String hql = "SELECT new Book ( b.bookId ) FROM Book b WHERE b.bookId = :bookId";
		Book book = (Book) getSession().createQuery(hql).setString("bookId", bookId).uniqueResult();
		return book;
	}

	@Override
	public String getBookImageByBookId(List<String> bookIds) {
		String hql = "SELECT b.imageURL FROM BookImages b WHERE b.book = :bookId";
		getSession().createQuery(hql);
		return null;
	}

	//如果量足够大的话应该手动写入数据库，并清除缓存
	@Override
	public void batchImages(List<BookImages> bookImages){
		Session session = getSession();
		for (BookImages bookImage : bookImages) {
			session.save(bookImage);
		}
	}



}
