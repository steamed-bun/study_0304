package com.xiyou.dao.impl;

import com.xiyou.dao.UserDAO;
import com.xiyou.domain.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:applicationContext-beans.xml","classpath:applicationContext.xml"})
public class UserDAOImplTest {

    @Autowired
    private UserDAO userDAO;

    @Test
    public void testGetUserById() throws Exception {

    }

    @Transactional
    @Test
    public void testGetUser() throws Exception {
        System.out.println(userDAO.getUser("12@","123"));
    }

    @Test
    public void testAddUser() throws Exception {
        User user = new User();
        user.setUserSex("nv");
        System.out.println(user);
        userDAO.addUser(user);
    }

    @Test
    public void testDeleteUser() throws Exception {

    }
}