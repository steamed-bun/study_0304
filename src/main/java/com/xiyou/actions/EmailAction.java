package com.xiyou.actions;

import com.xiyou.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller("emialAction")
public class EmailAction {

    private String receiver;
    private String verifiCode;
    @Autowired
    private EmailService emailService;

    public void sendEmail(){
        emailService.sendEmail(receiver,verifiCode);
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
