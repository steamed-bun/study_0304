package com.xiyou.domain;

public class Shop {

	private Integer shopId;
	private String shopName;
	private String notice;
	private long established;
	private int shopGrade;
	private Province province;
	private City city;
	private County county;
	private String street;
	private String shopImage;

	public Integer getShopId() {
		return shopId;
	}

	public void setShopId(Integer shopId) {
		this.shopId = shopId;
	}

	public String getShopName() {
		return shopName;
	}

	public void setShopName(String shopName) {
		this.shopName = shopName;
	}

	public String getNotice() {
		return notice;
	}

	public void setNotice(String notice) {
		this.notice = notice;
	}

	public long getEstablished() {
		return established;
	}

	public void setEstablished(long established) {
		this.established = established;
	}

	public int getShopGrade() {
		return shopGrade;
	}

	public void setShopGrade(int shopGrade) {
		this.shopGrade = shopGrade;
	}

	public Province getProvince() {
		return province;
	}

	public void setProvince(Province province) {
		this.province = province;
	}

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}

	public County getCounty() {
		return county;
	}

	public void setCounty(County county) {
		this.county = county;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getShopImage() {
		return shopImage;
	}

	public void setShopImage(String shopImage) {
		this.shopImage = shopImage;
	}

	public static Shop getShop(){

		Shop shop = new Shop();
		shop.setNotice("他很懒...");
		shop.setEstablished(System.currentTimeMillis());
		shop.setShopGrade(0);
		shop.setShopName("快来开店啦...");
		shop.setProvince(new Province(1));
		shop.setCity(new City(1));
		shop.setCounty(new County(1));
		shop.setStreet("子午大道");
		shop.setShopImage("http://localhost:8090/study/shopImage/00.pnng");
		return shop;
	}

	public Shop(Integer shopId, String shopName, String notice,
			long established, int shopGrade, Province province, City city,
			County county, String street, String shopImage) {
		super();
		this.shopId = shopId;
		this.shopName = shopName;
		this.notice = notice;
		this.established = established;
		this.shopGrade = shopGrade;
		this.province = province;
		this.city = city;
		this.county = county;
		this.street = street;
		this.shopImage = shopImage;
	}

	@Override
	public String toString() {
		return "Shop [shopId=" + shopId + ", shopName=" + shopName
				+ ", notice=" + notice + ", established=" + established
				+ ", shopGrade=" + shopGrade + ", province=" + province
				+ ", city=" + city + ", county=" + county + ", street="
				+ street + ", shopImage=" + shopImage + "]";
	}

	public Shop(Integer shopId) {
		this.shopId = shopId;
	}

	public Shop() {
		super();
	}

}
