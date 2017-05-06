package com.xiyou.dao;

import com.xiyou.domain.User;

public interface UserDAO {

    /**
     * 修改user的图片url
     * @param userImage userImage
     * @param userId userId
     * @return url
     */
    String updateUserImage(String userImage, String userId);

    /**
     * 通过id获得User对象
     * @param userId
     * @return
     */
    User getUserById(String userId);

    /**
     * 已测
     * user login
     * @param email
     * @param userPassword
     * @return
     */
    User getUser(String email, String userPassword);

    /**
     * 已测
     * 添加一个User,或修改User
     * @param user
     * @return
     */
    void addUser(User user);

    /**
     * 已测
     * delete
     * @param userId
     */
    void deleteUser(String userId);

}
