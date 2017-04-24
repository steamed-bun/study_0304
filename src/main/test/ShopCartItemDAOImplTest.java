import com.xiyou.dao.BookDAO;
import com.xiyou.dao.ShopCartItemDAO;
import com.xiyou.dao.UserDAO;
import com.xiyou.domain.ShopCartItem;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:applicationContext-beans.xml","classpath:applicationContext.xml"})
public class ShopCartItemDAOImplTest {

    @Autowired
    ShopCartItemDAO shopCartItemDAO;

    @Autowired
    BookDAO bookDAO;

    @Autowired
    UserDAO userDao;

    @Test
    @Transactional
    public void getShopItemByUserIdTest(){
        System.out.println(shopCartItemDAO.getShopItemByUserId("37"));
    }

    @Transactional
    @Test
    public void addShopItemTest(){
        ShopCartItem shopCartItem = new ShopCartItem();
        System.out.println(new java.util.Date().getTime());
        shopCartItem.setItemTime(new Date(new java.util.Date().getTime()));
        shopCartItem.setQuantity(2);
        shopCartItem.setBook(bookDAO.getBook("1"));
        shopCartItem.setUser(userDao.getUserById("1"));
        System.out.println(shopCartItem);
        shopCartItemDAO.addShopItem(shopCartItem);
    }

    @Transactional
    @Test
    public void TestUpdateQuantity(){
        shopCartItemDAO.updateQuantity("6","1");
    }

}
