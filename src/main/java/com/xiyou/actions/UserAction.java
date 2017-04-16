package com.xiyou.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Preparable;
import com.xiyou.domain.Seller;
import com.xiyou.domain.User;
import com.xiyou.service.UserService;
import org.apache.struts2.interceptor.SessionAware;
import org.apache.struts2.json.annotations.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.Map;


@Controller("userAction")
public class UserAction extends ActionSupport implements ModelDriven<User>,
        SessionAware,Preparable {
//

    private String status;
    private User user;
    private String userId;
    private String chose;
    private Map<String, Object> session;


    @Autowired
    private UserService userService;

    //注册所需

    /**
     * 已测
     * url:user-addUser.action?user.userName=你好&user.userPassword=123asd&user.email=123@qq.com&userId=
     * 可以直接将user返回!
     */
    public String addUser(){
        if(userId.equals("")){
            user.setUserImage("UserImageURL");
            user.setUserWeiXin("UserWeiXinURL");
            userId = userService.addUser(user);
            session.put("userId", userId);
        }else {
            userService.addUser(user);
        }
        return "addUser";
    }

    public void prepareAddUser(){
        if(userId.equals("")){
            user = new User();
        }else {
            user = userService.getUserById(userId);
        }
    }

    //登录、修改所需

    /**
     * 已测
     * 1、登录方法  url: user-sellectUser.action?user.email=12@&user.userPassword=123
     * 需传入seller.selTel 和 seller.selPassword
     * 2、注册完 或 更新完 查找显示seller的信息
     * 登录url：user-sellectUser.action
     * 更新url：user-sellectUser.action?chose=CHOSE
     * @return status {success: yes} {error: no} 会返回到data中
     */
    public String sellectUser(){
        if(chose == null){
            this.setStatus("yes");
            System.out.println("刚进来-->" + status);
            this.user = userService.getUser(user.getEmail(),user.getUserPassword());
            System.out.println(user);
            if (user != null){
                if(session.get("userId") == null){
                    session.put("userId", user.getUserId());
                }
            }else {
                status = "no";
            }
            System.out.println(status);
        }else{
            this.user = userService.getUserById(session.get("userId").toString());
            if (user == null){
                status = "no";
            }
        }
        return "sellectUser";
    }

    public void prepareSellectUser(){
        if(userId == null){
            user = new User();
        }else {
            user = userService.getUserById(userId);
        }
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

    public User getUser() {
        return user;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @JSON(name = "status")
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setChose(String chose) {
        this.chose = chose;
    }
}
