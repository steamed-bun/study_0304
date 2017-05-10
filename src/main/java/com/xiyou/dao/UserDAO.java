package com.xiyou.dao;

import com.xiyou.domain.User;

public interface UserDAO {

    /**
     * 为了添加地址获取user
     * @param userId userId
     * @return user
     */
    User getUserForAddress(String userId);

    /**
     * 已测
     * 修改user密码
     * @param email
     * @param password
     */
    void updatePassword(String email, String password);

    /**
     * 已测
     * 判断是否有该用户
     * @param email
     * @return
     */
    long getUserByEmail(String email);

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
    void addUser(User user) throws Exception;

    /**
     * 已测
     * delete
     * @param userId
     */
    void deleteUser(String userId);

}
