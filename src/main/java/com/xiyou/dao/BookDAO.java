package com.xiyou.dao;

import java.util.List;

import com.xiyou.domain.Book;
import com.xiyou.domain.BookImages;
import com.xiyou.domain.Category;
import com.xiyou.exception.DBException;

public interface BookDAO {

	/**
	 * 假性删除书本
	 * @param bookId
     */
	void deleteBookFalse(Integer bookId);

    /**
     * 差评
     * @param bookId bookId
     */
    void updateNoLike(Integer bookId);

	/**
	 * 点赞
	 * @param bookId bookId
     */
	void updateLike(Integer bookId);

	/**
	 * 恢复库存
	 * @param bookId bookId
	 * @param quantity quantity
     */
	void revertQuantity(Integer bookId, Integer quantity);

	/**
	 * 已测
	 * 全网搜书总条数
	 * @param bookName
	 * @return
     */
	long getTotalPageNoForSearch(String bookName);

	/**
	 * 已测
	 * 全网搜书
	 * @param  bookName bookName
	 * @param pageNum pageNum
     * @return books
     */
	List<Book> getBooksForSearch(String bookName, Integer pageNum);

	/**
	 * 已测
	 * user 得到数据总条数
	 * 子类
	 * @param categoryId categoryId
	 * @return long
     */
	long getPageNoForCId(Integer categoryId, Float priceStart, Float priceEnd);

	/**
	 * 已测
	 * seller 得到数据总条数
	 * 大类
	 * @return long
	 */
	long getPageNoForSCPId(Integer categoryPId, String shopId, Float priceStart, Float priceEnd);

	/**
	 * 已测
	 * user 获取书籍
	 * 大类 浏览量
	 * @return books
	 */
	List<Book> getBooksForCPIdC(Integer categoryPId, Integer pageNum, Integer sort);

	/**
	 * 已测
	 * user获取书籍
	 * 子类 价格
	 * @return books
	 */
	List<Book> getBooksForCIdP(Integer categoryId, Float priceStart, Float priceEnd, Integer pageNum, Integer sort);

	/**
	 * 已测
	 * user 获取书籍
	 * 大类 价格
	 * @return books
	 */
	List<Book> getBooksForCPIdP(Integer categoryPId, Float priceStart, Float priceEnd, Integer pageNum, Integer sort);

	/**
	 * 已测
	 * seller 获取书籍
	 * 大类 浏览量
	 * @return books
	 */
	List<Book> getBooksForSPIdC(Integer categoryPId, String shopId, Integer pageNum, Integer sort);

	/**
	 * 已测
	 * 后台获取一本书
	 * @param bookId bookId
	 * @return book
     */
	Book getBookForBack(Integer bookId);

	/**
	 * 已测
	 * 修改goodBook
	 * @param bookId bookId
 	 * @param goodBook goodBook
     */
	void updataGoodBook(Integer bookId, Integer goodBook);

	/**
	 * 已测
	 * seller 专用
	 * 子类
	 * @param categoryId categoryId
	 * @param shopId shopId
     * @return 总页数
     */
	long getTotalPageNo(String categoryId, String shopId, Float priceStart, Float priceEnd);

	/**
	 * 已测
	 * user
	 * 大类
	 * @param categoryPId categoryId
     * @return 总条数
     */
	long getTotalPageNo(String categoryPId, Float priceStart, Float priceEnd);

	/**
	 * 已测
	 * 得到各个类别点击量最高的四本书
	 * @param categoryId categoryId
	 * @return boks
     */
	List<Book> getTopBooks(String categoryId);

	/**
	 * 已测
	 * 为了获得category的大类
	 * @param categoryId categoryId
	 * @return category
     */
	Category getCategoryById(Integer categoryId);

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
	 * 删除当前书本的图片
	 * @param bookId 关联书本Id
     */
	void deleteBookImage(Integer bookId);

	/**
	 * 获取书本数量
	 * @param book bookId
	 * @return 书本数量
     */
	Integer getQuantity(Book book);

	/**
	 * 修改库存
	 * @param bookId bookId
	 * @param quantity quantity
     */
	void updateQuantity(Integer bookId, Integer quantity) throws DBException;

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
	List<Book> getBooksByCategory(String categoryId, Integer pageNum, Integer sort);

	/**
	 * 获取当前类型的书本信息，需要当前shopId
	 * @param categoryId 类型Id
	 * @return books
	 */
	List<Book> getBooksByCategoryTo(String categoryId, String shopId, Integer pageNum, Integer sort);

	/**
	 * 删除一本书
	 * @param bookId bookId
	 */
	void deleteBook(Integer bookId) throws Exception ;
	
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
	 * @return books
	 */
	List<Book> getBooks(Integer pageNum);

	/**
	 * 已测
	 * 为了后台书本分页获取总页数
	 * @return 总页数
	 */
	long getTotalPageNo();
	
}
