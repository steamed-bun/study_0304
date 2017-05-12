package com.xiyou.service;

import com.xiyou.dao.ManagerDAO;
import com.xiyou.domain.Manager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("managerService")
public class ManagerService {

    @Autowired
    private ManagerDAO managerDAO;

    public Manager getMangerByEmail(String managerEmail, String password){
        return managerDAO.getMangerByEmail(managerEmail, password);
    }

    public void updateManager(Manager manager){
        managerDAO.updateManager(manager);
    }

    public Manager getManagerById(Integer managerId){
        return managerDAO.getManagerById(managerId);
    }

}
