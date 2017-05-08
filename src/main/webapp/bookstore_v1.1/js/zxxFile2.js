/*
 * zxxFile.js ����HTML5 �ļ��ϴ��ĺ��Ľű� http://www.zhangxinxu.com/wordpress/?p=1923
 * by zhangxinxu 2011-09-12
*/

var ZXXFILE = {
	fileInput: null,				//html file�ؼ�
	dragDrop: null,					//��ק��������
	upButton: null,					//�ύ��ť
	url: "",      //ajax��ַ
	param:"",
	fileFilter: [],					//���˺���ļ�����
	filter: function(files) {		//ѡ���ļ���Ĺ��˷���
		return files;	
	},
	onSelect: function() {},		//�ļ�ѡ���
	onDelete: function() {},		//�ļ�ɾ����
	onDragOver: function() {},		//�ļ���ק����������ʱ
	onDragLeave: function() {},	//�ļ��뿪����������ʱ
	onProgress: function() {},		//�ļ��ϴ�����
	onSuccess: function() {},		//�ļ��ϴ��ɹ�ʱ
	onFailure: function() {},		//�ļ��ϴ�ʧ��ʱ,
	onComplete: function() {},		//�ļ�ȫ���ϴ����ʱ
	
	/* �������������÷����ֽ��� */
	
	//�ļ��Ϸ�
	funDragHover: function(e) {
		e.stopPropagation();
		e.preventDefault();
		this[e.type === "dragover"? "onDragOver": "onDragLeave"].call(e.target);
		return this;
	},
	//��ȡѡ���ļ���file�ؼ����Ϸ�
	funGetFiles: function(e) {
		// ȡ����꾭����ʽ
		this.funDragHover(e);
				
		// ��ȡ�ļ��б����
		var files = e.target.files || e.dataTransfer.files;
		//��������ļ�
		//this.fileFilter = this.fileFilter.concat(this.filter(files));
		this.fileFilter = this.filter(files);
		this.funDealFiles();
		return this;
	},
	
	//ѡ���ļ��Ĵ�����ص�
	funDealFiles: function() {
		for (var i = 0, file; file = this.fileFilter[i]; i++) {
			//����Ψһ����ֵ
			file.index = i;
		}
		//ִ��ѡ��ص�
		this.onSelect(this.fileFilter);
		return this;
	},
	
	//ɾ����Ӧ���ļ�
	funDeleteFile: function(fileDelete) {
		var arrFile = [];
		for (var i = 0, file; file = this.fileFilter[i]; i++) {
			if (file != fileDelete) {
				arrFile.push(file);
			} else {
				this.onDelete(fileDelete);	
			}
		}
		this.fileFilter = arrFile;
		return this;
	},
	
	//�ļ��ϴ�
	funUploadFile: function() {
		var self = this;
		var form = new FormData();
		if (location.host.indexOf("sitepointstatic") >= 0) {
			//��վ�������������
			return;	
		}
		console.log(this.fileFilter.length);
		if(this.fileFilter.length>5||this.fileFilter.length<5){
			$('.oper-hint').html('只能上传5张图片');
			$('.oper-hint').slideDown();//错误提示信息缓慢出现
			setTimeout(function(){
				$('.oper-hint').slideUp();
			},3000);
			//$("#uploadInf").html("图片上传失败！");
			return 'length error';
		}else{
			$('.oper-hint').css('display','none');
		}
		for (var i = 0, file; file = this.fileFilter[i]; i++) {
			(function(file) {
				form.append('images',file);
				console.log(file);
			})(file);	
		}
		form.append('recommend',this.param);
		var xhr = new XMLHttpRequest();
		if (xhr.upload) {
			// �ļ��ϴ��ɹ�����ʧ��
			xhr.onreadystatechange = function(e) {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						self.onSuccess(file, xhr.responseText);
						self.funDeleteFile(file);
						if (!self.fileFilter.length) {
							//ȫ�����
							self.onComplete();
						}
					} else {
						self.onFailure(file, xhr.responseText);
					}
				}
			};
			console.log(self.url);
			// ��ʼ�ϴ�
			xhr.open("POST", self.url, true);
			xhr.send(form);
		}
	},
	
	init: function() {
		var self = this;
		
		if (this.dragDrop) {
			this.dragDrop.addEventListener("dragover", function(e) { self.funDragHover(e); }, false);
			this.dragDrop.addEventListener("dragleave", function(e) { self.funDragHover(e); }, false);
			this.dragDrop.addEventListener("drop", function(e) { self.funGetFiles(e); }, false);
		}
		
		//�ļ�ѡ��ؼ�ѡ��
		if (this.fileInput) {
			this.fileInput.addEventListener("change", function(e) { self.funGetFiles(e); }, false);	
		}
		
		//�ϴ���ť�ύ
		if (this.upButton) {
			this.upButton.addEventListener("click", function(e) { self.funUploadFile(e); }, false);	
		} 
	}
};
