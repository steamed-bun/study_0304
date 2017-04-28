package com.xiyou.dao.impl;

import com.xiyou.dao.SellerDAO;
import com.xiyou.domain.Seller;
import com.xiyou.domain.Shop;
import org.springframework.stereotype.Repository;

@Repository("sellerDAOImpl")
public class SellerDAOImpl extends BaseDAOImpl implements SellerDAO {

	private static final String SELLER_IMAGE_URL = "http://localhost:8090/study/selImage";
	private static final String SELLER_WEIXIN_URL = "http://localhost:8090/study/selWeiXin/";

/*	@Override
	public String addSeller(Seller seller) {
		String selId;
		if(seller.getSelId() == null){
			seller.setSelImage("study/selImage/00.png");
			seller.setSelWeiXin("study/selWeiXin/00.png");
			seller.setShop(new Shop(1));
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
	}*/


	@Override
	public void addSeller(Seller seller) {
		getSession().saveOrUpdate(seller);
	}

	@Override
	public boolean validateTel(String selTelTem) {
		String hql ="FROM Seller s WHERE s.selTel = :selTelTem";
		return !(getSession().createQuery(hql).setString("selTelTem",selTelTem).uniqueResult().equals(""));
	}

	@Override
	public Seller getSellerById(String selId) {
		String hql = "FROM Seller s " +
                "WHERE s.selId = :selId";
		Seller seller = (Seller)getSession().createQuery(hql).setString("selId", selId).uniqueResult();
		return seller;
}

	@Override
	public Seller getSellerByEmial(String selEmail, String password) {
		String hql = "FROM Seller s " +
				"WHERE s.selTel = :selEmail AND s.selPassword = :password";
		@SuppressWarnings("unchecked")
		Seller seller = (Seller) getSession().createQuery(hql).setString("selEmail",selEmail)
				.setString("password",password).uniqueResult();
		return seller;
	}


	@Override
	public String updateSelImage(String selImage,String selId) {
		selImage = SELLER_IMAGE_URL + selImage;
		String hql = "UPDATE Seller s SET s.selImage = :selImage WHERE s.selId = :selId";
		getSession().createQuery(hql).setString("selImage", selImage).setString("selId", selId).executeUpdate();
		return selImage;
	}

	@Override
	public String updateSelWeiXin(String selWeiXin, String selId) {
		selWeiXin = SELLER_WEIXIN_URL + selWeiXin;
		String hql = "UPDATE Seller s SET s.selWeiXin = :selWeiXin WHERE s.selId = :selId";
		getSession().createQuery(hql).setString("selWeiXin", selWeiXin).setString("selId", selId).executeUpdate();
		return selWeiXin;
	}

	@Override
	public String getWeixinURLByShopId(String shopId) {
		String hql = "SELECT s.selWeiXin FROM Seller s WHERE s.shop = :shopId";
		String weixinURL = getSession().createQuery(hql).setString("shopId",shopId).uniqueResult().toString();
		return weixinURL;
	}

}
