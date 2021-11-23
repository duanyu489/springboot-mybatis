package com.dy.controller;

import com.dy.util.MD5Util;
import com.dy.util.R;

public class TestController {

    public static void main(String[] args) {
        /*String s = MD5Util.getMd5("dy");
        System.out.println(s);*/

        TestController t = new TestController();
        t.test1("334");
    }

    private R test1(String msg) {
        if("22".equals(msg)){
            System.out.println("msg11111111111111 = " + msg);
            return R.error("111");
        }
        if("33".equals(msg)){
            System.out.println("msg12222222222222222 = " + msg);
            return R.error("22");
        }

        System.out.println("msg33333333333333 = " + msg);
        return R.error("33");
    }
}
