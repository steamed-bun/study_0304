package com.xiyou.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.xiyou.domain.Book;
import com.xiyou.service.BookService;
import com.xiyou.util.BookStoreWebUtils;
import org.apache.commons.io.FileUtils;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class TestAction extends ActionSupport implements SessionAware{

    private static final String BOOK_IMAGES_URL = "F:/tomcat8.0/webapps/study/book_Images/";

    Map<String, Object> session;
    private Map<String, Object> dataMap;
    private List<File> images = new ArrayList<File>(5);
    private List<Book> test = new ArrayList<Book>();

    @Autowired
    private BookService bookService;

    String path;

    public String kang() throws Exception{

        return SUCCESS;
    }

    public List<Book> getTest() {
        return test;
    }

    public void setTest(List<Book> test) {
        this.test = test;
    }

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }
}
