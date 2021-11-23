package com.dy.entity;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

//用注解使用get set方法，需要按照lombok插件才可以set get 出来
@Getter
@Setter
@ToString
public class SysUserEntity {

    private Integer userId;
    private String userName;
    private String userPassword;
    private String userRealname;
    private String createTime;
    private Integer status;
    private String  userPhone;

}
