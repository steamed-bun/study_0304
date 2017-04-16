package com.xiyou.dao.impl;

import com.xiyou.dao.CategoryDAO;
import com.xiyou.domain.Category;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class CategoryDAOImpl extends BaseDAOImpl implements CategoryDAO{

    @Override
    public List<Category> getCategories() {

        String hql = "FROM Category";
        @SuppressWarnings("unchecked")
        List<Category> list = getSession().createQuery(hql).list();
        return  list;
    }

    @Override
    public List<Category> getSonCategoryByPId(String categoryPId) {
        String hql = "FROM Category c  WHERE c.categoryPId = :categoryPId";
        @SuppressWarnings("unchecked")
        List<Category> list = (List<Category>) getSession().createQuery(hql)
                .setString("categoryPId",categoryPId).list();
        return list;
    }

}
