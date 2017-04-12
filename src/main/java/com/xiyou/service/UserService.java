package com.xiyou.service;

import com.xiyou.dao.impl.UserDAOImpl;
import com.xiyou.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserDAOImpl userDAO;

    public User getUserById(String userId){
        return userDAO.getUserById(userId);
    }

    public String addUser(User user){
        return userDAO.addUser(user);
    }

    public void deleteUser(String userId){
        userDAO.deleteUser(userId);
    }
}
