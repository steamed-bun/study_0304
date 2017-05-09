package com.xiyou.actions;

import java.awt.event.FocusAdapter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.xiyou.domain.BookImages;
import com.xiyou.domain.Category;
import com.xiyou.service.ShopService;
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

	@Autowired
	private ShopService shopService;

	private Map<String, Object> dataMap;
	private Map<String, Object> session;
	private Book book;
	private List<BookImages> bookImages = new ArrayList<BookImages>(5);
    private Integer pageNum = 1;
	private Integer totalPageNo;
	private Float priceStart = 0.0F; //用户自己输入的价格起始值
	private Float priceEnd = Float.MAX_VALUE; //用户自己输入的价格起始值
    private Integer sort; //{1 : 从低到高  0 : 从高到低}

    /**
     * 非接口
     * seller 大类 数据总条数
     */
    public void getTotalPageNoForSelPId(String shopId){
        if (totalPageNo.equals(0)){
            totalPageNo = bookService
                    .getPageNoForSCPId(book.getCategory().getCategoryPId(),shopId,priceStart,priceEnd);
            session.put("totalPageNo",totalPageNo);
            dataMap.put("totalPageNo", totalPageNo);
        }else {
            totalPageNo = Integer.parseInt(session.get("totalPageNo").toString());
        }
        pageNum = (pageNum  <= 0) ? pageNum = 1 : pageNum;
    }

    /**
     * 非接口
     * seller 子类 数据总条数
     */
    public void getTotalPageNoForSelId(String shopId){
        if (totalPageNo.equals(0)){
            totalPageNo = bookService
                    .getTotalPageNo(book.getCategory().getCategoryId().toString(), shopId, priceStart, priceEnd);
            session.put("totalPageNo",totalPageNo);
            dataMap.put("totalPageNo", totalPageNo);
        }else {
            totalPageNo = Integer.parseInt(session.get("totalPageNo").toString());
        }
        pageNum = (pageNum  <= 0) ? pageNum = 1 : pageNum;
    }

    /**
     * 非接口
     * user 大类 数据总条数
     */
    public void getTotalPageNoForUserPId(){
        if (totalPageNo.equals(0)){
            totalPageNo = bookService.getTotalPageNo(book.getCategory().getCategoryPId().toString(), priceStart, priceEnd);
            session.put("totalPageNo",totalPageNo);
            dataMap.put("totalPageNo", totalPageNo);
        }else {
            totalPageNo = Integer.parseInt(session.get("totalPageNo").toString());
        }
        pageNum = (pageNum  <= 0) ? pageNum = 1 : pageNum;
    }

    /**
     * 非接口
     * user 子类 数据总条数
     */
    public void getTotalPageNoForUserId(){
        if (totalPageNo.equals(0)){
            totalPageNo = bookService
                    .getPageNoForCId(book.getCategory().getCategoryId(), priceStart, priceEnd);
            session.put("totalPageNo",totalPageNo);
            dataMap.put("totalPageNo", totalPageNo);
        }else {
            totalPageNo = Integer.parseInt(session.get("totalPageNo").toString());
        }
        pageNum = (pageNum  <= 0) ? pageNum = 1 : pageNum;
    }

    /**
     * 已测
     * user 获取书籍 传入 大类Id 页数
     * url:
     * book-getBooksForCPIdC.action?book.category.categoryPId=1&pageNum=1&totalPageNo=0&sort=0
     * 大类 浏览量
     * @return books
     */
    public String getBooksForCPIdC(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        getTotalPageNoForUserPId();
        List<Book> books = bookService.getBooksForCPIdC(book.getCategory().getCategoryPId(),pageNum, sort);
        books = BookStoreWebUtils.setNull(books);
        dataMap.put("books",books);
        this.setBook(null);
        return SUCCESS;
    }

	/**
     * 已测
	 * user获取书籍 传入子类Id 页数
	 * 子类 价格
     * url:
     * book-getBooksForCIdP.action?book.category.categoryId=4&pageNum=1&totalPageNo=0
     * 不要理下面的url
     * book-getBooksForCIdP.action?book.category.categoryId=4&pageNum=1&totalPageNo=0&priceStart=1.5&priceEnd=50
	 * @return books
     */
	public String getBooksForCIdP(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        getTotalPageNoForUserId();
        List<Book> books = bookService
                .getBooksForCIdP(book.getCategory().getCategoryId(), priceStart, priceEnd, pageNum, sort);
        books = BookStoreWebUtils.setNull(books);
        dataMap.put("books",books);
        this.setPriceStart(0.0F);
        this.setPriceEnd(Float.MAX_VALUE);
        this.setBook(null);
        return SUCCESS;
	}

    /**
     * 已测
     * user 获取书籍 传入大类Id 页数
     * 大类 价格
     * url:
     * book-getBooksForCPIdP.action?book.category.categoryPId=1&pageNum=1&totalPageNo=0
     * @return books
     */
    public String getBooksForCPIdP(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        getTotalPageNoForUserPId();
        List<Book> books = bookService
                .getBooksForCPIdP(book.getCategory().getCategoryPId(),priceStart, priceEnd, pageNum, sort);
        books = BookStoreWebUtils.setNull(books);
        dataMap.put("books",books);
        this.setBook(null);
        this.setPriceEnd(Float.MAX_VALUE);
        this.setBook(null);
        return SUCCESS;
    }

    /**
     * 已测
     * seller 获取书籍 传入 大类Id 页数
     * url:
     * book-getBooksForSPIdC.action?book.category.categoryPId=1&pageNum=1&totalPageNo=0
     * 大类 浏览量
     * @return books
     */
    public String getBooksForSPIdC(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        String shopId = session.get("shopId").toString();
        getTotalPageNoForSelPId(shopId);
        List<Book> books = bookService
                .getBooksForSPIdC(book.getCategory().getCategoryPId(), shopId, pageNum,sort);
        books = BookStoreWebUtils.setNull(books);
        dataMap.put("books",books);
        this.setBook(null);
        return SUCCESS;
    }

	/**
	 * 已测
	 * 获取一本书
	 * url:book-getBookForBack.action?book.bookId=1
	 * @return book
     */
	public String getBookForBack(){
		dataMap = BookStoreWebUtils.getDataMap(session);
		Book book1 = bookService.getBookForBack(book.getBookId());
		dataMap.put("book", book1);
		return SUCCESS;
	}

    /**
     * 已测
	 * 查找所有书籍不包括图片
     * url:
     * 1、点击“评估书籍”返回第一页数据和总页数 必须传totalPageNo=0
     * book-getBooksForBack.action?pageNum=1&totalPageNo=0
     * 2、点击页数时不能传totalPageNo=0
     * book-getBooksForBack.action?pageNum=2
	 * @return
     */
	public String getBooksForBack(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        getTotalPageNoForBack();
        List<Book> books = bookService.getBooks(pageNum);
        dataMap.put("books", books);
		return SUCCESS;
	}
    /**
     * 非接口
     * 请求第一页数据时同时返回总页数，同时后台防止页数超出范围
     * @return pageNum
     */
    public void getTotalPageNoForBack(){
        if (totalPageNo.equals(0)){
            totalPageNo = bookService.getTotalPageNo();
            System.out.println();
            session.put("totalPageNo",totalPageNo);
            dataMap.put("totalPageNo", totalPageNo);
        }else {
            totalPageNo = Integer.parseInt(session.get("totalPageNo").toString());
        }
        pageNum = (pageNum  <= 0) ? pageNum = 1 : pageNum;
    }
	/**
     * 已测
	 * 修改书本为良品或非良品
	 * url:
	 * 1、修改为良品：book-updateGookBook.action?book.bookId=2&book.goodBook=1
	 * 2、修改为非良品：book-updateGookBook.action?book.bookId=2&book.goodBook=0
	 * @return status
     */
	public String updateGookBook(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        bookService.updataGoodBook(book.getBookId(), book.getGoodBook());
		return SUCCESS;
	}

    /**
     * 首页获取分类的点击量最多的四本书
     * url:book-getTopBooks.action?book.category.categoryId=4
     * @return books
     */
    public String getTopBooks(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        List<Book> books = bookService
                .getTopBooks(book.getCategory().getCategoryId().toString());
        BookStoreWebUtils.setNull(books);
        dataMap.put("books", books);
        return SUCCESS;
    }

	/**
	 * 已测
     * User 点击书本 返回书本详细信息 同时增加当前书本的点击量
	 * url:book-getBookById.action?book.bookId=2
	 * @return 获取一本书 包含其类别及类别所属大类
     */
	public String getBookById(){
		dataMap = BookStoreWebUtils.getDataMap(session);
        book = bookService.getBookById(book);
		Shop shop  = shopService.getShopById(book.getShop().getShopId());
		book.setShop(shop);
		Category category = bookService.getCategoryById(book.getCategory().getCategoryPId());
		dataMap.put("category", category);
        dataMap.put("book",book);
		if (session.get("selId") == null){
			updateClickNum();
		}
		this.setBook(null);
		return SUCCESS;
	}

    public void updateClickNum(){
		bookService.updateClickNum(book);
	}

	/**
	 * 已测
	 * 更新bookImages 任意张图片
	 * url:book-updateBookImage.action?bookImages[0].imageId=5&bookImages[0].imageURL=testurl1&bookImages[1].imageId=6&bookImages[1].imageURL=testurl2
	 * @return null
     */
	public String updateBookImage(){
		bookService.updateBookImage(bookImages);
		return SUCCESS;
	}

    /**
     * 删除书本图片
	 * url:book-deleteBookImage.action?bookImages.imageURL=url1&bookImages.imageURL=url2
     * @return null
     */
    public String deleteBookImage(){
		bookService.deleteBookImage(bookImages);
        return SUCCESS;
    }

    /**
     * 已测 删除单本书 包括其图片
     * book-deleteBook.action?book.bookId=19
     * @return
     */
	public String deleteBook(){
		bookService.deleteBook(book.getBookId());
		return SUCCESS;
	}

	/**
	 * 已测
	 * 验证库存
	 * url:book-validateBookQuantity.action?book.bookId=13&book.quantity=20
	 * @retur 库存不足返回{status:no}
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
     * 子类 浏览量
	 * user和后台获取当前类型的所有书籍
	 * url:
     * 1、点击类别返回第一页数据和总页数 必须传totalPageNo=0
     * book-getBooksByCategory.action?book.category.categoryId=4&pageNum=1&totalPageNo=0
     * 2、点击页数时不能传totalPageNo=0
     * book-getBooksByCategory.action?book.category.categoryId=4&pageNum=1
	 * @return books
     */
	public String getBooksByCategory(){
		dataMap = BookStoreWebUtils.getDataMap(session);
		String categoryId = book.getCategory().getCategoryId().toString();
        getTotalPageNoForUserId();
		List<Book> books = bookService.getBooksByCategory(categoryId, pageNum, sort);
		books = BookStoreWebUtils.setNull(books);
		dataMap.put("books",books);
		book = null;
		return SUCCESS;
	}

	/**
	 * 已测
     * 子类 浏览量
     * 前提：使用此接口的时候seller必须是登录状态
	 * seller得到其不同类型的书本信息
	 * url:
     * 1、点击类别返回第一页数据和总页数 必须传totalPageNo=0
     * book-getBooksByCategoryTo.action?book.category.categoryId=2&pageNum=1&totalPageNo=0
     * 2、点击页数时不能传totalPageNo=0
     * book-getBooksByCategoryTo.action?book.category.categoryId=2&pageNum=1
	 * @return books
	 */
	public String getBooksByCategoryTo(){
		dataMap = BookStoreWebUtils.getDataMap(session);
		String categoryId = book.getCategory().getCategoryId().toString();
		String shopId = session.get("shopId").toString();
        getTotalPageNoForSelId(shopId);
		List<Book> books = bookService.getBooksByCategoryTo(categoryId, shopId, pageNum, sort);
		books = BookStoreWebUtils.setNull(books);
		dataMap.put("books",books);
		book = null;
		return SUCCESS;
	}

	/**
	 * 已测
	 * 添加和修改书本信息
	 * seller必须是登录状态
     * 注意url后面的bookImages
	 * url:book-addBook.action?book.category.categoryId=2&bookImages.imageURL=url1&bookImages.imageURL=url2
	 * @return status
     */
	public String addBook(){
		dataMap = BookStoreWebUtils.getDataMap(session);
		if (book.getBookId() == null){
			Shop shop = bookService.getShopByShopId(session.get("shopId").toString());
			book.setShop(shop);
			book.setClickNum(0);
			bookService.addBook(book);
            addImages(book);
			this.setBook(null);
		}else {
			bookService.addBook(book);
			this.setBook(null);
		}
		return "addBook";
	}

    public String addImages(Book book){
        System.out.println("addImages");
        dataMap = BookStoreWebUtils.getDataMap(session);
        if (bookImages != null && bookImages.size() > 0){
            bookService.addImages(book, bookImages);
        }else {
            dataMap.put("status", "no");
        }
        bookImages.clear();
        return "addImages";
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

    public Integer getPageNum() {
        return pageNum;
    }

    public void setPageNum(Integer pageNum) {
        this.pageNum = pageNum;
    }

    public Integer getTotalPageNo() {
        return totalPageNo;
    }

    public void setTotalPageNo(Integer totalPageNo) {
        this.totalPageNo = totalPageNo;
    }

	public Float getPriceStart() {
		return priceStart;
	}

	public void setPriceStart(Float priceStart) {
		this.priceStart = priceStart;
	}

	public Float getPriceEnd() {
		return priceEnd;
	}

	public void setPriceEnd(Float priceEnd) {
		this.priceEnd = priceEnd;
	}

    public void setSort(Integer sort) {
        this.sort = sort;
    }
}
