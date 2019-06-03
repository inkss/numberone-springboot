package com.numberone.web.controller.suser;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/suser/recruit")
public class UserRecruitController {

    private String prefix = "suser/userrecruit/";

    @RequiresPermissions("user:recruit:view")
    @GetMapping
    public String index() {
        return prefix + "userRecruit.html";
    }
}
