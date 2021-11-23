package com.dy.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class MenuEntity {

    private Integer menuId;
    private String menuName;
    private String menuIcon;
    private String menuUrl;
    private Integer orderNum;
    private Integer parentId;
    private Integer menuType;

    private Boolean open;
    private String name;

    private MenuEntity mList;
    private List<MenuEntity> menus;


}
