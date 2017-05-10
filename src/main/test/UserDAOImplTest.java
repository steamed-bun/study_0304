import com.xiyou.dao.impl.UserDAOImpl;
import com.xiyou.domain.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:applicationContext-beans.xml","classpath:applicationContext.xml"})
public class UserDAOImplTest {

    @Autowired
    private UserDAOImpl userDAO;

    @Transactional
    @Test
    public void testGetUserByEmail(){
//        System.out.println(userDAO.getUserByEmail("12@"));
        userDAO.updatePassword("12@", "onlyOne");
    }


    @Transactional
    @Test
    public void addUserTest(){
        User user = new User(null,"nihu","123",1,"23","32","13","32","32");
        System.out.println(user);
//        userDAO.addUser(user);
    }

    @Transactional
    @Test
    public void getUserByIdTest(){
        System.out.println(userDAO.getUserById("1"));
    }

    @Test
    @Transactional
    public void deleteUserTest(){
        userDAO.deleteUser("1");
    }

}
