package com.xiyou.dao.impl;

import java.util.List;

import com.xiyou.dao.BookDAO;
import com.xiyou.domain.Book;
import com.xiyou.domain.BookImages;
import com.xiyou.domain.Category;
import com.xiyou.exception.DBException;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

@Repository("bookDAOImpl")
public class BookDAOImpl extends BaseDAOImpl implements BookDAO {

	private static final int PAGE_SIZE = 8;//书本数量
	private static final int BACK_PAGE_SIZE = 10;//后台书本数量
	private static final int BASE_NUM = 0;

	@Override
	public void updateNoLike(Integer bookId) {
		String hql = "UPDATE Book b SET b.noLike = (b.noLike + 1) WHERE b.bookId = :bookId";
		getSession().createQuery(hql)
				.setInteger("bookId", bookId).executeUpdate();
	}

	@Override
	public void updateLike(Integer bookId) {
		String hql = "UPDATE Book b SET b.likes = (b.likes + 1) WHERE b.bookId = :bookId";
		getSession().createQuery(hql)
				.setInteger("bookId", bookId).executeUpdate();
	}

	@Override
	public void revertQuantity(Integer bookId, Integer quantity) {
		String hql= "UPDATE Book b SET b.quantity = (b.quantity + :quantity) " +
				"WHERE b.bookId = :bookId";
		getSession().createQuery(hql)
				.setInteger("quantity", quantity)
				.setInteger("bookId", bookId)
				.executeUpdate();
	}

	@Override
	public long getTotalPageNoForSearch(String bookName) {
		String hql = "SELECT count (b.bookId) FROM Book b WHERE b.bookName LIKE '%"
				+ bookName + "%'";
		long totalPageNo = (Long) getSession().createQuery(hql).uniqueResult();
		return totalPageNo;
	}

	@Override
	public List<Book> getBooksForSearch(String bookName, Integer pageNum) {
		String hql = "FROM Book b WHERE b.bookName LIKE '%"+ bookName + "%' ORDER BY b.bookPrice";
		@SuppressWarnings("unchecked")
		List<Book> books = (List<Book>) getSession().createQuery(hql)
				.setFirstResult(BASE_NUM + (pageNum- 1) * PAGE_SIZE)
				.setMaxResults(PAGE_SIZE).list();
		return books;
	}

	@Override
	public long getPageNoForCId(Integer categoryId, Float priceStart, Float priceEnd) {
		String hql = "SELECT count (b.bookId) FROM Book b " +
				"WHERE b.category = :categoryId " +
				"AND b.bookPrice >= :priceStart " +
				"AND b.bookPrice <= :priceEnd";
		long totalPageNo = (Long) getSession().createQuery(hql)
				.setInteger("categoryId", categoryId)
				.setFloat("priceStart", priceStart)
				.setFloat("priceEnd", priceEnd)
				.uniqueResult();
		return totalPageNo;
	}

	@Override
	public long getPageNoForSCPId(Integer categoryPId, String shopId, Float priceStart, Float priceEnd) {
		String hql = "SELECT count (b.bookId) FROM Book b " +
				"WHERE b.category IN (FROM Category c WHERE c.categoryPId = :categoryPId) " +
				"AND b.shop = :shopId " +
				"AND b.bookPrice >= :priceStart " +
				"AND b.bookPrice <= :priceEnd";
		long totalPageNo = (Long) getSession().createQuery(hql)
				.setInteger("categoryPId", categoryPId).setString("shopId", shopId)
				.setFloat("priceStart", priceStart)
				.setFloat("priceEnd", priceEnd)
				.uniqueResult();
		return totalPageNo;
	}

	@Override
	public List<Book> getBooksForCPIdC(Integer categoryPId, Integer pageNum, Integer sort) {
		String hql;
			if(sort.equals(0)){
				hql = "FROM Book b WHERE b.category IN " +
						"(FROM Category c WHERE c.categoryPId = :categoryPId) ORDER BY b.clickNum DESC";
			}else {
				hql = "FROM Book b WHERE b.category IN " +
						"(FROM Category c WHERE c.categoryPId = :categoryPId) ORDER BY b.clickNum";
			}
		@SuppressWarnings("unchecked")
		List<Book> books = (List<Book>) getSession().createQuery(hql)
				.setInteger("categoryPId", categoryPId)
				.setFirstResult(BASE_NUM + (pageNum- 1) * PAGE_SIZE)
				.setMaxResults(PAGE_SIZE).list();
		return books;
	}

