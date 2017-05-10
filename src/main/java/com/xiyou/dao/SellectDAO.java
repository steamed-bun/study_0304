package com.xiyou.dao;

import com.xiyou.domain.Category;
import com.xiyou.domain.City;
import com.xiyou.domain.County;
import com.xiyou.domain.Province;

import java.sql.SQLException;
import java.util.List;

public interface SellectDAO {

    /**
     * 已测
     * 删除子类
     * @param categoryId categoryId
     */
    void deleteCategory(Integer categoryId) throws Exception;

    /**
     * 已测
     * 添加一个子类
     * @param category category
     */
    void saveCatefgory(Category category);

    /**
     * 已测
     * 修改小类别
     * @param categoryId 类别Id
     * @param categoryName 修改的新类别
     */
    void updateCategory(String categoryId, String categoryName);

    /**
     * 已测
     * 查询省份
     * @return 查到的所有省份
     */
    List<Province> selectProvinces();

    /**
     * 已测
     * 实现不关联查询
     * @param provinceId 省份Id
     * @return 该省下的所有市
     */
    List<City> selectCity(String provinceId);

    /**
     * 已测
     * 同上
     * @param cityId 市Id
     * @return 该市下的所有县
     */
    List<County> selectCounty(String cityId);

    /**
     * 同上
     * @param categoryPId 大类别Id
     * @return 该类下的所有小类
     */
    List<Category> getCategory(String categoryPId);

    /**
     * 根据Id获取当前类别
     * @param categoryId categoryId
     * @return category
     */
    Category getCategoryBId(Integer categoryId);

}
