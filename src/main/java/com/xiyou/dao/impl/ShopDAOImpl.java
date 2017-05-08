package com.xiyou.dao.impl;

import com.xiyou.dao.ShopDAO;
import com.xiyou.domain.Book;
import com.xiyou.domain.Shop;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("shopDAOImpl")
public class ShopDAOImpl extends BaseDAOImpl implements ShopDAO {

	private static final String SHOP_IMAGE_URL = "http://localhost:8080/study/shopImage/";

	@Override
	public 	Shop getShopById(Integer shopId){
		String hql = "SELECT new Shop (s.shopId, s.shopName, s.shopGrade) FROM Shop s " +
				"WHERE s.shopId = :shopId";
		Shop shop = (Shop) getSession().createQuery(hql).setInteger("shopId", shopId).uniqueResult();
		return shop;
	}

	@Override
	public void updateShopGrade(Integer shopId, Integer shopGrade) {
		String hql = "UPDATE Shop s SET s.shopGrade = :shopGrade " +
				"WHERE s.shopId = :shopId";
		getSession().createQuery(hql).setInteger("shopGrade", shopGrade)
				.setInteger("shopId", shopId).executeUpdate();
	}

	@Override
	public String updateShopImage(String shopImage, String shopId) {
		shopImage = SHOP_IMAGE_URL + shopImage;
		String hql = "UPDATE Shop s SET s.shopImage = :shopImage WHERE s.shopId = :shopId";
		getSession().createQuery(hql).setString("shopImage", shopImage).setString("shopId", shopId).executeUpdate();
		return shopImage;
	}

	@Override
	public void delete(String shopId) {
		String hql = "DELETE Shop s WHERE s.shopId = :shopId";
		getSession().createQuery(hql).setString("shopId", shopId).executeUpdate();
	}

	@Override
	public void addShop(Shop shop) {
		getSession().saveOrUpdate(shop);
	}

	@Override
	public Shop selectShop(String shopId){
		String hql = "FROM Shop s LEFT OUTER JOIN FETCH s.province " +
				"LEFT OUTER JOIN FETCH s.city " +
				"LEFT OUTER JOIN FETCH s.county " +
				"WHERE s.shopId = :shopId";
		Shop shop = (Shop) getSession().createQuery(hql).setString("shopId", shopId).uniqueResult();
		return shop;
	}

}
 