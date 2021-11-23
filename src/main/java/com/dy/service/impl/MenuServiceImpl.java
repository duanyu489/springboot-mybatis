package com.dy.service.impl;

import com.dy.entity.MenuEntity;
import com.dy.mapper.MenuMapper;
import com.dy.service.MenuService;
import com.dy.util.PageUtils;
import com.github.pagehelper.PageInfo;
import com.github.pagehelper.page.PageMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("menuService")
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuMapper menuMapper;

    @Override
    public List<MenuEntity> queryList() {

        return menuMapper.queryList();
    }

    @Override
    public List<MenuEntity> queryListByParentId(Integer id) {
        return menuMapper.queryListByParentId(id);
    }

    @Override
    public PageUtils queryListMenu(Map<String, Object> map) {
        Integer pageNum  = (Integer) map.get("PageNum");
        Integer pageSize  = (Integer) map.get("PageSize");
        if(pageNum == null) {
            pageNum = 0;
        }if(pageSize == null) {
            pageSize = 10;
        }
        PageMethod.startPage(pageNum, pageSize);
        List<MenuEntity> listMap = menuMapper.queryListMenu(map);
        PageInfo<MenuEntity> pageInfo = new PageInfo<MenuEntity>(listMap);

        PageUtils pageUtil = new PageUtils(listMap, pageInfo.getTotal(), pageSize, pageNum);
        return pageUtil;
    }

    @Override
    public void save(MenuEntity menu) {
        menuMapper.save(menu);
    }

    @Override
    public void update(MenuEntity menu) {
        menuMapper.update(menu);
    }

    @Override
    public void deleteBatch(Long[] menuIds) {
        menuMapper.deleteBatch(menuIds);
    }


}
