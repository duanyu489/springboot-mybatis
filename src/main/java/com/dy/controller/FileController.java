package com.dy.controller;

import com.dy.util.R;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;

@RestController
@RequestMapping("/file")
public class FileController {

    @RequestMapping("/readFile")
    public R readFile() throws IOException {
        System.out.println("true ================ ");
        //追加--------------------start
        FileWriter fw = null;
        try {
            File f=new File("e:\\mytest\\hello.txt");
            fw = new FileWriter(f, true);
        } catch (IOException e) {
            e.printStackTrace();
        }
        PrintWriter pw = new PrintWriter(fw);
        pw.println("\r\n"+"你大爷的");
        pw.flush();
        try {
            fw.flush();
            pw.close();
            fw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        //追加--------------------end

        //读取-------------------start
        String filePath = "e:\\mytest\\hello.txt";
        StringBuilder strb = new StringBuilder("");

        InputStream is = new FileInputStream(new File(filePath));
        InputStreamReader isr = new InputStreamReader(is, "UTF-8");
        BufferedReader br = new BufferedReader(isr);

        String str = "";
        while (null != (str = br.readLine())) {
            strb.append(str);
            strb.append("==");
        }
        br.close();
        //return strb.toString();
        //读取-----------------end
        return R.ok();
    }
}
