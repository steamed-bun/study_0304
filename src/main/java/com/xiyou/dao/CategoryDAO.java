package com.xiyou.dao;

import com.xiyou.domain.Category;

import java.util.List;

public interface CategoryDAO {

    /**
     * 已测
     * 获取所有类型
     * @return
     */
    List<Category> getCategories();

    /**
     * 已测
     * 根据PId 查找所有的子类类型
     * @param categoryPId
     * @return
     */
    List<Category> getSonCategoryByPId(String categoryPId);

}
