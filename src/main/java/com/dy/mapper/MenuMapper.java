package com.dy.mapper;

import com.dy.entity.MenuEntity;

import java.util.List;
import java.util.Map;

public interface MenuMapper {
    List<MenuEntity> queryList();

    List<MenuEntity> queryListByParentId(Integer id);

    List<MenuEntity> queryListMenu(Map<String, Object> map);

    void save(MenuEntity menu);

    void update(MenuEntity menu);

    void deleteBatch(Long[] menuIds);
}
