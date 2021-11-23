package com.dy.service;


import com.dy.entity.SysUserEntity;
import com.dy.util.PageUtils;

import java.util.List;
import java.util.Map;

public interface UserService {


    List<SysUserEntity> queryByUserName(Map<String, Object> map);

    PageUtils queryListPage(Map<String, Object> map);

    int addUser(SysUserEntity userEntity);

    int deleteBatch(Long[] userIds);

    int addUpdate(SysUserEntity userEntity);

    int queryNewUserTotel(String userName);
}