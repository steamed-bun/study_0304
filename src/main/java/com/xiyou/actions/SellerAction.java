package com.xiyou.actions;

import java.util.Map;

import com.xiyou.domain.CaptchaBean;
import com.xiyou.util.HttpSessionUtils;
import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Preparable;
import com.xiyou.domain.Seller;
import com.xiyou.service.SellerService;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;

public class SellerAction extends ActionSupport implements ModelDriven<Seller>,
		SessionAware ,Preparable{

	private static final long serialVersionUID = 1L;

	private Seller seller;
	private String chose;
	private SellerService selService;
	private Map<String, Object> session;
	private String selId = null;
    private String code = null;
	
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

	public void setSelService(SellerService selService) {
		this.selService = selService;
	}
	
	public String getSelId() {
		return selId;
	}

	public void setSelId(String selId) {
		this.selId = selId;
	}

	public String sellectSeller(){
		if(chose == null){
			this.seller = selService.selectSeller(seller.getSelId().toString());
			if(session.get("selId") == null){
				session.put("selId", seller.getSelId());
				session.put("shopId", seller.getShop().getShopId());
			}
		}else{
			this.seller = selService.selectSeller(session.get("selId").toString());
		}
	
		return "sellectSeller";
	}
	
	public String addSeller() {
		if(selId.equals("")){
			selId = selService.addSeller(seller);
			session.put("selId", selId);
			return "addSeller";
		}else {
			selService.addSeller(seller);
			return "updateSeller";
		}
	}
	
	public void prepareAddSeller(){
        if(selId.equals("")){
			seller = new Seller();
		}else {
			seller = selService.selectSeller(selId);
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
			seller = selService.selectSeller(selId);
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
}
