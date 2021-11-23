package com.dy.mapper;

import com.dy.entity.SysUserEntity;

import java.util.List;
import java.util.Map;

//@Repository 该注解是告诉Spring，让Spring创建一个名字叫“userDao”的UserDaoImpl实例
public interface UserMapper {

    List<SysUserEntity> queryByUserName(Map<String, Object> map);

    List<SysUserEntity> queryList(Map<String, Object> map);

    int addUser(SysUserEntity userEntity);

    int deleteBatch(Long[] userIds);

    int addUpdate(SysUserEntity userEntity);

    int queryNewUserTotel(String userName);
}

