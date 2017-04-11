package com.xiyou.domain;

public class Seller {

	private Integer selId;
	private String selName;
	private String selPassword;
	private int selAge;
	private String selSex;
	private String selIdCard;
	private String selImage;
	private String selWeiXin;
	private String selTel;
	private Shop shop;

	public Integer getSelId() {
		return selId;
	}

	public void setSelId(Integer selId) {
		this.selId = selId;
	}

	public String getSelName() {
		return selName;
	}

	public void setSelName(String selName) {
		this.selName = selName;
	}

	public String getSelPassword() {
		return selPassword;
	}

	public void setSelPassword(String selPassword) {
		this.selPassword = selPassword;
	}

	public int getSelAge() {
		return selAge;
	}

	public void setSelAge(int selAge) {
		this.selAge = selAge;
	}

	public String getSelSex() {
		return selSex;
	}

	public void setSelSex(String selSex) {
		this.selSex = selSex;
	}

	public String getSelIdCard() {
		return selIdCard;
	}

	public void setSelIdCard(String selIdCard) {
		this.selIdCard = selIdCard;
	}

	public String getSelImage() {
		return selImage;
	}

	public void setSelImage(String selImage) {
		this.selImage = selImage;
	}

	public String getSelWeiXin() {
		return selWeiXin;
	}

	public void setSelWeiXin(String selWeiXin) {
		this.selWeiXin = selWeiXin;
	}

	public String getSelTel() {
		return selTel;
	}

	public void setSelTel(String selTel) {
		this.selTel = selTel;
	}

	public Shop getShop() {
		return shop;
	}

	public void setShop(Shop shop) {
		this.shop = shop;
	}

	public Seller(Integer selId, String selName, String selPassword,
			int selAge, String selSex, String selIdCard, String selImage,
			String selWeiXin, String selTel) {
		super();
		this.selId = selId;
		this.selName = selName;
		this.selPassword = selPassword;
		this.selAge = selAge;
		this.selSex = selSex;
		this.selIdCard = selIdCard;
		this.selImage = selImage;
		this.selWeiXin = selWeiXin;
		this.selTel = selTel;
	}

	public Seller(Integer selId, String selName, String selPassword,
			int selAge, String selSex, String selIdCard, String selImage,
			String selWeiXin, String selTel, Shop shop) {
		super();
		this.selId = selId;
		this.selName = selName;
		this.selPassword = selPassword;
		this.selAge = selAge;
		this.selSex = selSex;
		this.selIdCard = selIdCard;
		this.selImage = selImage;
		this.selWeiXin = selWeiXin;
		this.selTel = selTel;
		this.shop = shop;
	}

	public Seller(Shop shop) {
		this.shop = shop;
	}

	public Seller() {
		super();
	}

    @Override
    public String toString() {
        return "Seller{" +
                "selId=" + selId +
                ", selName='" + selName + '\'' +
                ", selPassword='" + selPassword + '\'' +
                ", selAge=" + selAge +
                ", selSex='" + selSex + '\'' +
                ", selIdCard='" + selIdCard + '\'' +
                ", selImage='" + selImage + '\'' +
                ", selWeiXin='" + selWeiXin + '\'' +
                ", selTel='" + selTel + '\'' +
                ", shop=" + shop +
                '}';
    }
}
