package com.xiyou.domain;

public class User {

	private Integer userId;
	private String userName;
	private String userPassword;
	private int userAge;
	private String userWeiXin;
	private String userImage;
	private String userSex;
	private String userIdCard;

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public int getUserAge() {
		return userAge;
	}

	public void setUserAge(int userAge) {
		this.userAge = userAge;
	}

	public String getUserWeiXin() {
		return userWeiXin;
	}

	public void setUserWeiXin(String userWeiXin) {
		this.userWeiXin = userWeiXin;
	}

	public String getUserImage() {
		return userImage;
	}

	public void setUserImage(String userImage) {
		this.userImage = userImage;
	}

	public String getUserSex() {
		return userSex;
	}

	public void setUserSex(String userSex) {
		this.userSex = userSex;
	}

	public String getUserIdCard() {
		return userIdCard;
	}

	public void setUserIdCard(String userIdCard) {
		this.userIdCard = userIdCard;
	}

	public User(Integer userId, String userName, String userPassword,
			int userAge, String userWeiXin, String userImage, String userSex,
			String userIdCard) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.userPassword = userPassword;
		this.userAge = userAge;
		this.userWeiXin = userWeiXin;
		this.userImage = userImage;
		this.userSex = userSex;
		this.userIdCard = userIdCard;
	}

	public User() {
		super();
	}

}
