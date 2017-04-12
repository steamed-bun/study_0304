import com.xiyou.dao.BookDAO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:applicationContext-beans.xml","classpath:applicationContext.xml"})
public class BookDAOImplTest {

    @Autowired
    private BookDAO bookDAO;

    @Test
    @Transactional
    public void getBooksTest(){
        System.out.println(bookDAO.getBooks("2"));
    }


    @Transactional
    @Test
    public void getBookTest(){
        System.out.println(bookDAO.getBook("1"));
    }

}
