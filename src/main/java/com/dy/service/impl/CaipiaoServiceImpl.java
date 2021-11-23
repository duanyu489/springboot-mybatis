package com.dy.service.impl;

import com.dy.entity.CaipiaoEntity;
import com.dy.entity.MenuEntity;
import com.dy.mapper.CaipiaoMapper;
import com.dy.mapper.MenuMapper;
import com.dy.service.CaipiaoService;
import com.dy.service.MenuService;
import com.dy.util.PageUtils;
import com.github.pagehelper.PageInfo;
import com.github.pagehelper.page.PageMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("caipiaoService")
public class CaipiaoServiceImpl implements CaipiaoService {

    @Autowired
    private CaipiaoMapper caipiaoMapper;


    @Override
    public PageUtils queryList(Map<String, Object> map) {
        Integer pageNum = (Integer) map.get("PageNum");
        Integer pageSize = (Integer) map.get("PageSize");
        if (pageNum == null) {
            pageNum = 0;
        }
        if (pageSize == null) {
            pageSize = 20;
        }
        PageMethod.startPage(pageNum, pageSize);
        List<CaipiaoEntity> listMap = caipiaoMapper.queryList(map);
        PageInfo<CaipiaoEntity> pageInfo = new PageInfo<CaipiaoEntity>(listMap);

        PageUtils pageUtil = new PageUtils(listMap, pageInfo.getTotal(), pageSize, pageNum);
        return pageUtil;
    }

    @Override
    public int queryNum(String p1) {
        return caipiaoMapper.queryNum(p1);
    }
}
