package com.xiyou.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Preparable;
import com.xiyou.domain.User;
import com.xiyou.service.UserService;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller("userAction")
public class UserAction extends ActionSupport implements ModelDriven<User>,
        SessionAware,Preparable {

    private User user;
    private String userId;
    private String chose;
    private Map<String, Object> session;

    @Autowired
    private UserService userService;

    //注册所需
    public String addUser(){
        if(userId.equals("")){
            userId = userService.addUser(user);
            session.put("userId", userId);
            return "addSeller";
        }else {
            userService.addUser(user);
            return "updateSeller";
        }
    }

    public void prepareAddUser(){
        if(userId.equals("")){
            user = new User();
        }else {
            user = userService.getUserById(userId);
        }
    }

    //登录、修改所需
    public String sellectUser(){
        if(chose == null){
            this.user = userService.getUserById(user.getUserId().toString());
            if(session.get("userId") == null){
                session.put("userId", user.getUserId());
            }
        }else{
            this.user = userService.getUserById(session.get("userId").toString());
        }

        return "sellectUser";
    }

    //delete
    public String deleteUser(){
        if(session.get("userId") == null){
            userService.deleteUser(userId);
        }
        return "deleteUser";
    }


    @Override
    public User getModel() {
        return user;
    }

    @Override
    public void prepare() throws Exception {
    }

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setChose(String chose) {
        this.chose = chose;
    }
}
