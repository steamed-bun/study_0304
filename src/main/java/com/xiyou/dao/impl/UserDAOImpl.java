package com.xiyou.dao.impl;

import com.xiyou.dao.UserDAO;
import com.xiyou.domain.User;
import org.springframework.stereotype.Repository;

@Repository("userDAOImpl")
public class UserDAOImpl extends BaseDAOImpl implements UserDAO {

    private static final String USER_IMAGE_URL = "http://localhost:8080/study/userImage/";

    @Override
    public String updateUserImage(String userImage, String userId) {
        userImage = USER_IMAGE_URL + userImage;
        String hql = "UPDATE User u SET u.userImage = :userImage " +
                "WHERE u.userId = :userId";
        getSession().createQuery(hql)
                .setString("userImage", userImage)
                .setString("userId", userId)
                .executeUpdate();
        return userImage;
    }

    @Override
    public User getUserById(String userId) {
        String hql = "FROM User u WHERE u.id = :userId";
        return (User) getSession().createQuery(hql).setString("userId",userId).uniqueResult();
    }

    @Override
    public User getUser(String email, String userPassword) {
        String hql = "FROM User u WHERE u.email = :email AND u.userPassword = :userPassword";
        User user = (User)getSession().createQuery(hql).setString("email",email)
                .setString("userPassword",userPassword).uniqueResult();
        return user;
    }

    @Override
    public void addUser(User user) {
        getSession().saveOrUpdate(user);
    }

    @Override
    public void deleteUser(String userId) {
        String hql = "DELETE FROM User u WHERE u.userId = :userId";
        getSession().createQuery(hql).setString("userId",userId).executeUpdate();
    }
}
