package com.xiyou.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.xiyou.domain.ShoppingCart;

import java.util.Map;

public class BookStoreWebUtils {

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
	
}
