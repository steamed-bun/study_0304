package com.xiyou.dao;

import com.xiyou.domain.User;

public interface UserDAO {

    /**
     * 通过id获得User对象
     * @param userId
     * @return
     */
    User getUserById(String userId);

    /**
     * 已测
     * 添加一个User,或修改User
     * @param user
     * @return
     */
    String addUser(User user);

    /**
     * 已测
     * delete
     * @param userId
     */
    void deleteUser(String userId);

}
