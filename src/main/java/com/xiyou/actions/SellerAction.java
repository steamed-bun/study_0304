package com.xiyou.actions;

import java.util.List;
import java.util.Map;

import com.xiyou.domain.CaptchaBean;
import com.xiyou.util.BookStoreWebUtils;
import com.xiyou.util.HttpSessionUtils;
import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Preparable;
import com.xiyou.domain.Seller;
import com.xiyou.service.SellerService;
import org.apache.struts2.json.annotations.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;

@Controller("sellerAction")
public class SellerAction extends ActionSupport implements ModelDriven<Seller>,
		SessionAware ,Preparable{

	private static final long serialVersionUID = 1L;
	private static final String SELLER_IMAGE_URL = "http://localhost:8080/study/selImage/00.png";
	private static final String SELLER_WEIXIN_URL = "http://localhost:8080/study/selWeiXin/00.png";

	@Autowired
	private SellerService selService;

	private Seller seller;
	private String chose;
	private Map<String, Object> session;
	private Map<String, Object> dataMap;
	private String selId = null;
    private String code = null;
	private Integer pageNum = 1;
	private Integer totalPageNo = -1;

	/**
	 * 已测
	 * 后台获取seller包括与其关联的shop 分页
	 * url:
	 * 1、点击“评估店铺”返回第一页数据和总页数 必须传totalPageNo=0
	 * sel-getSellersForBack.action?pageNum=1&totalPageNo=0
	 * 2、点击页数时不能传totalPageNo=0
	 * sel-getSellersForBack.action?pageNum=2
	 * @return sellers
     */
	public String getSellersForBack(){
		dataMap = BookStoreWebUtils.getDataMap(session);
		pageNum = getTotalPageNo(dataMap);
		List<Seller> sellers = selService.getSellersForBack(pageNum);
		dataMap.put("sellers", sellers);
		return SUCCESS;
	}

	public int getTotalPageNo(Map<String, Object> dataMap){
		if (totalPageNo.equals(0)){
			totalPageNo =selService.getTotalPageNo();
			dataMap.put("totalPageNo", totalPageNo);
			session.put("totalPageNo", totalPageNo);
		}else {
			totalPageNo = Integer.parseInt(session.get("totalPageNo").toString());
		}
		pageNum = (pageNum <= 0) ? pageNum = 1 : pageNum;
		pageNum = (pageNum > totalPageNo) ? totalPageNo : pageNum;
		return pageNum;
	}

	/**
	 * 前提是没有未完成订单
	 * 删除一个seller 包括其店铺 其订单
	 * 修改其下所有书籍的订单和购物车为bookId=1
	 * 删除书籍、书籍图片
	 *
	 * @return
     */
	public String deleteSeller(){
		return SUCCESS;
    }

	public String getWeixinUrlByShopId(){
		return "";
	}

	/**
	 * 已测
     * 1、登录方法  url: sel-sellectSeller.action?chose=login
     * 需传入seller.selTel 和 seller.selPassword
	 * return status {success: yes} {error: no} 会返回到data中
     * 2、登录完 即其它页面需要显示时
	 * 查找显示seller的信息 url: sel-sellectSeller.action?chose=CHOSE
     * @return seller 会返回到data中
     */
	public String sellectSeller(){
        dataMap = BookStoreWebUtils.getDataMap(session);
        if(chose.equals("login")){
			this.seller = selService.getSellerByEmial(seller.getSelTel(),seller.getSelPassword());
			if (seller != null){
				session.put("selId", seller.getSelId());
				session.put("shopId", seller.getShop().getShopId());
				seller.setShop(null);
			}else {
				dataMap.put("status","no");
			}

		}else{
			this.seller = selService.getSellerById(session.get("selId").toString());
			seller = BookStoreWebUtils.setNull(seller);
            dataMap.put("seller",seller);
		}
		seller = null;
        return "login";
	}

    /**
     * 已测
     * 1、注册 seller 需要selId字段为空串
     * 2、更新 seller 需要selId字段
     * @return
     */
	public String addSeller() {
        dataMap = BookStoreWebUtils.getDataMap(session);
		if(selId.equals("")){
			seller.setSelImage(SELLER_IMAGE_URL);
			seller.setSelWeiXin(SELLER_WEIXIN_URL);
		}
		selService.addSeller(seller);
		session.put("selId", seller.getSelId());
		seller = null;
		return "addSeller";
	}
	
	public void prepareAddSeller(){
        if(selId.equals("")){
			seller = new Seller();
		}else {
			seller = selService.getSellerById(selId);
		}
	}
	
	
	//仅仅为了 将seller放入值栈栈顶为了
	public String forUpdateSeller(){
		return "forUpdateSeller";
	}
	
	public void prepareForUpdateSeller(){
        if(selId.equals("")){
			seller = new Seller();
		}else{
			seller = selService.getSellerById(selId);
		}
	}

    /**
     * 检测验证码   (返回还没实现json格式)
     * @return
     */
    public String checkCaptcha() {
        String result;
        CaptchaBean bean = (CaptchaBean) session.get("sessionCaptcha");
        if (bean != null && code.equals(bean.getCaptcha())) {
//            result = ResultMessage.success(null);
            result = "success";
        } else {
//            result = ResultMessage.fail(null);
            result = "fial";
            session.put("sessionCaptcha",null);
        }
        System.out.println(result);
        return "forUpdateSeller";
    }



	@Override
	public Seller getModel() {
		return seller;
	}

	@Override
	public void setSession(Map<String, Object> session) {
		this.session = session;
	}

	@Override
	public void prepare() throws Exception {
	}

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

	public String getChose() {
		return chose;
	}

	public void setChose(String chose) {
		this.chose = chose;
	}

	public void setSeller(Seller seller) {
		this.seller = seller;
	}

	public Seller getSeller() {
		return seller;
	}

	public String getSelId() {
		return selId;
	}

	public void setSelId(String selId) {
		this.selId = selId;
	}

    public Map<String, Object> getDataMap() {
        return dataMap;
    }

	public Integer getPageNum() {
		return pageNum;
	}

	public void setPageNum(Integer pageNum) {
		this.pageNum = pageNum;
	}

	public Integer getTotalPageNo() {
		return totalPageNo;
	}

	public void setTotalPageNo(Integer totalPageNo) {
		this.totalPageNo = totalPageNo;
	}
}
