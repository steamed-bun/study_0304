package com.xiyou.domain;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

/**
 * 此类主要是为了设置发件人的姓名和登录密码
 */
public class AuthenticatorImpl extends Authenticator {

    private String userName;
    private String password;

    @Override
    protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(userName,password); //发件人邮件用户名、密码;
    }

    public AuthenticatorImpl(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }
}
