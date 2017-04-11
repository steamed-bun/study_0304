import com.xiyou.actions.EmailAction;
import com.xiyou.service.EmailService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:applicationContext-beans.xml","classpath:applicationContext.xml"})
public class EmailServiceTest {

/*
    @Autowired
    private EmailAction emailAction;
*/
    @Autowired
    private EmailService emailService;

    @Test
    public void sendEmailTest(){
//        emailAction.sendEmail("514156689@qq.com","1111");
        emailService.sendEmail("514156689@qq.com","1111");
    }


}
