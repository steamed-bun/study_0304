package com.xiyou.dao;

import com.xiyou.domain.Manager;

public interface ManagerDAO {

    /**
     * 登陆
     * @param  managerEmail managerEmail
     * @param password password
     * @return manager
     */
    Manager getMangerByEmail(String managerEmail, String password);

    /**
     * 已测
     * 修改密码
     * @param manager manager
     */
    void updateManager(Manager manager);

    /**
     * 已测
     * 获取一个manager
     * @param managerId managerId
     * @return manager
     */
    Manager getManagerById(Integer managerId);

}
