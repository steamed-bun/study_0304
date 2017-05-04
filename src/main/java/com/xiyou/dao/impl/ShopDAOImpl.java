package com.xiyou.dao.impl;

import com.xiyou.dao.ShopDAO;
import com.xiyou.domain.Shop;
import org.springframework.stereotype.Repository;

@Repository("shopDAOImpl")
public class ShopDAOImpl extends BaseDAOImpl implements ShopDAO {

	private static final String SHOP_IMAGE_URL = "http://localhost:8080/study/shopImage/";

	@Override
	public void addShop(Shop shop) {
		getSession().saveOrUpdate(shop);
	}

	@Override
	public Shop selectShop(String shopId){
		//String hql = "FROM Shop s left outer join fetch s.province left outer join fetch s.city"
			//	+ "left outer join fetch s.county WHERE s.shopId = :shopId";
		String hql = "FROM Shop s LEFT OUTER JOIN FETCH s.province " +
				"LEFT OUTER JOIN FETCH s.city " +
				"LEFT OUTER JOIN FETCH s.county " +
				"WHERE s.shopId = :shopId";
		Shop shop = (Shop) getSession().createQuery(hql).setString("shopId", shopId).uniqueResult();
		return shop;
	}

	@Override
	public Shop getShopByShopId(String shopId) {
		String hql = "FROM Shop s LEFT OUTER JOIN FETCH s.province " +
				"LEFT OUTER JOIN FETCH s.city " +
				"LEFT OUTER JOIN FETCH s.county " +
				"WHERE s.shopId = :shopId";
		return (Shop)getSession().createQuery(hql).setString("shopId", shopId).uniqueResult();
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
}
 