package com.xiyou.dao.impl;


import com.xiyou.dao.AddressDAO;
import com.xiyou.domain.Address;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("addressDAOImpl")
public class AddressDAOImpl extends BaseDAOImpl implements AddressDAO {


    @Override
    public Address getDefAddress(String userId) {
        String hql= "FROM Address a " +
                "LEFT OUTER JOIN FETCH a.province " +
                "LEFT OUTER JOIN FETCH a.city " +
                "LEFT OUTER JOIN FETCH a.county " +
                "WHERE a.user = :userId AND a.def = 1";
        Address address = (Address) getSession().createQuery(hql)
                .setString("userId", userId).uniqueResult();
        return address;
    }

    @Override
    public Address getAddressById(Integer addressId) {
        String hql = "FROM Address a " +
                "LEFT OUTER JOIN FETCH a.province " +
                "LEFT OUTER JOIN FETCH a.city " +
                "LEFT OUTER JOIN FETCH a.county " +
                "WHERE a.addressId = :addressId ";
        Address address = (Address) getSession().createQuery(hql)
                .setInteger("addressId", addressId).uniqueResult();
        return address;
    }

    @Override
    public void deleteAddress(Integer addressId) {
        String hql = "DELETE Address a WHERE a.addressId = :addressId";
        getSession().createQuery(hql).setInteger("addressId", addressId).executeUpdate();
    }

    @Override
    public List<Address> getAddressByUserId(String userId) {
        String hql = "FROM Address a " +
                "LEFT OUTER JOIN FETCH a.province " +
                "LEFT OUTER JOIN FETCH a.city " +
                "LEFT OUTER JOIN FETCH a.county " +
                "WHERE a.user = :userId";
        @SuppressWarnings("unchecked")
        List<Address> addresses = (List<Address>) getSession().createQuery(hql)
                .setString("userId", userId).list();
        return addresses;
    }

    @Override
    public void saveOrUpdateAddress(Address address) {
        Session session = getSession();
        String hql;
        if (address.getDef().equals(1)){
            hql = "SELECT count (a.addressId) FROM Address a WHERE a.def = 1 " +
                    "AND a.user = :userId";
            Integer userId = address.getUser().getUserId();
            long count = (Long) session.createQuery(hql)
                    .setInteger("userId", userId)
                    .uniqueResult();
            if (count > 0){
                hql = "UPDATE Address a SET a.def = 0 WHERE a.user = :userId";
                session.createQuery(hql).setInteger("userId", userId)
                        .executeUpdate();
            }
        }
        getSession().saveOrUpdate(address);
    }
}
