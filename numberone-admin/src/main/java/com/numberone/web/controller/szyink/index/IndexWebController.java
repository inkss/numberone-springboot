package com.numberone.web.controller.szyink.index;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 网站的首页，在 ShiroConfig.java 里配置了忽略过滤
 * 对应的文件位置为 /index/index.html
 */
@Controller
@RequestMapping("/index-main")
public class IndexWebController {

    private String prefix = "index/";

    @GetMapping
    public String index() {

        return prefix + "index.html";
    }
}
