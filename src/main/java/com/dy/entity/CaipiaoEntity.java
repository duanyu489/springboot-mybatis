package com.dy.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@ToString
public class CaipiaoEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer cId;
    private String cNum1;
    private String cNum2;
    private String cNum3;
    private String cNum4;
    private String cNum5;
    private String cNum6;
    private String cNumLast;
    private String cDate;
}
