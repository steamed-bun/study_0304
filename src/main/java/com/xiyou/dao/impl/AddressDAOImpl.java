package com.xiyou.dao.impl;


import com.xiyou.dao.AddressDAO;
import com.xiyou.domain.Address;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("addressDAOImpl")
public class AddressDAOImpl extends BaseDAOImpl implements AddressDAO {


    @Override
    public void deleteAddress(Integer addressId) {
        String hql = "DELETE Address a WHERE a.addressId = :addressId";
        getSession().createQuery(hql).setInteger("addressId", addressId).executeUpdate();
    }

    @Override
    public List<Address> getAddressByUserId(Integer userId) {
        String hql = "FROM Address a " +
                "LEFT OUTER JOIN FETCH a.province " +
                "LEFT OUTER JOIN FETCH a.city " +
                "LEFT OUTER JOIN FETCH a.county " +
                "WHERE a.user = :userId";
        @SuppressWarnings("unchecked")
        List<Address> addresses = (List<Address>) getSession().createQuery(hql)
                .setInteger("userId", userId).list();
        return addresses;
    }

    @Override
    public void saveOrUpdateAddress(Address address) {
        getSession().saveOrUpdate(address);
    }
}
