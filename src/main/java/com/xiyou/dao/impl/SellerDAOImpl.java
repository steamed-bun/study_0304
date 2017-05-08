package com.xiyou.dao.impl;

import com.xiyou.dao.SellerDAO;
import com.xiyou.domain.Seller;
import com.xiyou.domain.Shop;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("sellerDAOImpl")
public class SellerDAOImpl extends BaseDAOImpl implements SellerDAO {

	private static final String SELLER_IMAGE_URL = "http://localhost:8080/study/selImage/";
	private static final String SELLER_WEIXIN_URL = "http://localhost:8080/study/shopImage/";
	private static final int BACK_PAGE_SIZE = 3;//后台shop数量
	private static final int BASE_NUM = 0;

	@Override
	public Seller getSellerForBack(Integer shopId) {
		String hql = "SELECT new Seller (s.selId, s.selName,s.selTel, s.selIdCard, s.shop.shopId, s.shop.shopName, s.shop.shopGrade) " +
				"FROM Seller s WHERE s.shop = :shopId";
		Seller seller = (Seller) getSession().createQuery(hql).setInteger("shopId", shopId).uniqueResult();
		return seller;
	}

	@Override
	public long getTotalPageNo() {
		String hql = "SELECT count (s.selId) FROM Seller s";
		long totalPageNo = (Long) getSession().createQuery(hql)
				.uniqueResult();
		totalPageNo = (long) Math.ceil((double)totalPageNo/BACK_PAGE_SIZE);
		return totalPageNo;
	}

	@Override
	public List<Seller> getSellersForBack(Integer pageNum) {
		String hql = "SELECT " +
				"new Seller (s.selId, s.selName,s.selTel, s.selIdCard, s.shop.shopId, s.shop.shopName, s.shop.shopGrade) " +
				"FROM Seller s order by s.selId";
		@SuppressWarnings("unchecked")
		List<Seller> sellers = (List<Seller>) getSession().createQuery(hql)
				.setFirstResult(BASE_NUM + (pageNum- 1) * BACK_PAGE_SIZE)
				.setMaxResults(BACK_PAGE_SIZE)
				.list();
		return sellers;
	}

	@Override
	public void addSeller(Seller seller) {
		getSession().saveOrUpdate(seller);
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
