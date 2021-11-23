package com.dy.mapper;

import com.dy.entity.CaipiaoEntity;
import com.dy.entity.MenuEntity;

import java.util.List;
import java.util.Map;

public interface CaipiaoMapper {

    List<CaipiaoEntity> queryList(Map<String, Object> map);

    int queryNum(String p1);
}
