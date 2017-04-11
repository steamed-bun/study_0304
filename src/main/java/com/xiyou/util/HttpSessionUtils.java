package com.xiyou.util;

import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class HttpSessionUtils {
    private static final String SESSION_LOGIN_USERINFO = "loginUserInfo";
    private static final String SESSION_LOGINUSER_MENUS = "loginUserMenuRuns";

    public HttpSessionUtils() {
    }

    public static HttpSession getSession(HttpServletRequest request) {
        return request.getSession();
    }

    public static Object getSessionValue(HttpServletRequest request, String key) {
        HttpSession session = getSession(request);
        return session.getAttribute(key);
    }

    public static void setSessionValue(HttpServletRequest request, String key, Object val) {
        HttpSession session = getSession(request);
        session.setAttribute(key, val);
    }

    public static void removeSessionValue(HttpServletRequest request, String key) {
        HttpSession session = getSession(request);
        session.removeAttribute(key);
    }

    public static Map<String, List<String>> getLoginUserMenus(HttpServletRequest request) {
        return (Map)getSessionValue(request, "loginUserMenuRuns");
    }

    public static void setLoginUserMenus(HttpServletRequest request, Map<String, List<String>> menus) {
        setSessionValue(request, "loginUserMenuRuns", menus);
    }
}
