package com.xiyou.dao.impl;

import com.xiyou.dao.UserDAO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;


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

    }

    @Test
    public void testDeleteUser() throws Exception {

    }
}