package com.xiyou.service;

import com.xiyou.domain.AuthenticatorImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service("emailService")
public class EmailService {

    @Value("#{prop.from}")
    private String from;
    @Value("#{prop.password}")
    private String password;
    @Value("#{prop['mail.smtp.host']}")
    private String host;
    @Value("#{prop['mail.smtp.auth']}")
    private String auth;

    public void sendEmail(String to,String verifiCode){
        Properties properties = new Properties();
        properties.setProperty("mail.smtp.host",host);
        properties.setProperty("mail.smtp.auth",auth);
        System.out.println("send");
        Session session = Session.getDefaultInstance(properties,new AuthenticatorImpl(from,password));
        MimeMessage message = new MimeMessage(session);
        try {
            message.setFrom(new InternetAddress(from));
            // Set To: 头部头字段
            message.setRecipient(Message.RecipientType.TO,new InternetAddress(to));
            message.setSubject("验证码");
//          message.setContent("<h1>Test<h1><br><a href=\"http://localhost:8090/activation.jsp?activationCode="+activationCode+"\">dji</a>","text/html;charset=UTF-8");
//          message.setText("<h1>Test<h1>");
            message.setContent(verifiCode,"text/html;charset=UTF-8");
            Transport.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

}
