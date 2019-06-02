package com.numberone.web.controller.szyink.route;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
@RequestMapping("/szyink/route")
public class RouteController {

    private String prefix = "szyink/route/";

    @RequiresPermissions("szyink:xlgl:view")
    @GetMapping
    public String index() {
        return prefix + "route.html";
    }


}
