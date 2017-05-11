package com.xiyou.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Preparable;
import com.xiyou.domain.Manager;
import com.xiyou.service.ManagerService;
import com.xiyou.util.BookStoreWebUtils;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller("managerAction")
public class ManagerAction extends ActionSupport implements ModelDriven<Manager>,
        SessionAware, Preparable {

    @Autowired
    private ManagerService managerService;

    private Map<String, Object> dataMap;
    private Map<String, Object> session;
    private Manager manager;

    /**
     * 登陆
     * 已测
     * url:manager-getSellerByEmail.action?manager.password=lalala&manager.managerEmail=12@qq.com
     */
    public String getSellerByEmail(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        manager = managerService.getMangerByEmail(manager.getManagerEmail(), manager.getPassword());
        if (manager == null){
            dataMap.put("status", "no");
            dataMap.put("message", "密码或用户名错误");
            return SUCCESS;
        }
        dataMap.put("manager", manager);
        return SUCCESS;
    }

    /**
     * 已测
     * 修改密码
     * url:manager-updatePassword.action?manager.managerId=1&manager.password=asdfgh
     * {首次登陆 : 0 ,  之后 : 1}
     * @return
     */
    public String updatePassword(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        if (manager == null){
            dataMap.put("status", "no");
            dataMap.put("massage", "无该管理者账户");
            return SUCCESS;
        }
        manager.setFresh(1);
        managerService.updateManager(manager);
        return SUCCESS;
    }

    public void prepareUpdatePassword(){
        manager = managerService.getManagerById(manager.getManagerId());
    }

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }

    public Map<String, Object> getDataMap() {
        return dataMap;
    }

    @Override
    public Manager getModel() {
        return manager;
    }

    @Override
    public void prepare() throws Exception {
    }

    public Manager getManager() {
        return manager;
    }

    public void setManager(Manager manager) {
        this.manager = manager;
    }
}
