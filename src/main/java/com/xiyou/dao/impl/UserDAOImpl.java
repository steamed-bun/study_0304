package com.xiyou.dao.impl;

import com.xiyou.dao.UserDAO;
import com.xiyou.domain.User;
import org.springframework.stereotype.Repository;

@Repository
public class UserDAOImpl extends BaseDAOImpl implements UserDAO {


    @Override
    public User getUserById(String userId) {
        String hql = "FROM User u WHERE u.id = :userId";
        return (User) getSession().createQuery(hql).setString("userId",userId).uniqueResult();
    }

    @Override
    public String addUser(User user) {
        String userId;
        if (user.getUserId() == null){
            user.setUserImage("");
            user.setUserWeiXin("");
            userId = getSession().save(user).toString();
        }else {
            userId = user.getUserId().toString();
            getSession().saveOrUpdate(user);
        }
        return userId;
    }

    @Override
    public void deleteUser(String userId) {
        String hql = "DELETE FROM User u WHERE u.userId = :userId";
        getSession().createQuery(hql).setString("userId",userId).executeUpdate();
    }
}
