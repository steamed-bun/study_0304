package com.xiyou.service;

import com.xiyou.dao.AddressDAO;
import com.xiyou.domain.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressService {

    @Autowired
    private AddressDAO addressDAO;

    public void saveOrUpdateAddress(Address address){
        addressDAO.saveOrUpdateAddress(address);
    }

}