	@Override
	public List<Book> getBooksForCIdP(Integer categoryId, Float priceStart, Float priceEnd, Integer pageNum, Integer sort) {
		String hql;
		if (sort.equals(0)){
			hql = "FROM Book b WHERE b.bookPrice >= :priceStart " +
					"AND b.bookPrice <= :priceEnd " +
					"AND b.category = :categoryId " +
					"ORDER BY b.bookPrice DESC";
		}else {
			hql = "FROM Book b WHERE b.bookPrice >= :priceStart " +
					"AND b.bookPrice <= :priceEnd " +
					"AND b.category = :categoryId " +
					"ORDER BY b.bookPrice";
		}
		@SuppressWarnings("unchecked")
		List<Book> books = (List<Book>) getSession().createQuery(hql)
				.setFloat("priceStart", priceStart)
				.setFloat("priceEnd", priceEnd)
				.setInteger("categoryId", categoryId)
				.setFirstResult(BASE_NUM + (pageNum- 1) * PAGE_SIZE)
				.setMaxResults(PAGE_SIZE)
				.list();
		return books;
	}

	@Override
	public List<Book> getBooksForCPIdP(Integer categoryPId, Float priceStart, Float priceEnd, Integer pageNum, Integer sort) {
		String hql;
		if (sort.equals(0)){
			hql = "FROM Book b WHERE b.bookPrice >= :priceStart " +
					"AND b.bookPrice <= :priceEnd " +
					"AND b.category IN (FROM Category c WHERE c.categoryPId = :categoryPId) " +
					"ORDER BY b.bookPrice DESC";
		}else {
			hql = "FROM Book b WHERE b.bookPrice >= :priceStart " +
					"AND b.bookPrice <= :priceEnd " +
					"AND b.category IN (FROM Category c WHERE c.categoryPId = :categoryPId) " +
					"ORDER BY b.bookPrice";
		}

		@SuppressWarnings("unchecked")
		List<Book> books = (List<Book>) getSession().createQuery(hql)
				.setFloat("priceStart", priceStart)
				.setFloat("priceEnd", priceEnd)
				.setInteger("categoryPId", categoryPId)
				.setFirstResult(BASE_NUM + (pageNum- 1) * PAGE_SIZE)
				.setMaxResults(PAGE_SIZE)
				.list();
		return books;
	}

	@Override
	public List<Book> getBooksForSPIdC(Integer categoryPId, String shopId, Integer pageNum, Integer sort) {
		String hql;
		if (sort.equals(0)){
			hql = "FROM Book b WHERE b.category IN (FROM Category c WHERE c.categoryPId = :categoryPId) " +
					"AND b.shop = :shopId " +
					"ORDER BY b.clickNum DESC";
		}else {
			hql = "FROM Book b WHERE b.category IN (FROM Category c WHERE c.categoryPId = :categoryPId) " +
					"AND b.shop = :shopId " +
					"ORDER BY b.clickNum";
		}
		@SuppressWarnings("unchecked")
		List<Book> books = (List<Book>) getSession().createQuery(hql)
				.setInteger("categoryPId", categoryPId)
				.setString("shopId", shopId)
				.setFirstResult(BASE_NUM + (pageNum- 1) * PAGE_SIZE)
				.setMaxResults(PAGE_SIZE)
				.list();
		return books;
	}

	@Override
	public Book getBookForBack(Integer bookId) {
		String hql = "SELECT new Book (b.bookId, b.bookName, b.author, b.likes, b.goodBook) " +
				"FROM Book b WHERE b.bookId = :bookId";
		Book book = (Book) getSession().createQuery(hql).setInteger("bookId", bookId).uniqueResult();
		return book;
	}

	@Override
	public void updataGoodBook(Integer bookId, Integer goodBook) {
		String hql = "UPDATE Book b SET b.goodBook = :goodBook " +
				"WHERE b.bookId = :bookId";
		getSession().createQuery(hql).setInteger("goodBook", goodBook)
				.setInteger("bookId", bookId).executeUpdate();
	}

