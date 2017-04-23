package com.xiyou.domain;

public class Province {

	private Integer provinceId;
	private String provinceName;

	public Province(Integer provinceId) {
		this.provinceId = provinceId;
	}

	public Province() {
	}

	public Integer getProvinceId() {
		return provinceId;
	}

	public void setProvinceId(Integer provinceId) {
		this.provinceId = provinceId;
	}

	public String getProvinceName() {
		return provinceName;
	}

	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}

	@Override
	public String toString() {
		return "Province [provinceId=" + provinceId + ", provinceName="
				+ provinceName + "]";
	}

	
}
