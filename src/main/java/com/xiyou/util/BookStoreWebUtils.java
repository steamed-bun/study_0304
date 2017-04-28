package com.xiyou.util;

import com.xiyou.domain.Book;
import com.xiyou.domain.Seller;
import com.xiyou.domain.User;
import com.xiyou.domain.ShopCartItem;
import com.xiyou.domain.ShoppingCart;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BookStoreWebUtils {

	private static User user = new User();
	/**
	 * 获取ShoppingCar ，如果session中有直接获取，如果没有则新建一个
	 * @param session
	 * @return
	 */
	public static ShoppingCart getShoppingCart(Map<String, Object> session){
		ShoppingCart shoppingCart = (ShoppingCart) session.get("ShoppingCart");
		if(shoppingCart == null){
			shoppingCart = new ShoppingCart();
			session.put("ShoppingCart", shoppingCart);
		}
		
		return shoppingCart;
	}

	public static Map<String, Object> getDataMap(Map<String, Object> session){
		Map<String, Object> dataMap = (Map<String, Object>) session.get("dataMap");
		if (dataMap == null){
			dataMap = new HashMap<String, Object>();
			session.put("dataMap",dataMap);
		}
		dataMap.clear();
		dataMap.put("status", "yes");
		return dataMap;
	}

	//将book的部分置空
	public static List<Book> setNull(List<Book> books){
		for (Book book :books) {
			book.setShop(null);
			book.setCategory(null);
		}
		return books;
	}

	//将seller的部分置空
	public static Seller setNull(Seller seller){
		seller.setShop(null);
		return seller;
	}

	public static List<ShopCartItem> setNullTo(List<ShopCartItem> shopCartItems){
		for (ShopCartItem shopCartItem : shopCartItems ) {
//			Hibernate.initialize(shopCartItem.getBook());
//			Hibernate.initialize(shopCartItem.getUser());
			shopCartItem.getBook().setShop(null);
			shopCartItem.getBook().setCategory(null);
			user.setUserId(shopCartItem.getUser().getUserId());
			shopCartItem.setUser(user);
		}
		return shopCartItems;
	}

}
