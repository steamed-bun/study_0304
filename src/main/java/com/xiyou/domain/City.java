package com.xiyou.domain;

public class City {

	private Integer cityId;
	private String cityName;
	private Province province;

	public City(Integer cityId) {
		this.cityId = cityId;
	}

	public City(Integer cityId, String cityName, Province province) {
		this.cityId = cityId;
		this.cityName = cityName;
		this.province = province;
	}

	@Override
	public String toString() {
		return "City [cityId=" + cityId + ", cityName=" + cityName
				+ ", province=" + province + "]";
	}

	public City(Integer cityId, String cityName) {
		super();
		this.cityId = cityId;
		this.cityName = cityName;
	}

	public City() {
		super();
	}

	public Integer getCityId() {
		return cityId;
	}

	public void setCityId(Integer cityId) {
		this.cityId = cityId;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public Province getProvince() {
		return province;
	}

	public void setProvince(Province province) {
		this.province = province;
	}

}
