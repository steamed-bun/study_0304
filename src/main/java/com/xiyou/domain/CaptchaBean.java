package com.xiyou.domain;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;

public class CaptchaBean implements Serializable {
    private static final long serialVersionUID = -6899449808870184566L;
    private String username;
    private String token;
    private String uuid;
    private String captcha;
    private Date createTime;

    public CaptchaBean() {
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUuid() {
        return this.uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getCaptcha() {
        return this.captcha;
    }

    public void setCaptcha(String captcha) {
        this.captcha = captcha;
    }

    public Date getCreateTime() {
        return this.createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public boolean check(String captcha) {
        return this.captcha.equals(captcha);
    }

    public boolean expired() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(12, -30);
        return calendar.getTime().getTime() >= this.createTime.getTime();
    }
}

