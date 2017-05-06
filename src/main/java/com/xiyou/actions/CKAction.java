package com.xiyou.actions;

import java.io.*;

import com.opensymphony.xwork2.ActionSupport;
import com.xiyou.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller("cKAction")
public class CKAction extends ActionSupport{

	private static final long serialVersionUID = 1L;

	private String editor;

	private String fileName;

	private String bookDetailURL;

	public String addBookDetail(){
		fileName = String.valueOf(System.currentTimeMillis()) + ".html";
		bookDetailURL = "http://localhost:8080/study/book_details/" +fileName;
		System.out.println(bookDetailURL);
		File f = new File("F:/tomcat8.0/webapps/study/book_details/"+ fileName);
		OutputStreamWriter osw ;
		FileOutputStream fos;
		BufferedWriter bw;
		try {
			fos = new FileOutputStream(f);
			osw = new OutputStreamWriter( fos , "UTF-8" );
			bw = new BufferedWriter(osw);// 初始化输出字符流
			bw.write(editor);// 写文件
			bw.flush();
			bw.close();
			fos.close();
			osw.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		return SUCCESS;
	}

	public void setEditor(String editor) {
		this.editor = editor;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getBookDetailURL() {
		return bookDetailURL;
	}
}
