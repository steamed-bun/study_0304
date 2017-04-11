package com.xiyou.filter;
import com.xiyou.domain.CaptchaBean;
import com.xiyou.domain.CaptchaProductor;
import com.xiyou.util.HttpSessionUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

public class CatpchaFilter implements Filter {

    public CatpchaFilter() {
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest)servletRequest;
        HttpServletResponse response = (HttpServletResponse)servletResponse;
        String servletPath = request.getServletPath();

        try {
            if(servletPath.matches("/captcha.jpg")) {
                response.setContentType("image/jpeg");
                response.setHeader("Pragma", "no-cache");
                response.setHeader("Cache-Control", "no-cache");
                response.setDateHeader("Expires", 0L);
                CaptchaProductor e = new CaptchaProductor(64, 22, 4, 220);
                CaptchaBean bean = new CaptchaBean();
                bean.setCaptcha(e.getCode());
                bean.setCreateTime(new Date());
                HttpSessionUtils.setSessionValue(request, "sessionCaptcha", bean);
                e.write(response.getOutputStream());
                return;
            }
        } catch (IOException var9) {
            System.out.println("验证码出错了!" + var9.getMessage());
            var9.printStackTrace();
        }

    }

    @Override
    public void destroy() {
    }
}
