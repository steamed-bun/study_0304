package com.xiyou.dao.impl;


import com.xiyou.dao.AddressDAO;
import com.xiyou.domain.Address;
import org.springframework.stereotype.Repository;

@Repository("addressDAOImpl")
public class AddressDAOImpl extends BaseDAOImpl implements AddressDAO {


    @Override
    public void saveOrUpdateAddress(Address address) {
        getSession().saveOrUpdate(address);
    }
}
