package com.xiyou.dao.impl;

import com.xiyou.dao.ManagerDAO;
import com.xiyou.domain.Manager;
import org.springframework.stereotype.Repository;

@Repository("managerDAOImpl")
public class ManagerDAOImpl extends BaseDAOImpl implements ManagerDAO{

    @Override
    public Manager getMangerByEmail(String managerEmail, String password) {
        String hql = "FROM Manager m WHERE m.managerEmail = :managerEmail " +
                "AND m.password = :password";
        Manager manager = (Manager) getSession().createQuery(hql)
                .setString("managerEmail", managerEmail)
                .setString("password", password).uniqueResult();
        return manager;
    }

    @Override
    public void updateManager(Manager manager) {
        getSession().saveOrUpdate(manager);
    }

    @Override
    public Manager getManagerById(Integer managerId) {
        String hql = "FROM Manager m WHERE m.managerId = :managerId";
        Manager manager = (Manager) getSession().createQuery(hql)
                .setInteger("managerId", managerId).uniqueResult();
        return manager;
    }
}
