package com.xiyou.actions;

import java.io.File;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;
import com.xiyou.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller("upLoadAction")
public class UpLoadAction extends ActionSupport implements SessionAware{

	private static final long serialVersionUID = 1L;

	@Autowired
	private SellerService sellerService;

	private File photo;
	private String photoContentType;
	@SuppressWarnings("unused")
	private String photoFileName;
	
	private String path;

	Map<String, Object> session;

	public String addSelImage() throws Exception {
		path = "F:/tomcat8.0/webapps/upload/seller/avatar";
		File file = new File(path);
		if (!file.exists()) {
			file.mkdir();
		}
		String selImage = getPhotoName();
		FileUtils.copyFile(photo, new File(file, selImage));
		sellerService.updateSelImage(selImage, session.get("selId").toString());
		return SUCCESS;
	}
	
	public String getPhotoName(){
		String photoName = ".jpg";
			if(photoContentType.equals("image/png")){
				photoName = ".png";
			}else if(photoContentType.equals("image/gif")){
				photoName = ".gif";
			}
		return String.valueOf(System.currentTimeMillis()) + photoName;
	}
	
	public String addSelWeiXin() throws Exception {
		path = "D:/study/selWeiXin";
		System.out.println(path);
		File file = new File(path);
		if (!file.exists()) {
			file.mkdir();
		}
		String selWeiXin = getPhotoName();
		FileUtils.copyFile(photo, new File(file, selWeiXin));
		sellerService.updateSelWeiXin(selWeiXin, session.get("selId").toString());
		return SUCCESS;
	}
	
	@Override
	public void setSession(Map<String, Object> session) {
		this.session = session;
	}


	public void setPhoto(File photo) {
		this.photo = photo;
	}

	public void setPhotoContentType(String photoContentType) {
		this.photoContentType = photoContentType;
	}

	public void setPhotoFileName(String photoFileName) {
		this.photoFileName = photoFileName;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}
}
