package com.xiyou.domain;

public class Category {

	private Integer categoryId;
	private String categoryName;
	private Integer categoryPId;

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Integer getCategoryPId() {
		return categoryPId;
	}

	public void setCategoryPId(Integer categoryPId) {
		this.categoryPId = categoryPId;
	}

	@Override
	public String toString() {
		return "Category [categoryId=" + categoryId + ", categoryName="
				+ categoryName + ", categoryPId=" + categoryPId + "]";
	}

	public Category() {
		super();
	}

	public Category(Integer categoryId, String categoryName, Integer categoryPId) {
		super();
		this.categoryId = categoryId;
		this.categoryName = categoryName;
		this.categoryPId = categoryPId;
	}

}
