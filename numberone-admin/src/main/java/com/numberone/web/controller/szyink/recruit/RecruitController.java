package com.numberone.web.controller.szyink.recruit;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/szyik/recruit")
public class RecruitController {

    private String prefix = "szyink/recruit/";

    @RequiresPermissions("szyink:recruit:view")
    @GetMapping
    public String index() {
        return prefix + "recruit.html";
    }

}
