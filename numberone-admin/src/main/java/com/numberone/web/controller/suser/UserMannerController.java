package com.numberone.web.controller.suser;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/suser/usermanner")
public class UserMannerController {

    private String prefix = "suser/usermanner/";

    @RequiresPermissions("user:usermanner:view")
    @GetMapping
    public String index() {
        return prefix + "userManner.html";
    }
}
