package com.xiyou.dao.impl;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository("baseDAOImpl")
public class BaseDAOImpl {

	@Autowired
	private SessionFactory sessionFactory;

	public Session getSession(){
		return this.sessionFactory.getCurrentSession();
	}
	
}
