package com.xiyou.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.xiyou.domain.ShoppingCart;

public class BookStoreWebUtils {

	/**
	 * 获取ShoppingCar ，如果session中有直接获取，如果没有则新建一个
	 * @param request
	 * @return
	 */
	public static ShoppingCart getShoppingCart(HttpServletRequest request){
		HttpSession session = request.getSession();
		
		ShoppingCart shoppingCart = (ShoppingCart) session.getAttribute("ShoppingCart");
		if(shoppingCart == null){
			shoppingCart = new ShoppingCart();
			session.setAttribute("ShoppingCart", shoppingCart);
		}
		
		return shoppingCart;
	}
	
}