	@Override
    public long getTotalPageNo(String categoryId, String shopId, Float priceStart, Float priceEnd) {
        String hql = "SELECT count (b.bookId) FROM Book b " +
                "WHERE b.category = :categoryId AND b.shop = :shopId " +
				"AND b.bookPrice >= :priceStart " +
				"AND b.bookPrice <= :priceEnd";
        long totalPageNo = (Long) getSession().createQuery(hql)
                .setString("categoryId", categoryId).setString("shopId", shopId)
				.setFloat("priceStart", priceStart)
				.setFloat("priceEnd", priceEnd)
                .uniqueResult();
//        totalPageNo = (long) Math.ceil((double)totalPageNo/PAGE_SIZE);
        return totalPageNo;
    }

    @Override
    public long getTotalPageNo(String categoryPId, Float priceStart, Float priceEnd) {
        String hql = "SELECT count (b.bookId) FROM Book b " +
                "WHERE b.category IN (FROM Category c WHERE c.categoryPId = :categoryPId) " +
				"AND b.bookPrice >= :priceStart " +
				"AND b.bookPrice <= :priceEnd";
        long totalPageNo = (Long) getSession().createQuery(hql)
                .setString("categoryPId", categoryPId)
				.setFloat("priceStart", priceStart)
				.setFloat("priceEnd", priceEnd).uniqueResult();
//        totalPageNo = (long) Math.ceil((double)totalPageNo/PAGE_SIZE);
        return totalPageNo;
    }

    @Override
	public List<Book> getTopBooks(String categoryId) {
		String hql = "FROM Book b WHERE b.category IN " +
				"(FROM Category c WHERE c.categoryPId = :categoryId) " +
				"ORDER BY b.clickNum DESC";
		@SuppressWarnings("unchecked")
		List<Book> book = (List<Book>) getSession().createQuery(hql).setString("categoryId", categoryId)
				.setFirstResult(0).setMaxResults(4).list();
		return book;
	}

	@Override
	public Category getCategoryById(Integer categoryId) {
		String hql = "SELECT new Category (c.categoryId, c.categoryName) FROM Category c " +
				"WHERE c.categoryId = :categoryId";
		@SuppressWarnings("unchecked")
		Category category = (Category) getSession().createQuery(hql)
				.setInteger("categoryId",categoryId.intValue()).uniqueResult();
		return category;
	}

	@Override
	public Book getBookById(Book book) {
		String hql = "FROM Book b LEFT OUTER JOIN FETCH b.category " +
				"WHERE b.bookId = :bookId";
		book = (Book) getSession().createQuery(hql).setInteger("bookId", book.getBookId())
				.uniqueResult();
		return book;
	}

	@Override
	public void updateClickNum(Book book) {
		String hql = "UPDATE Book b SET b.clickNum = (b.clickNum + 1) WHERE b.bookId = :bookId ";
		getSession().createQuery(hql).setInteger("bookId",book.getBookId()).executeUpdate();
	}

	@Override
	public void updateBookImage(List<BookImages> bookImages) {
		Session session = getSession();
		String hql = "UPDATE BookImages b SET b.imageURL = :imageURL " +
				"WHERE b.imageId = :imageId";
		for (BookImages bookImage : bookImages) {
			session.createQuery(hql).setString("imageURL", bookImage.getImageURL())
					.setString("imageId", bookImage.getImageId().toString()).executeUpdate();
		}
	}

	@Override
	public void deleteBookImage(List<BookImages> bookImages) {
		Session session = getSession();
		String hql = "DELETE FROM BookImages b WHERE b.imageId = :imageId";
		for (BookImages bookImage : bookImages) {
			session.createQuery(hql)
					.setString("imageId", bookImage.getImageId().toString()).executeUpdate();
		}
	}

	public Integer getQuantity(Book book) {
		String hql = "SELECT b.quantity FROM Book b WHERE b.bookId = :bookId";
		Integer quantity = (Integer) getSession().createQuery(hql)
				.setInteger("bookId", book.getBookId()).uniqueResult();
		return quantity;
	}

	@Override
	public void updateQuantity(Integer bookId, Integer quantity) throws DBException{
		Integer quantityDB = getQuantity(bookId.toString());
		if (quantity > quantityDB) {
			throw new DBException(bookId + "库存不足");
		}
		String hql = "UPDATE Book b SET b.quantity = (b.quantity - :quantity ) " +
				"WHERE b.bookId= :bookId";
		getSession().createQuery(hql)
				.setInteger("quantity", quantity.intValue()).setInteger("bookId", bookId)
				.executeUpdate();
	}

