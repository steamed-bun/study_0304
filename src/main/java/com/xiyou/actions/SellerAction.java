package com.xiyou.actions;

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
	private static final String SELLER_IMAGE_URL = "http://localhost:8090/study/selImage/00.png";
	private static final String SELLER_WEIXIN_URL = "http://localhost:8090/study/selWeiXin/00.png";

	@Autowired
	private SellerService selService;

	private Seller seller;
	private String chose;
	private Map<String, Object> session;
	private Map<String, Object> dataMap;
	private String selId = null;
    private String code = null;

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
			}else {
				dataMap.put("status","no");
			}
            this.setSeller(null);

		}else{
			this.seller = selService.getSellerById(session.get("selId").toString());
            dataMap.put("seller",seller);
		}
        return "login";
	}
	public void prepareSellectSeller(){
		if(seller.getSelId() == null){
			seller = new Seller();
		}else {
			seller = selService.getSellerById(selId);
		}
	}
    /**
     * 1、注册 seller 需要selId字段为空串
     * 2、更新 seller 需要selId字段
     * @return
     */
	public String addSeller() {
        dataMap = BookStoreWebUtils.getDataMap(session);
		seller.setSelImage(SELLER_IMAGE_URL);
		seller.setSelWeiXin(SELLER_WEIXIN_URL);
		selService.addSeller(seller);
		if(selId.equals("")){
			session.put("selId", seller.getSelId());
		}
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
}
