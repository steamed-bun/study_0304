package com.xiyou.actions;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.xiyou.service.ShopService;
import com.xiyou.service.UserService;
import com.xiyou.util.BookStoreWebUtils;
import org.apache.commons.io.FileUtils;
import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;
import com.xiyou.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

//@SuppressWarnings("All")
@Controller("upLoadAction")
public class UpLoadAction extends ActionSupport implements SessionAware{

	private static final long serialVersionUID = 1L;
	//物理地址
	private static final String SELLER_IMAGE_DirURL = "D:/soft_tool/tomcat/apache-tomcat-8.5.13/webapps/study/selImage/";
	private static final String SELLER_WEIXIN_DirURL = "D:/soft_tool/tomcat/apache-tomcat-8.5.13/webapps/study/shopImage/";
	private static final String BOOK_IMAGES_DirURL = "D:/soft_tool/tomcat/apache-tomcat-8.5.13/webapps/study/book_Images/";
    private static final String USER_IMAGE_DirURL = "D:/soft_tool/tomcat/apache-tomcat-8.5.13/webapps/study/userImage/";
    private static final String BOOK_IMAGES_UEL = "http://localhost:8080/study/book_Images/";

	@Autowired
	private SellerService sellerService;

	@Autowired
	private ShopService shopService;

    @Autowired
    private UserService userService;

    private File selImage;
    private String selImageFileName;
	private String selImageContentType;

    private File selWeixin;
    private String selWeixinContentType;
    private String selWeixinFileName;

    private File userImage;
    private String userImageContentType;
    private String userImageFileName;

    private String path;

	private List<File> images = new ArrayList<File>(8);
    private List<String> imagesContentType = new ArrayList<String>(8);
	private List<String> imagesFileName = new ArrayList<String>(8);
    private List<String> imagesURL = null;
	Map<String, Object> session;
	private Map<String, Object> dataMap;

    /**
     * user必须是登录状态
     * 上传用户头像
     * 同seller上传头像一样    只是 name必须是是userImage
     * url:upLoad-saveUserImage.action
     * @return url
     * @throws Exception
     */
    public String saveUserImage() throws Exception{
        path = USER_IMAGE_DirURL;
        File file = new File(path);
        if (!file.exists()) {
            file.mkdir();
        }
        int length = userImageFileName.length();
        String userImageName = String.valueOf(System.currentTimeMillis())
                + selWeixinFileName.substring(length - 4, length);
        FileUtils.copyFile(userImage, new File(file, userImageName));
        path = shopService.updateShopImage(userImageName, session.get("userId").toString());
        return SUCCESS;
    }

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

	public String addSelImage() throws Exception {
		path = SELLER_IMAGE_DirURL;
		File file = new File(path);
		if (!file.exists()) {
			file.mkdirs();
		}
        int length = selImageFileName.length();
        String selImageName = String.valueOf(System.currentTimeMillis())
                + selImageFileName.substring(length - 4,length);
		FileUtils.copyFile(selImage, new File(file, selImageName));
		path = sellerService.updateSelImage(selImageName, session.get("selId").toString());
		return SUCCESS;
	}
	
	public String addSelWeiXin() throws Exception {
		path = SELLER_WEIXIN_DirURL;
		System.out.println(path);
		File file = new File(path);
		if (!file.exists()) {
			file.mkdirs();
		}
        int length = selWeixinFileName.length();
		String selWeixinName = String.valueOf(System.currentTimeMillis())
                + selWeixinFileName.substring(length - 4, length);
		FileUtils.copyFile(selWeixin, new File(file, selWeixinName));
		path = shopService.updateShopImage(selWeixinName, session.get("shopId").toString());
		return SUCCESS;
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

    public void setSelImageFileName(String selImageFileName) {
        this.selImageFileName = selImageFileName;
    }

	public void setSelImageContentType(String selImageContentType) {
		this.selImageContentType = selImageContentType;
	}

    public void setSelWeixin(File selWeixin) {
        this.selWeixin = selWeixin;
    }

	public void setSelWeixinFileName(String selWeixinFileName) {
		this.selWeixinFileName = selWeixinFileName;
	}

    public void setSelWeixinContentType(String selWeixinContentType) {
        this.selWeixinContentType = selWeixinContentType;
    }

    public void setUserImage(File userImage) {
        this.userImage = userImage;
    }

    public void setUserImageFileName(String userImageFileName) {
        this.userImageFileName = userImageFileName;
    }

    public void setUserImageContentType(String userImageContentType) {
        this.userImageContentType = userImageContentType;
    }

    public List<File> getImages() {
		return images;
	}

	public void setImages(List<File> images) {
		this.images = images;
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

    public Map<String, Object> getDataMap() {
        return dataMap;
    }
}