	public Integer getQuantity(String bookId) {
		String hql = "SELECT b.quantity FROM Book b WHERE b.bookId = :bookId";
		Integer quantity = (Integer) getSession().createQuery(hql)
				.setString("bookId",bookId).uniqueResult();
		return quantity;
	}

	//如果量足够大的话应该手动写入数据库，并清除缓存
	@Override
	public void batchImages(List<BookImages> bookImages) {
		Session session = getSession();
		for (BookImages bookImage : bookImages) {
			session.save(bookImage);
		}
	}

	@Override
	public List<Book> getBooksByCategory(String categoryId, Integer pageNum, Integer sort) {
		String hql;
		if (sort.equals(0)){
			hql = "FROM Book AS b " +
					"WHERE b.category = :categoryId ORDER BY b.clickNum DESC";
		}else {
			hql = "FROM Book AS b " +
					"WHERE b.category = :categoryId ORDER BY b.clickNum";
		}
		@SuppressWarnings("unchecked")
		List<Book> books = getSession().createQuery(hql)
				.setString("categoryId", categoryId)
				.setFirstResult(BASE_NUM + (pageNum- 1) * PAGE_SIZE)
				.setMaxResults(PAGE_SIZE).list();
		return books;
	}

	@Override
	public List<Book> getBooksByCategoryTo(String categoryId, String shopId, Integer pageNum, Integer sort) {
		String hql;
		if (sort.equals(0)){
			hql = "FROM Book AS b " +
					"WHERE b.category = :categoryId AND b.shop = :shopId ORDER BY b.clickNum DESC";
		}else {
			hql = "FROM Book AS b " +
					"WHERE b.category = :categoryId AND b.shop = :shopId ORDER BY b.clickNum";
		}
		@SuppressWarnings("unchecked")
		List<Book> books = getSession().createQuery(hql).setString("categoryId", categoryId)
				.setFirstResult(BASE_NUM + (pageNum- 1) * PAGE_SIZE)
				.setMaxResults(PAGE_SIZE)
				.setString("shopId", shopId).list();
		return books;
	}

	@Override
	public void deleteBook(Integer bookId) {
		Session session = getSession();
		String hql = "DELETE Book b WHERE b.bookId = :bookId";
		session.createQuery(hql).setInteger("bookId", bookId).executeUpdate();
		hql = "UPDATE TradeItem t SET t.book = 1 WHERE t.book = :bookId";
		session.createQuery(hql).setInteger("bookId", bookId).executeUpdate();
	}

	@Override
	public void addBook(Book book) {
		getSession().saveOrUpdate(book);
	}

	@Override
	public Book getBook(String bookId) {
		String hql = "FROM Book b " +
				"WHERE b.bookId = :bookId";
		Book book = (Book) getSession().createQuery(hql)
				.setString("bookId", bookId).uniqueResult();
		return book;
	}

	@Override
	public Book getBookTo(String bookId) {
		String hql = "SELECT new Book (b.bookId, b.bookName, b.quantity) FROM Book b " +
				"WHERE b.bookId = :bookId";
		Book book = (Book) getSession().createQuery(hql)
				.setString("bookId", bookId).uniqueResult();
		return book;
	}

	@Override
	public List<Book> getBooks(Integer pageNum) {
		String hql = "SELECT new Book (b.bookId, b.bookName, b.author, b.likes, b.goodBook) " +
				"FROM Book b " +
				"order by b.bookId";
		@SuppressWarnings("unchecked")
		List<Book> list = getSession().createQuery(hql)
				.setFirstResult(BASE_NUM + (pageNum- 1) * BACK_PAGE_SIZE)
				.setMaxResults(BACK_PAGE_SIZE)
				.list();
		return list;

	}

	@Override
	public long getTotalPageNo() {
		String hql = "SELECT count (b.bookId) FROM Book b";
		long totalPageNo = (Long) getSession().createQuery(hql).uniqueResult();
//		totalPageNo = (long) Math.ceil((double)totalPageNo/BACK_PAGE_SIZE);
		return totalPageNo;
	}
}