package com.xiyou.actions;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.xiyou.service.ShopService;
import com.xiyou.util.BookStoreWebUtils;
import org.apache.commons.io.FileUtils;
import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;
import com.xiyou.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller("upLoadAction")
public class UpLoadAction extends ActionSupport implements SessionAware{

	private static final long serialVersionUID = 1L;
	//物理地址
	private static final String SELLER_IMAGE_DirURL = "D:/soft_tool/tomcat/apache-tomcat-8.5.13/webapps/study/selImage/";
	private static final String SELLER_WEIXIN_DirURL = "D:/soft_tool/tomcat/apache-tomcat-8.5.13/webapps/study/shopImage/";
	private static final String BOOK_IMAGES_DirURL = "D:/soft_tool/tomcat/apache-tomcat-8.5.13/webapps/study/book_Images/";
    private static final String BOOK_IMAGES_UEL = "http://localhost:8080/study/book_Images/";

	@Autowired
	private SellerService sellerService;

	@Autowired
	private ShopService shopService;

	private File selImage;
	private File selWeixin;
	private String selImageContentType;
	private String selWeixinContentType;
	@SuppressWarnings("unused")
	private String selImageFileName;
	@SuppressWarnings("unused")
	private String selWeixinFileName;
	private String path;

	private List<File> images = new ArrayList<File>(5);
    private List<String> imagesContentType = new ArrayList<String>(5);
	private List<String> imagesFileName = new ArrayList<String>(5);
    private List<String> imagesURL = null;
	Map<String, Object> session;
	private Map<String, Object> dataMap;

	public String saveBookImages() throws Exception{
		dataMap = BookStoreWebUtils.getDataMap(session);
		path = BOOK_IMAGES_DirURL;
		File file = new File(path);
		if (!file.exists()) {
			file.mkdirs();
        }
        imagesURL = new ArrayList<String>(5);
        int i = 0;
        for (File image : images) {
            String imageName = String.valueOf(System.currentTimeMillis()) + imagesFileName.get(i);
            FileUtils.copyFile(image, new File(file, imageName));
            imagesURL.add(BOOK_IMAGES_UEL + imageName);
            i++;
        }
		images.clear();
        dataMap.put("imagesURL",imagesURL);
		return "saveBookImages";
	}

	public String getImageName(String imagesContentType){
		String photoName = ".jpg";
        if(imagesContentType.equals("image/png")){
            photoName = ".png";
        }else if(imagesContentType.equals("image/gif")){
            photoName = ".gif";
        }
		return String.valueOf(System.currentTimeMillis()) + photoName;
	}

	public String addSelImage() throws Exception {
		path = SELLER_IMAGE_DirURL;
		File file = new File(path);
		if (!file.exists()) {
			file.mkdir();
		}
		String selImageName = getSelImageName();
		FileUtils.copyFile(selImage, new File(file, selImageName));
		path = sellerService.updateSelImage(selImageName, session.get("selId").toString());
		return SUCCESS;
	}
	
	public String getSelImageName(){
		String photoName = ".jpg";
			if(selImageContentType.equals("image/png")){
				photoName = ".png";
			}else if(selImageContentType.equals("image/gif")){
				photoName = ".gif";
			}
		return String.valueOf(System.currentTimeMillis()) + photoName;
	}
	
	public String addSelWeiXin() throws Exception {
		path = SELLER_WEIXIN_DirURL;
		System.out.println(path);
		File file = new File(path);
		if (!file.exists()) {
			file.mkdir();
		}
		String selWeixinName = getSelWeixinName();
		FileUtils.copyFile(selWeixin, new File(file, selWeixinName));
		path = shopService.updateShopImage(selWeixinName, session.get("shopId").toString());
		return SUCCESS;
	}

	public String getSelWeixinName(){
		String photoName = ".jpg";
		if(selImageContentType.equals("image/png")){
			photoName = ".png";
		}else if(selImageContentType.equals("image/gif")){
			photoName = ".gif";
		}
		return String.valueOf(System.currentTimeMillis()) + photoName;
	}

	@Override
	public void setSession(Map<String, Object> session) {
		this.session = session;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public void setSelImage(File selImage) {
		this.selImage = selImage;
	}

	public void setSelWeixin(File selWeixin) {
		this.selWeixin = selWeixin;
	}

	public void setSelImageContentType(String selImageContentType) {
		this.selImageContentType = selImageContentType;
	}

	public void setSelWeixinContentType(String selWeixinContentType) {
		this.selWeixinContentType = selWeixinContentType;
	}

	public void setSelImageFileName(String selImageFileName) {
		this.selImageFileName = selImageFileName;
	}

	public void setSelWeixinFileName(String selWeixinFileName) {
		this.selWeixinFileName = selWeixinFileName;
	}

	public List<File> getImages() {
		return images;
	}

	public void setImages(List<File> images) {
		this.images = images;
	}

	public Map<String, Object> getDataMap() {
		return dataMap;
	}

    public List<String> getImagesContentType() {
        return imagesContentType;
    }

    public void setImagesContentType(List<String> imagesContentType) {
        this.imagesContentType = imagesContentType;
    }

    public List<String> getImagesFileName() {
        return imagesFileName;
    }

    public void setImagesFileName(List<String> imagesFileName) {
        this.imagesFileName = imagesFileName;
    }
}
