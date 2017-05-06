package com.xiyou.service;

import com.xiyou.dao.impl.UserDAOImpl;
import com.xiyou.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserService {

    @Autowired
    private UserDAOImpl userDAO;

    public String updateUserImage(String userImage, String userId){
        return userDAO.updateUserImage(userImage, userId);
    }


    public User getUserById(String userId){
        return userDAO.getUserById(userId);
    }

    public void addUser(User user){
         userDAO.addUser(user);
    }

    public User getUser(String email, String userPassword){
        User user = userDAO.getUser(email, userPassword);
        return user;
    }

    public void deleteUser(String userId){
        userDAO.deleteUser(userId);
    }
}
