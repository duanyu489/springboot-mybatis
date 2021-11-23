package com.dy.service.impl;

import com.dy.entity.SysUserEntity;
import com.dy.mapper.UserMapper;
import com.dy.service.UserService;
import com.dy.util.PageUtils;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public List<SysUserEntity> queryByUserName(Map<String, Object> map) {
        return userMapper.queryByUserName(map);
    }

    @Override
    public PageUtils queryListPage(Map<String, Object> map) {
        Integer pageNum  = (Integer) map.get("PageNum");
        Integer pageSize  = (Integer) map.get("PageSize");
        if(pageNum == null) {
            pageNum = 0;
        }if(pageSize == null) {
            pageSize = 10;
        }
        PageHelper.startPage(pageNum, pageSize); //调用PageHelper分页插件，只对接下来的第一次查询实现分页
        List<SysUserEntity> listMap = userMapper.queryList(map);
        PageInfo<SysUserEntity> pageInfo = new PageInfo<>(listMap);

        PageUtils pageUtil = new PageUtils(listMap, pageInfo.getTotal(), pageSize, pageNum);
        return pageUtil;
    }

    @Override
    public int addUser(SysUserEntity userEntity) {
        return userMapper.addUser(userEntity);
    }

    @Override
    public int deleteBatch(Long[] userIds) {
        return userMapper.deleteBatch(userIds);
    }

    @Override
    public int addUpdate(SysUserEntity userEntity) {
        return userMapper.addUpdate(userEntity);
    }

    @Override
    public int queryNewUserTotel(String userName) {
        return userMapper.queryNewUserTotel(userName);
    }
}
