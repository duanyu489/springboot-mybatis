package com.dy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UrlController {

    @RequestMapping("{url}.html")
    public String  urlIndex(@PathVariable("url") String url){
        return "/"+url;
    }

    @RequestMapping("{page}/{url}.html")
    public String  urlPage(@PathVariable("page") String page,@PathVariable("url") String url){
        return page+"/"+url;
    }

}
