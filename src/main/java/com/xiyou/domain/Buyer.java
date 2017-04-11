package com.xiyou.domain;


public class Buyer {

    private Integer buyerId;
    private String buyerName;//昵称
    private String buyerPassword;//密码
    private String buyerMail;//邮箱
    private String buyerImage;//头像



    public Integer getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(Integer buyerId) {
        this.buyerId = buyerId;
    }

    public String getBuyerName() {
        return buyerName;
    }

    public void setBuyerName(String buyerName) {
        this.buyerName = buyerName;
    }

    public String getBuyerPassword() {
        return buyerPassword;
    }

    public void setBuyerPassword(String buyerPassword) {
        this.buyerPassword = buyerPassword;
    }

    public String getBuyerMail() {
        return buyerMail;
    }

    public void setBuyerMail(String buyerMail) {
        this.buyerMail = buyerMail;
    }

    public String getBuyerImage() {
        return buyerImage;
    }

    public void setBuyerImage(String buyerImage) {
        this.buyerImage = buyerImage;
    }

    @Override
    public String toString() {
        return "Buyer{" +
                "buyerId=" + buyerId +
                ", buyerName='" + buyerName + '\'' +
                ", buyerPassword='" + buyerPassword + '\'' +
                ", buyerMail='" + buyerMail + '\'' +
                ", buyerImage='" + buyerImage + '\'' +
                '}';
    }
}
