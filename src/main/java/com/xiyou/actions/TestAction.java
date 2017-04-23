package com.xiyou.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.xiyou.domain.Book;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;

@Controller
public class TestAction extends ActionSupport {

    private List<Book> test = new ArrayList<Book>();

    public String kang(){

        System.out.println("kang...");
        System.out.println(test);

        return SUCCESS;
    }

    public List<Book> getTest() {
        return test;
    }

    public void setTest(List<Book> test) {
        this.test = test;
    }
}
