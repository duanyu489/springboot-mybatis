package com.dy.controller;


import com.dy.entity.SysUserEntity;
import com.dy.service.UserService;
import com.dy.util.MD5Util;
import com.dy.util.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/sys")
public class LoginController {

    /**
     * sys/的请求都不拦截
     */

    @Autowired
    private UserService userService;

    /**
     * 不拦截请求 直接登录
     *
     * @return
     */
    @RequestMapping("/login")
    public String LoginIndex() {
        return "login";
    }

    /**
     * 验证登录
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/checkLogin")
    @ResponseBody
    public R login(HttpServletRequest request) {
        //ModelAndView mav = new ModelAndView();
        String userName = request.getParameter("userName");
        String userPassword = request.getParameter("userPassword");
        System.out.println("username============" + userName + ",password=================== " + userPassword);

        Map<String, Object> map = new HashMap<String, Object>();
        if (userName != null || !"".equals(userName)) {
            map.put("userName", userName);
        }
        if (userPassword != null || !"".equals(userPassword)) {
            String passwordMD5 = MD5Util.getMd5(userPassword);
            map.put("userPassword", passwordMD5);
        }
        List<SysUserEntity> list = userService.queryByUserName(map);
        if (list != null && list.size() > 0) {
            String realName = list.get(0).getUserRealname();
            HttpSession session = request.getSession();
            session.setAttribute("realName", realName);
            return R.ok().put("list", list);
        }
        return R.error("用户名或密码错误!");
    }

    /**
     * 退出登录
     *
     * @return
     */
    @RequestMapping("/outLogin")
    public String outLogin(HttpServletRequest request) {
        Enumeration em = request.getSession().getAttributeNames();
        while (em.hasMoreElements()) {
            request.getSession().removeAttribute(em.nextElement().toString()); //退出时候清空session
        }
        return "/login";
    }
}
