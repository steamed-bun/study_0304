package com.xiyou.domain;

public class Manager {

    private Integer managerId;
    private String managerEmail;
    private String password;
    private  Integer fresh; //{首次登陆 : 0 ,  之后 : 1}

    public Manager() {
    }

    public Manager(Integer managerId, String managerEmail, String password, Integer fresh) {
        this.managerId = managerId;
        this.managerEmail = managerEmail;
        this.password = password;
        this.fresh = fresh;
    }

    public Integer getManagerId() {
        return managerId;
    }

    public void setManagerId(Integer managerId) {
        this.managerId = managerId;
    }

    public String getManagerEmail() {
        return managerEmail;
    }

    public void setManagerEmail(String managerEmail) {
        this.managerEmail = managerEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getFresh() {
        return fresh;
    }

    public void setFresh(Integer fresh) {
        this.fresh = fresh;
    }
}
