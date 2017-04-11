//import com.coocaa.fire.utils.JsonUtils;
import com.xiyou.domain.Book;
import org.junit.Test;


public class TestAction {

    @Test
    public void testJsonUtil(){
        Book book = new Book();
        book.setAuthor("haha");
       // System.out.println( JsonUtils.obj2Json(book));
    }
}
