import com.xiyou.dao.BookDAO;
import com.xiyou.dao.ShopDAO;
import com.xiyou.domain.Book;
import com.xiyou.domain.BookImages;
import com.xiyou.domain.Shop;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:applicationContext-beans.xml","classpath:applicationContext.xml"})
public class BookDAOImplTest {

    @Autowired
    private BookDAO bookDAO;
    @Autowired
    private ShopDAO shopDAO;

    @Test
    @Transactional
    public void testGetBooksFor(){
//        System.out.println(bookDAO.getBooksForCPIdC(1,3).size());
//        System.out.println(bookDAO.getBooksForCIdP(4, 1.5F, 50F, 2));
//        System.out.println(bookDAO.getBooksForCPIdP(1, 1.5F, 50F, 2));
//        System.out.println(bookDAO.getBooksForSPIdC(1, "25", 3));
    }

    @Test
    @Transactional
    public void testGetBookForBack(){
        System.out.println(bookDAO.getBookForBack(4));
    }

    @Test
    @Transactional
    public void testGetBooks() {
        System.out.println( bookDAO.getBooks(1));
    }

    @Test
    @Transactional
    public void testUpdataGoodBook(){
        bookDAO.updataGoodBook(2,1);
    }

    @Test
    @Transactional
    public void testGetTotalPageNo(){
//        System.out.println(bookDAO.getPageNoForCId(4, 0.0F,  50.0F));
//        System.out.println(bookDAO.getTotalPageNo("1", 0.0F, 50.0F));
//        System.out.println(bookDAO.getPageNoForSCPId(1, "25", 0.0F,  Float.MAX_VALUE));
        System.out.println(bookDAO.getTotalPageNo("4", "25", 0.0F, 50.0F));
    }

    @Test
    @Transactional
    public void testGetTopBooks(){
        System.out.println(bookDAO.getTopBooks("1"));
    }

    @Test
    @Transactional
    public void testGetBookById(){
        Book book = new Book(2);
        book = bookDAO.getBookById(book);
    }

    @Test
    @Transactional
    public void testUpdateClickNum(){
        bookDAO.updateClickNum(new Book(2));
    }

    @Test
    @Transactional
    public void testDeleteBookImage(){
        List<BookImages> bookImages = new ArrayList<BookImages>(2);
        BookImages bookImages1 = new BookImages();
        bookImages1.setImageId(1);
        bookImages1.setImageURL("testurl1");
        BookImages bookImages2 = new BookImages();
        bookImages2.setImageId(2);
        bookImages2.setImageURL("testurl2");
        bookImages.add(bookImages1);
        bookImages.add(bookImages2);
//        bookDAO.deleteBookImage(bookImages);
        bookDAO.updateBookImage(bookImages);
    }

    @Test
    @Transactional
    public void testGetQuantity(){
        System.out.println(bookDAO.getQuantity(new Book(13)));
    }

    @Test
    @Transactional
    public void testUpdateQuantity(){
        bookDAO.updateQuantity("13",19);
    }

    @Test
    @Transactional
    public void getBooksTest(){
        //System.out.println(bookDAO.getBooks("2"));
        System.out.println(new Random().nextInt(1000)+1000);
    }

    @Transactional
    @Test
    public void TestGetBooksByCategory(){
//        System.out.println(bookDAO.getBooksByCategory("2",2));
    }

    @Transactional
    @Test
    public void getBookTest(){
        System.out.println(bookDAO.getBook("4"));
    }

    @Transactional
    @Test
    public void TestAddBook(){
        Shop shop = shopDAO.selectShop("26");
        Book book = new Book();
        Set<BookImages> images = new HashSet<BookImages>(8);
        images.add(new BookImages(null,"dajdsk",null));
        images.add(new BookImages(null,"打架吧",null));
        book.setAuthor("hanil");
        book.setBookName("他好");
        book.setShop(shop);
        bookDAO.addBook(book);
    }

    @Transactional
    @Test
    public void TestBatchImages(){
        List<BookImages> images = new ArrayList<BookImages>(5);
        BookImages bookImages = new BookImages();
        Book book = bookDAO.getBook("10");
        bookImages.setBook(book);
        bookImages.setImageURL("url2");
        images.add(bookImages);
        bookImages.setImageURL("url3");
        images.add(bookImages);
        bookImages.setImageURL("url4");
        images.add(bookImages);
        bookDAO.batchImages(images);
    }

    @Transactional
    @Test
    public void TestGetBookTo(){
        bookDAO.getBookTo("10");
    }

}
