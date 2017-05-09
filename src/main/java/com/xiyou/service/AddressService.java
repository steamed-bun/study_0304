package com.xiyou.service;

import com.xiyou.dao.AddressDAO;
import com.xiyou.domain.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {

    @Autowired
    private AddressDAO addressDAO;

    public void deleteAddress(Integer addressId){
        addressDAO.deleteAddress(addressId);
    }

    public List<Address> getAddressByUserId(Integer userId){
        return addressDAO.getAddressByUserId(userId);
    }

    public void saveOrUpdateAddress(Address address){
        addressDAO.saveOrUpdateAddress(address);
    }

}
