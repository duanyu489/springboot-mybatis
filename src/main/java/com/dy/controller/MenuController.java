package com.dy.controller;

import com.alibaba.fastjson.JSONObject;
import com.dy.entity.MenuEntity;
import com.dy.service.MenuService;
import com.dy.util.PageUtils;
import com.dy.util.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.apache.commons.lang.StringUtils;

import java.util.*;

@Controller
@RequestMapping("/menu")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @RequestMapping(value = "/list")
    @ResponseBody
    public R queryList() {
        // List<MenuEntity> menuEntityList = menuService.queryList();
        Map<String, Object> data = new HashMap<String, Object>();
        //查询所有菜单
        List<MenuEntity> menuEntityList = menuService.queryList();
        //根节点
        List<MenuEntity> rootMenu = new ArrayList<MenuEntity>();
        for (MenuEntity nav : menuEntityList) {
            if (nav.getParentId() == 0) {//父节点是0的，为根节点。
                rootMenu.add(nav);
            }
        }
        /* 根据Menu类的order排序 */
        Collections.sort(rootMenu, order());
        //为根菜单设置子菜单，getClild是递归调用的
        for (MenuEntity nav : rootMenu) {
            /* 获取根节点下的所有子节点 使用getChild方法*/
            List<MenuEntity> childList = getChild(nav.getMenuId(), menuEntityList);
            nav.setMenus(childList);//给根节点设置子节点
        }
        /**
         * 输出构建好的菜单数据。
         *
         */
        return R.ok().put("list", rootMenu);

    }

    @RequestMapping(value = "/listM")
    @ResponseBody
    public R queryListMenu(Integer page, Integer limit, String menuName) {
        Map<String, Object> map = new HashMap<String, Object>();
        if (page == null) {
            page = 0;
        }
        if (limit == null) {
            limit = 10;
        }
        if (menuName != null && !"".equals(menuName)) {
            map.put("menuName", "%" + menuName + "%");
        }
        map.put("PageNum", page);
        map.put("PageSize", limit);

        PageUtils pageUtil = menuService.queryListMenu(map);

        return R.ok().put("page", pageUtil);
    }

    @RequestMapping("/select")
    @ResponseBody
    public R select() {
        //查询列表数据
        List<MenuEntity> menuList = menuService.queryList();

        for (int i = 0; i < menuList.size(); i++) {
            menuList.get(i).setName(menuList.get(i).getMenuName());
            menuList.get(i).setMenuIcon("");
        }

        //添加顶级菜单
        MenuEntity root = new MenuEntity();
        root.setMenuId(0);
        root.setName("一级菜单");
        root.setParentId(-1);
        root.setOpen(true);
        menuList.add(root);

        return R.ok().put("menuList", menuList);
    }


    @RequestMapping("/add")
    @ResponseBody
    public R save(@RequestBody MenuEntity menu) {
        if (StringUtils.isBlank(menu.getMenuName())) {
            return R.error("菜单名称不能为空");
        }
        menuService.save(menu);

        return R.ok();
    }

    @RequestMapping("/update")
    @ResponseBody
    public R update(@RequestBody MenuEntity menu) {
        if (StringUtils.isBlank(menu.getMenuName())) {
            return R.error("菜单名称不能为空");
        }
        menuService.update(menu);

        return R.ok();
    }

    @RequestMapping("/delete")
    @ResponseBody
    public R delete(@RequestBody Long[] menuIds) {
        menuService.deleteBatch(menuIds);

        return R.ok();
    }


    public List<MenuEntity> getChild(Integer id, List<MenuEntity> allMenu) {
        //子菜单
        List<MenuEntity> childList = new ArrayList<MenuEntity>();
        for (MenuEntity nav : allMenu) {
            // 遍历所有节点，将所有菜单的父id与传过来的根节点的id比较
            //相等说明：为该根节点的子节点。
            if (nav.getParentId() == id) {
                childList.add(nav);
            }
        }
        //递归
        for (MenuEntity nav : childList) {
            nav.setMenus(getChild(nav.getMenuId(), allMenu));
        }
        Collections.sort(childList, order());//排序
        //如果节点下没有子节点，返回一个空List（递归退出）
        if (childList.size() == 0) {
            return new ArrayList<MenuEntity>();
        }
        return childList;
    }


    public Comparator<MenuEntity> order() {
        Comparator<MenuEntity> comparator = new Comparator<MenuEntity>() {
            @Override
            public int compare(MenuEntity o1, MenuEntity o2) {
                if (o1.getOrderNum() != o2.getOrderNum()) {
                    return o1.getOrderNum() - o2.getOrderNum();
                }
                return 0;
            }
        };
        return comparator;
    }
}