package com.numberone.web.controller.suser;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/suser/customroute")
public class CustomRouteController {

    private String prefix = "suser/customroute/";



    @RequiresPermissions("user:suser:view")
    @GetMapping
    public String index() {
        return prefix + "customr.html";
    }

}
