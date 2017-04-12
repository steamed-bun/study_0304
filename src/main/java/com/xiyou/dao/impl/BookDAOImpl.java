package com.xiyou.dao.impl;

import java.util.List;

import com.xiyou.dao.BookDAO;
import com.xiyou.domain.Book;
import com.xiyou.domain.Category;

public class BookDAOImpl extends BaseDAOImpl implements BookDAO {

	@Override
	public void addBook(Book book) {
		getSession().saveOrUpdate(book);
	}
	
	@Override
	public List<Book> getBooks(String shopId) {
		String hql = "FROM Book b left outer join fetch b.category " +
				"left outer join fetch b.bookImages " +
				"left outer join fetch b.shop " +
				"left outer join fetch b.shop.province " +
				"left outer join fetch b.shop.city " +
				"left outer join fetch b.shop.county " +
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
	public void deleteBook(String bookId) {
		String hql = "DELETE Book b WHERE b.bookId = :bookId";
		getSession().createQuery(hql).setString("bookId", bookId).executeUpdate();
		
	}

	@Override
	public Book getBook(String bookId) {
		String hql = "FROM Book b left outer join fetch b.category " +
				"left outer join fetch b.bookImages " +
				"left outer join fetch b.shop " +
				"left outer join fetch b.shop.province " +
				"left outer join fetch b.shop.city " +
				"left outer join fetch b.shop.county " +
				"WHERE b.bookId = :bookId";
		Book book = (Book) getSession().createQuery(hql).setString("bookId", bookId).uniqueResult();
		return book;
	}

}
