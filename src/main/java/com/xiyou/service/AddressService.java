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

    public Address getDefAddress(String userId){
        return addressDAO.getDefAddress(userId);
    }

    public Address getAddressById(Integer addressId){
        return addressDAO.getAddressById(addressId);
    }

    public void deleteAddress(Integer addressId){
        addressDAO.deleteAddress(addressId);
    }

    public List<Address> getAddressByUserId(String userId){
        return addressDAO.getAddressByUserId(userId);
    }

    public void saveOrUpdateAddress(Address address){
        addressDAO.saveOrUpdateAddress(address);
    }

}
