package com.dy.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.dy.util.MD5Util;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

public class Test {

    public static void main(String[] args) {
        String ppp = "sdjfnsajf";
        String p = "e3e";
        String passwordMD5 = MD5Util.getMd5("123");
        System.out.println(passwordMD5);

    }

}
