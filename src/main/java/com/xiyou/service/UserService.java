package com.xiyou.service;

import com.xiyou.dao.UserDAO;
import com.xiyou.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserService {

    @Autowired
    private UserDAO userDAO;

    public User getUserForAddress(String userId){
        return userDAO.getUserForAddress(userId);
    }

    public void updatePassword(String email, String password){
        userDAO.updatePassword(email, password);
    }

    public int getUserByEmail(String email){
        return (int) userDAO.getUserByEmail(email);
    }

    public String updateUserImage(String userImage, String userId){
        return userDAO.updateUserImage(userImage, userId);
    }

    public User getUserById(String userId){
        return userDAO.getUserById(userId);
    }

    public void addUser(User user) throws Exception{
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
