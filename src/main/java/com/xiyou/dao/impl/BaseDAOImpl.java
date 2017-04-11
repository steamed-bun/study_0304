package com.xiyou.dao.impl;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

public class BaseDAOImpl {

	private SessionFactory sessionFactory;

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	public Session getSession(){
		return this.sessionFactory.getCurrentSession();
	}
	
}
