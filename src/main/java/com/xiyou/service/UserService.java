package com.xiyou.service;

import com.xiyou.dao.impl.UserDAOImpl;
import com.xiyou.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserService {

    @Autowired
    private UserDAOImpl userDAO;

    public User getUserById(String userId){
        return userDAO.getUserById(userId);
    }

    public String addUser(User user){
        return userDAO.addUser(user);
    }

    public User getUser(String email, String userPassword){
        return userDAO.getUser(email, userPassword);
    }

    public void deleteUser(String userId){
        userDAO.deleteUser(userId);
    }
}
