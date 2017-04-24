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
		String hql = "FROM Book b left outer join fetch b.category " +
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
	public List<Book> getBooksByCategory(String categoryId) {
		String hql = "SELECT new Book (b.bookId, b.bookName,b.bookPrice, b.quantity, b.likes) " +
				"FROM Book b " +
				"WHERE b.category = :categoryId";
		@SuppressWarnings("unchecked")
		List<Book> books = getSession().createQuery(hql).setString("categoryId",categoryId).list();
		return books;
	}

	@Override
	public void deleteBook(String bookId) {
		String hql = "DELETE Book b WHERE b.bookId = :bookId";
		getSession().createQuery(hql).setString("bookId", bookId).executeUpdate();
		
	}

	@Override
	public Book getBook(String bookId) {
		String hql = "FROM Book b left outer join fetch b.category " +
				"left outer join fetch b.shop " +
				"left outer join fetch b.shop.province " +
				"left outer join fetch b.shop.city " +
				"left outer join fetch b.shop.county " +
				"WHERE b.bookId = :bookId";
		Book book = (Book) getSession().createQuery(hql).setString("bookId", bookId).uniqueResult();
		return book;
	}

	@Override
	public Book getBookTo(String bookId) {
		//Integer bookId, String bookName, String author, float bookPrice, int quantity, int likes, int noLike, String publicationDate, String publisher, String summary
		/*
		String hql = "SELECT new Book (b.bookId, b.bookName, b.author, b.bookPrice, b.quantity, b.likes, b.noLike, b.publicationDate, b.publisher, b.summary) " +
				"FROM Book b WHERE b.bookId = :bookId";
		*/
		String hql = "SELECT new Book ( b.bookId ) FROM Book b WHERE b.bookId = :bookId";
		Book book = (Book) getSession().createQuery(hql).setString("bookId", bookId).uniqueResult();
		return book;
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
