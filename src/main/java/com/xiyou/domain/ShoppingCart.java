package com.xiyou.domain;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class ShoppingCart {



	private Map<Integer, ShopCartItem> ShopCartItems = new HashMap<Integer, ShopCartItem>();

	/**
	 * 更新购物车中该id对应的交易的quantity
	 * @param id
	 * @param quantity
	 */
	public void updateItemQuantity(Integer id, int quantity){
		ShopCartItem shoppingCartItem = ShopCartItems.get(id);
		if(shoppingCartItem != null){
			shoppingCartItem.setQuantity(quantity);
		}
	}

	/**
	 * 从购物车中删除掉改id对应的交易项
	 * @param id
	 */
	public void removeItem(Integer id){
		ShopCartItems.remove(id);
	}

	/**
	 * 清空购物车
	 */
	public void clear(){
		ShopCartItems.clear();
	}

	/**
	 * 判断购物车是否为空
	 * @return
	 */
	public boolean isEmpty(){
		return ShopCartItems.isEmpty();
	}

	/**
	 * 获取当前购物车中所有交易的总金额
	 * @return
	 */
/*
	public float getTotalMoney(){
		float total = 0;
		
		for(ShopCartItem shoppingCartItem: getItems()){
			total += shoppingCartItem.getItemMoney();
		}
		
		return total;
	}
*/

	/**
	 * 获取当前购物车中的所有或交易内容
	 * @return
	 */
	public Collection<ShopCartItem> getItems(){
		return ShopCartItems.values();
	}

	/**
	 * 获取当前购物车数的总数
	 * @return
	 */
	public int getBookNumber(){
		int total = 0;
		
		for(ShopCartItem shoppingCartItem: ShopCartItems.values()){
			total += shoppingCartItem.getQuantity();
		}
		
		return total;
	}

	/**
	 * 获取当前购物车的所有交易记录
	 * @return
	 */
	public Map<Integer, ShopCartItem> getShopCartItems() {
		return ShopCartItems;
	}

	/**
	 * 判断当前购物车有没有该id对应的交易记录
	 * @param id
	 * @return
	 */
	public boolean hasBook(Integer id){
		return ShopCartItems.containsKey(id);
	}

	/**
	 * 添加一条交易到购物车,如果购物车没有购买此书的记录,则新建一条购物车记录,否则只需将原有 记录quantity++;
	 * @param
	 */
/*
	public void addBook(Book book){

		ShopCartItem shoppingCartItem = ShopCartItems.get(ShopCartItems.getBookId());

		if(shoppingCartItem == null){
			shoppingCartItem = new ShopCartItem(ShopCartItems);
			books.put(ShopCartItems.getBookId(), shoppingCartItem);
		}else{
			//shoppingCartItem.increment();
		}
	}
*/

	@Override
	public String toString() {
		return "ShoppingCart{" +
				"ShopCartItems=" + ShopCartItems +
				'}';
	}
}
