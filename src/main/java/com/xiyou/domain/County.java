package com.xiyou.domain;

public class County {

	private Integer countyId;
	private String countyName;
	private City city;

	public Integer getCountyId() {
		return countyId;
	}

	public void setCountyId(Integer countyId) {
		this.countyId = countyId;
	}

	public String getCountyName() {
		return countyName;
	}

	public void setCountyName(String countyName) {
		this.countyName = countyName;
	}

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}

	public County(Integer countyId, String countyName, City city) {
		super();
		this.countyId = countyId;
		this.countyName = countyName;
		this.city = city;
	}

	@Override
	public String toString() {
		return "County [countyId=" + countyId + ", countyName=" + countyName
				+ ", city=" + city + "]";
	}

	public County() {
		super();
	}

}
