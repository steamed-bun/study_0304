package com.xiyou.dao;

import com.xiyou.domain.Address;

import java.util.List;

public interface AddressDAO {

    /**
     * 获取默认地址
     * @param userId
     * @return
     */
    Address getDefAddress(String userId);

    Address getAddressById(Integer addressId);

    /**
     * 删除一条address记录
     * @param addressId addressId
     */
    void deleteAddress(Integer addressId);

    /**
     * 获取当前用户的所以地址
     * @param userId userId
     * @return addresses
     */
    List<Address> getAddressByUserId(String userId);

    void saveOrUpdateAddress(Address address);

}
