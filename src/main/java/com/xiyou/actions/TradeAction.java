package com.xiyou.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.xiyou.domain.Book;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class TradeAction extends ActionSupport implements SessionAware{

    private Map<String, Object> session;
    private List<Book> trades = new ArrayList<Book>();

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }
}
