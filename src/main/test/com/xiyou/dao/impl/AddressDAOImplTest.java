package com.xiyou.dao.impl;

import com.xiyou.dao.AddressDAO;
import com.xiyou.domain.Address;
import com.xiyou.domain.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:applicationContext-beans.xml","classpath:applicationContext.xml"})
public class AddressDAOImplTest {

    @Autowired
    private AddressDAO addressDAO;

    @Test
    @Transactional
    public void testDeleteAddress(){
        addressDAO.deleteAddress(1);
    }

    @Test
    @Transactional
    public void testGetAddressByUserId(){
        java.util.List<Address> addresses = addressDAO.getAddressByUserId("1");
    }

    @Test
    @Transactional
    public void testSaveOrUpdateAddress() throws Exception {
    }
}