package com.dy.service;

import com.dy.entity.MenuEntity;
import com.dy.util.PageUtils;

import java.util.List;
import java.util.Map;

public interface MenuService {
    List<MenuEntity> queryList();

    List<MenuEntity> queryListByParentId(Integer id);

    PageUtils queryListMenu(Map<String, Object> map);

    void save(MenuEntity menu);

    void update(MenuEntity menu);

    void deleteBatch(Long[] menuIds);
}
