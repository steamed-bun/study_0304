package com.xiyou.actions;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;

import com.opensymphony.xwork2.ActionSupport;
import org.springframework.stereotype.Controller;

@Controller("cKAction")
public class CKAction extends ActionSupport{

	private static final long serialVersionUID = 1L;
	
	private String editor;

	private String fileName;
	@Override
	public String execute(){
		//editorTmp = editorTmp.replaceAll("http://localhost:8090/", "F:/tomcat8.0/webapps/");
		System.out.println(editor);
		//editor = editor.replaceAll("http://localhost:8090/", "http://localhost:8090/F:/tomcat8.0/webapps/");
		fileName = String.valueOf(System.currentTimeMillis()) + ".html";
		System.out.println(fileName);
		File f = new File("F:/tomcat8.0/webapps/study/book_details/"+ fileName);
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

/*
	public String getEditor() {
		return editor;
	}
*/

	public void setEditor(String editor) {
		this.editor = editor;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
}
