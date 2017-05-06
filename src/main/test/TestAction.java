import org.junit.Test;

public class TestAction {

    @Test
    public void testJsonUtil(){
        String name = "haha.jpg";
        name = name.substring(name.length()-4, name.length());
        System.out.println(name);
    }
}
