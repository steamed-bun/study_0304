package com.xiyou.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Preparable;
import com.xiyou.domain.Seller;
import com.xiyou.domain.User;
import com.xiyou.service.UserService;
import com.xiyou.util.BookStoreWebUtils;
import org.apache.struts2.interceptor.SessionAware;
import org.apache.struts2.json.annotations.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.Map;


@Controller("userAction")
public class UserAction extends ActionSupport implements ModelDriven<User>,
        SessionAware,Preparable {
//
    private static final String USER_IMAGE_URL = "http://localhost:8080/study/userImage/00.png";
    private static final String USER_WEIXIN_URL = "http://localhost:8080/study/userWeiXin/00.png";

    private String status = "yes";
    private User user;
    private String chose;
    private Map<String, Object> session;
    private Map<String, Object> dataMap;


    @Autowired
    private UserService userService;

    //注册所需

    /**
     * 已测
     * 注册url:user-addUser.action?user.userName=你好&user.userPassword=123asd&user.email=123@qq.com
     * 更新url:user-addUser.action?user.userId=32&user.userName=你好&user.userPassword=123asd&user.email=123@qq.com
     * @return status {success: yes} {error: no}
     */
    public String addUser(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        if(user.getUserId() == null){
            user.setUserImage(USER_IMAGE_URL);
            user.setUserWeiXin(USER_WEIXIN_URL);
        }
        userService.addUser(user);
        session.put("userId", user.getUserId());
        return "addUser";
    }

    public void prepareAddUser(){
        if(user.getUserId() == null){
            user = new User();
        }else {
            user = userService.getUserById(user.getUserId().toString());
        }
    }

    //登录、修改所需

    /**
     * 已测
     * 1、登录方法  url: user-sellectUser.action?chose=login&user.email=123@qq.com&user.userPassword=123asd
     * return status {success: yes} {error: no} 会返回到data中
     * 2、其它地方需要User信息时，查找显示seller的信息
     * 更新url：user-sellectUser.action?chose=CHOOSE
     * @return user 会返回到data中
     */
    public String sellectUser(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        if(chose.equals("login")){
            user = userService.getUser(user.getEmail(),user.getUserPassword());
            if (user != null){
                if(session.get("userId") == null){
                    session.put("userId", user.getUserId());
                }
            }else {
                dataMap.put("status","no");
            }
        }else{
            this.user = userService.getUserById(session.get("userId").toString());
            dataMap.put("user",user);
        }
        user = null;
        return "login";
    }

    //delete
    public String deleteUser(){
        if(session.get("userId") == null){
            userService.deleteUser(user.getUserId().toString());
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

    @JSON(serialize = false)
    public User getUser() {
        return user;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setChose(String chose) {
        this.chose = chose;
    }

    public Map<String, Object> getDataMap() {
        return dataMap;
    }
}
