package com.xiyou.domain;

public class Address {

	private Integer addressId;
	private Province province;
	private County county;
	private City city;
	private String street;
	private Buyer buyer;

	public Buyer getBuyer() {
		return buyer;
	}

	public void setBuyer(Buyer buyer) {
		this.buyer = buyer;
	}

	public Integer getAddressId() {
		return addressId;
	}

	public void setAddressId(Integer addressId) {
		this.addressId = addressId;
	}

	public Province getProvince() {
		return province;
	}

	public void setProvince(Province province) {
		this.province = province;
	}

	public County getCounty() {
		return county;
	}

	public void setCounty(County county) {
		this.county = county;
	}

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public Address(Integer addressId, Province province, County county, City city, String street, Buyer buyer) {
		this.addressId = addressId;
		this.province = province;
		this.county = county;
		this.city = city;
		this.street = street;
		this.buyer = buyer;
	}

	public Address() {
	}
}
