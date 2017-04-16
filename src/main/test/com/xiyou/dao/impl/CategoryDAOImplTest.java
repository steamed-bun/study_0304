package com.xiyou.dao.impl;

import com.xiyou.dao.CategoryDAO;
import com.xiyou.domain.Category;
import com.xiyou.domain.Shop;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.Assert.*;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:applicationContext-beans.xml","classpath:applicationContext.xml"})
public class CategoryDAOImplTest {

    @Autowired
    private CategoryDAO categoryDAO;

    //Service
    @Transactional
    @Test
    public void testGetCategories() throws Exception {
        System.out.println(categoryDAO.getCategories());
    }

    @Transactional
    @Test
    public void testGetSonCategoryById() throws Exception {
        System.out.println(categoryDAO.getSonCategoryByPId("0"));
    }
}