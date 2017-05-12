package com.xiyou.domain;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class ShoppingCart {

	private Map<Integer, ShopCartItemTo> shopCartItemTos = new HashMap<Integer, ShopCartItemTo>();

	/**
	 * 更新购物车中该id对应的交易的quantity
	 * @param id id
	 * @param quantity quantity
	 */
	public void updateItemQuantity(Integer id, int quantity){
		ShopCartItemTo shoppingCartItem = shopCartItemTos.get(id);
		if(shoppingCartItem != null){
			shoppingCartItem.setQuantity(quantity);
			shoppingCartItem.setItemMoney();
		}
	}

	/**
	 * 获取当前id 对应的交易项数量
	 * @param id
	 * @param quantity
     * @return
     */
	public Integer getItemQuantity(Integer id){
		ShopCartItemTo shoppingCartItem = shopCartItemTos.get(id);
		Integer oldQuantity = 0;
		if(shoppingCartItem != null){
			oldQuantity = shoppingCartItem.getQuantity();
		}
		return oldQuantity;
	}

	/**
	 * 从购物车中删除掉改id对应的交易项
	 * @param id id
	 */
	public void removeItem(Integer id){
		shopCartItemTos.remove(id);
	}

	/**
	 * 清空购物车
	 */
	public void clear(){
		shopCartItemTos.clear();
	}

	/**
	 * 判断购物车是否为空
	 * @return
	 */
	public boolean isEmpty(){
		return shopCartItemTos.isEmpty();
	}

	/**
	 * 获取当前购物车中所有交易的总金额
	 * @return
	 */
	public float getTotalMoney(){
		float total = 0;

		for(ShopCartItemTo shoppingCartItem: getItems()){
			total += shoppingCartItem.getItemMoney();
		}

		return total;
	}

	/**
	 * 获取当前购物车中的所有或交易内容
	 * @return
	 */
	public Collection<ShopCartItemTo> getItems(){
		return shopCartItemTos.values();
	}

	/**
	 * 获取当前购物车数的总数
	 * @return
	 */
	public int getBookNumber(){
		int total = 0;

		for(ShopCartItemTo shoppingCartItem: shopCartItemTos.values()){
			total += shoppingCartItem.getQuantity();
		}

		return total;
	}

	/**
	 * 获取当前购物车的所有交易记录
	 * @return
	 */
	public Map<Integer, ShopCartItemTo> getShopCartItemTos() {
		return shopCartItemTos;
	}

	/**
	 * 判断当前购物车有没有该id对应的交易记录
	 * @param id
	 * @return
	 */
	public boolean hasBook(Integer id){
		return shopCartItemTos.containsKey(id);
	}

	/**
	 * 添加一条交易到购物车,如果购物车没有购买此书的记录,则新建一条购物车记录,否则只需将原有 记录quantity++;
	 * @param
	 */

	public void addShopCartItemTo(ShopCartItemTo shopCartItemTo){
        Integer bookId = shopCartItemTo.getBook().getBookId();
        ShopCartItemTo shopCartItemTo1 = shopCartItemTos.get(bookId);
        if(shopCartItemTo1 == null){
            shopCartItemTo.setItemMoney();
            shopCartItemTos.put(bookId, shopCartItemTo);
		}else{
            shopCartItemTo1.increment(shopCartItemTo.getQuantity());
            shopCartItemTo1.setItemMoney();
		}
	}

	@Override
	public String toString() {
		return "ShoppingCart{" +
				"ShopCartItemTos=" + shopCartItemTos +
				'}';
	}
}
