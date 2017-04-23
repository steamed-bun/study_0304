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
    public void getBooksTest(){
        //System.out.println(bookDAO.getBooks("2"));
        System.out.println(new Random().nextInt(1000)+1000);
    }

    @Transactional
    @Test
    public void TestGetBooksByCategory(){
        System.out.println(bookDAO.getBooksByCategory("2"));
    }

    @Transactional
    @Test
    public void getBookTest(){
        System.out.println(bookDAO.getBook("1"));
    }

    @Transactional
    @Test
    public void TestAddBook(){
        Shop shop = shopDAO.getShopByShopId("26");
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
