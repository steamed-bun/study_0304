package com.xiyou.dao.impl;

import java.util.List;

import com.xiyou.dao.ShopDAO;
import com.xiyou.domain.City;
import com.xiyou.domain.County;
import com.xiyou.domain.Province;
import com.xiyou.domain.Shop;
import org.springframework.stereotype.Repository;

@Repository("shopDAOImpl")
public class ShopDAOImpl extends BaseDAOImpl implements ShopDAO {

	@Override
	public String addShop(String selId,Shop shop) {
		String shopId;
		if(shop.getShopId() == null){
			shop.setEstablished(System.currentTimeMillis());
			shop.setShopImage("D:/study/shopImage/00.png");
			shopId = getSession().save(shop).toString();
			String hql = "UPDATE Seller s SET s.shop = :shopId WHERE s.selId = :selId";
			getSession().createQuery(hql).setString("shopId", shopId).setString("selId",selId).executeUpdate();
		}else{
			shopId = shop.getShopId().toString();
			getSession().saveOrUpdate(shop);
		}
		return shopId;
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
		System.out.println(shop);
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
	public List<Province> selectProvinces() {
		String hql = "from Province";
		
		@SuppressWarnings("unchecked")
		List<Province> list = getSession().createQuery(hql).list();
		return list;
	}

	@Override
	public List<City> selectCity(String provinceId) {
		String hql = "from City c left outer join fetch c.province WHERE c.province = :provinceId";

		@SuppressWarnings("unchecked")
		List<City> list = getSession().createQuery(hql).setString("provinceId", provinceId).list();
		return list;
	}

	@Override
	public List<County> selectCounty(String cityId) {
		String hql = "from County c left outer join fetch c.city " +
				"LEFT OUTER JOIN FETCH c.city.province " +
				"WHERE c.city = :cityId";
		
		@SuppressWarnings("unchecked")
		List<County> list = getSession().createQuery(hql).setString("cityId", cityId).list();
		System.out.println("Impl-->" + list);//不能删,防止懒加载..
		return list;
	}

	@Override
	public void delete(String shopId) {
		String hql = "DELETE Shop s WHERE s.shopId = :shopId";
		getSession().createQuery(hql).setString("shopId", shopId).executeUpdate();
	}
	
	

}
 