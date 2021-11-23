package com.dy.service;

import com.dy.entity.MenuEntity;
import com.dy.util.PageUtils;

import java.util.List;
import java.util.Map;

public interface CaipiaoService {
    PageUtils queryList(Map<String, Object> map);

    int queryNum(String p1);
}
