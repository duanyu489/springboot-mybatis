package com.dy.controller;

import com.dy.entity.CaipiaoEntity;
import com.dy.service.CaipiaoService;
import com.dy.util.PageUtils;
import com.dy.util.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/caipiao")
public class CaipiaoController {

    @Autowired
    private CaipiaoService caipiaoService;

    @RequestMapping(value = "/list")
    @ResponseBody
    public R queryList(Integer page, Integer limit, String text) {
        Map<String, Object> map = new HashMap<String, Object>();
        if(page == null) {
            page = 0;
        }if(limit == null) {
            limit = 20;
        }
        if(text != null && !"".equals(text)){
            map.put("text", "%"+text+"%");
        }
        map.put("PageNum", page);
        map.put("PageSize", limit);

        PageUtils pageUtil = caipiaoService.queryList(map);

        return R.ok().put("page", pageUtil);
    }

    @RequestMapping("/yuce")
    @ResponseBody
    public R yuce(){
        Map<String, Object> map = new HashMap<String, Object>();

        map.put("PageNum", 1);
        map.put("PageSize", 5);

        PageUtils pageUtil = caipiaoService.queryList(map);
        for (int i = 0; i < 5; i++) {
            CaipiaoEntity caipiaoEntity = (CaipiaoEntity) pageUtil.getList().get(i);
            int a = Integer.parseInt(caipiaoEntity.getCNum1());
            int b = Integer.parseInt(caipiaoEntity.getCNum2());
            int c = Integer.parseInt(caipiaoEntity.getCNum3());
            int d = Integer.parseInt(caipiaoEntity.getCNum4());
            int e = Integer.parseInt(caipiaoEntity.getCNum5());
            int f = Integer.parseInt(caipiaoEntity.getCNum6());
            int g = Integer.parseInt(caipiaoEntity.getCNumLast());

            int p1 = getBallIndex(a,b,c,d,e,f,g);
            getBall(p1);
        }

        String newP = getBall(System.nanoTime());
        String p1 = newP.substring(1,newP.length()-1).replaceAll(" ","").replaceAll(",","");
        int numT = caipiaoService.queryNum(p1);
        String zjhm = chazhong(numT,newP);

        return R.ok(zjhm);
    }

    private String chazhong(int numT,String newP) {
        if(numT == 0){
            return newP;
        }else{
            String newD = getBall(System.nanoTime());
            String p1 = newD.substring(1,newD.length()-1).replaceAll(" ","").replaceAll(",","");
            int num1 = caipiaoService.queryNum(p1);
            return chazhong(num1,newD);
        }
    }


    /**
     * 根据双色球生成绝对序号(原理：排列组合算法)
     * a b c d e f 是红球由小到大 g是蓝球
     */
    public static final int getBallIndex(int a,int b,int c,int d,int e,int f,int g){
        return (comp(33,6)-comp(34-a,6)+comp(33-a,5)-comp(34-b,5)
                +comp(33-b,4)-comp(34-c,4)+comp(33-c,3)-comp(34-d,3)
                +comp(33-d,2)-comp(34-e,2)+comp(33-e,1)-comp(33-f,1))*16+g;
    }
    /**
     * 根据绝对序号生成双色球(原理：遍历所有组合）
     * a b c d e f 是红球由小到大
     */
    public static final String getBall(long ballIndex){
        if(ballIndex>17721088)ballIndex=ballIndex%17721088;
        int redIndex=(int) (ballIndex/16);
        int count=0;
        for(int a=1;a<29;a++)
            for(int b=a+1;b<30;b++)
                for(int c=b+1;c<31;c++)
                    for(int d=c+1;d<32;d++)
                        for(int e=d+1;e<33;e++)
                            for(int f=e+1;f<34;f++){//最多循环1107568次，即为红球组合数
                                count++;
                                if(redIndex==count){
                                    return Arrays.toString(new int[]{a,b,c,d,e,f,1+((int)ballIndex-1)%16});
                                }
                            }
        return null;
    }
    /**
     * 计算组合数C(m,n)
     */
    public static final int comp(int m, int n)
    {
        int sum=1;
        for(int i=m;i>m-n;i--)sum=sum*i;
        for(int i=n;i>1;i--)sum=sum/i;
        return sum;
    }

}
