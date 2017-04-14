package com.xiyou.actions;

import com.xiyou.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.Random;

@Controller("emialAction")
public class EmailAction {

    //四位数对应1000
    private static final int min = 1000;

    private String receiver;
    private String verifiCode;
    @Autowired
    private EmailService emailService;

    public String sendEmail(){
        verifiCode = (new Random().nextInt(min)+min) +"";
        emailService.sendEmail(receiver,verifiCode);
        return "sendEmail";
    }
    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getVerifiCode() {
        return verifiCode;
    }

    public void setVerifiCode(String verifiCode) {
        this.verifiCode = verifiCode;
    }
}
