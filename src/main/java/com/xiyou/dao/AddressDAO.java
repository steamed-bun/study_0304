package com.xiyou.dao;

import com.xiyou.domain.Address;

import java.util.List;

public interface AddressDAO {

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
    List<Address> getAddressByUserId(Integer userId);

    void saveOrUpdateAddress(Address address);

}
