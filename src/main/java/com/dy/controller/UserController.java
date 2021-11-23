package com.dy.controller;

import com.dy.entity.SysUserEntity;
import com.dy.service.UserService;
import com.dy.util.MD5Util;
import com.dy.util.PageUtils;
import com.dy.util.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/list")
    @ResponseBody
    public R GetUser(Integer page, Integer limit,String userName){
        Map<String, Object> map = new HashMap<String, Object>();
        if(page == null) {
            page = 0;
        }if(limit == null) {
            limit = 10;
        }
        if(userName != null && !"".equals(userName)){
            map.put("userName", "%"+userName+"%");
        }
        map.put("PageNum", page);
        map.put("PageSize", limit);
        PageUtils pageUtil = userService.queryListPage(map);
        return R.ok().put("page", pageUtil);
    }


    @RequestMapping("/add")
    @ResponseBody
    //public R addUser(String userName, String passWord, String realName){
    public R addUser(@RequestBody SysUserEntity userEntity){
        String userName = userEntity.getUserName();
        String passWord = userEntity.getUserPassword();
        String userRealname = userEntity.getUserRealname();

        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String createdate = sdf.format(date);
        userEntity.setCreateTime(createdate);

        if(userName == null || "".equals(userName)){
            return R.error("登录账号不能为空");
        }
        if(passWord == null || "".equals(passWord)){
            return R.error("密码不能为空");
        }
        if(userRealname == null || "".equals(userRealname)){
            return R.error("姓名不能为空");
        }

        int newUserTotel = userService.queryNewUserTotel(userName);
        if(newUserTotel == 0){
            String passwordMD5 = MD5Util.getMd5(passWord);
            userEntity.setUserPassword(passwordMD5);

            /**
             * addRows这个是插入受影响的行数
             * 返回的主键id已经赋值到实体类中 通过userEntity.getUserId() 可以取到
             */
            int addRows = userService.addUser(userEntity);
            if(addRows == 1){
                return R.ok("添加成功");
            }
            return R.error("添加失败,系统出现异常");
        }else{
            return R.error("添加失败,登录账号已存在！！！");
        }
    }

    @RequestMapping("/update")
    @ResponseBody
    public R update(@RequestBody SysUserEntity userEntity){
        String userName = userEntity.getUserName();
        String userRealname = userEntity.getUserRealname();

        if(userName == null || "".equals(userName)){
            return R.error("登录账号不能为空");
        }
        if(userRealname == null || "".equals(userRealname)){
            return R.error("姓名不能为空");
        }

        /**
         * 对于更新操作的返回值 需要在配置连接加useAffectedRows=true
         * 返回的才是真正的受影响行数
         * 比如：jdbc:mysql://localhost:3306/my?useAffectedRows=true
         */
        int updateRow = userService.addUpdate(userEntity);
        if(updateRow == 1){
            return R.ok("更新成功");
        }
        return R.error("更新失败，请重试！！！");
    }

    @RequestMapping("/delete")
    public R delete(@RequestBody Long[] userIds){
        int deleteRows = userService.deleteBatch(userIds);
        if(deleteRows >= 1){
            return R.ok();
        }
        return R.error("删除失败");
    }
}