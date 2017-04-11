package com.xiyou.dao.impl;

import com.xiyou.dao.SellerDAO;
import com.xiyou.domain.Seller;
import com.xiyou.domain.Shop;

public class SellerDAOImpl extends BaseDAOImpl implements SellerDAO {
	
	@Override
	public String addSeller(Seller seller) {
		String selId = null;
		if(seller.getSelId() == null){
			seller.setSelImage("F:/tomcat8.0/webapps/study/selImage/00.png");
			seller.setSelWeiXin("F:/tomcat8.0/webapps/study/selWeiXin/00.png");
			seller.getShop().setShopId(1);
			selId = getSession().save(seller).toString();
		}else {
			String shopId = seller.getShop().getShopId().toString();
			selId = seller.getSelId().toString();
			getSession().saveOrUpdate(seller);
			String hql = "UPDATE Seller s SET s.shop = :shopId WHERE s.selId = :selId";
			getSession().createQuery(hql)
						.setString("shopId", shopId)
						.setString("selId",selId).executeUpdate();
		}
		return selId;
	}

	@Override
	public boolean validateTel(String selTelTem) {
		String hql ="from Seller s where s.selTel = " + selTelTem; 
		return !getSession().createQuery(hql).equals("");
	}

	@Override
	public Seller selectSel(String selId) {
		String hql = "from Seller s " +
                "LEFT OUTER JOIN FETCH s.shop " +
                "LEFT OUTER JOIN FETCH s.shop.city " +
                "LEFT OUTER JOIN FETCH s.shop.county " +
                "LEFT OUTER JOIN FETCH s.shop.province " +
                "where s.selId = :selId";
		Seller seller = (Seller)getSession().createQuery(hql).setString("selId", selId).uniqueResult();

		//System.out.println(seller);
		return seller;
}

	@Override
	public void updateSelImage(String selImage,String selId) {
		selImage = "upload/seller/avatar/" + selImage;
		String hql = "UPDATE Seller s SET s.selImage = :selImage WHERE s.selId = :selId";
		getSession().createQuery(hql).setString("selImage", selImage).setString("selId", selId).executeUpdate();
	}

	@Override
	public void updateSelWeiXin(String selWeiXin, String selId) {
		selWeiXin = "D:/study/selWeiXin/" + selWeiXin;
		String hql = "UPDATE Seller s SET s.selWeiXin = :selWeiXin WHERE s.selId = :selId";
		getSession().createQuery(hql).setString("selWeiXin", selWeiXin).setString("selId", selId).executeUpdate();
	}

}
