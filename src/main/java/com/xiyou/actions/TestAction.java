package com.xiyou.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.xiyou.domain.Book;
import com.xiyou.domain.Seller;
import com.xiyou.service.BookService;
import com.xiyou.service.SellerService;
import com.xiyou.service.UserService;
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

    @Autowired
    private UserService userService;

    @Autowired
    private SellerService sellerService;

    private Map<String, Object> session;
    private Map<String, Object> dataMap;
    private String email;
    private String password;
    private Integer role; //{0:user 1:seller}

    /**
     * 已测
     * 重置密码
     * test-updatePassword.action?email=12@&password=testupdate&role=0
     * test-updatePassword.action?email=5141562689@qq.com&password=testupdate&role=1
     * @return
     */
    public String updatePassword(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        if (role.equals(0)){
            int count = userService.getUserByEmail(email);
            if (count == 1){
                userService.updatePassword(email, password);
            }else {
                dataMap.put("message","user无此用户");
                dataMap.put("status","no");
            }
        }else {
            System.out.println("seller update");
            int count = sellerService.getSelByEmail(email);
            if (count == 1){
                sellerService.updatePassword(email, password);
            }else {
                dataMap.put("message","seller无此用户");
                dataMap.put("status","no");
            }
        }
        return SUCCESS;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }

    public Map<String, Object> getDataMap() {
        return dataMap;
    }

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }
}
