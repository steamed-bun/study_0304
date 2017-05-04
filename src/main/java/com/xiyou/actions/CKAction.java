package com.xiyou.actions;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;

import com.opensymphony.xwork2.ActionSupport;
import com.xiyou.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller("cKAction")
public class CKAction extends ActionSupport{

	private static final long serialVersionUID = 1L;

	@Autowired
	private BookService bookService;

	private String editor;

	private String fileName;

	private String bookDetailURL;

	public String addBookDetail(){
		fileName = String.valueOf(System.currentTimeMillis()) + ".html";
		bookDetailURL = "http://localhost:8080/study/book_details/" +fileName;
		System.out.println(bookDetailURL);
		File f = new File("D:/soft_tool/tomcat/apache-tomcat-8.5.13/webapps/study/book_details/"+ fileName);
			FileWriter fw;
			BufferedWriter bw;
			try {
				fw = new FileWriter(f);// 初始化输出流
				bw = new BufferedWriter(fw);// 初始化输出字符流
				bw.write(editor);// 写文件
				bw.flush();
				bw.close();
				fw.close();
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
