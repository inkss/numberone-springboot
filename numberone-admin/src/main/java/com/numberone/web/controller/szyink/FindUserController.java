package com.numberone.web.controller.szyink;


import com.numberone.framework.web.base.BaseController;
import com.numberone.system.domain.SysUser;
import com.numberone.system.service.ISysDictDataService;
import com.numberone.system.service.ISysUserService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/szyink/dzgj")
public class FindUserController extends BaseController {

    private String prefix = "szyink/dzgj";

    @Autowired
    private ISysDictDataService dictDataService;

    @Autowired
    private ISysUserService userService;

    @RequiresPermissions("szyink:dzgj:view")
    @GetMapping()
    public String index(ModelMap mmap) {


        SysUser user = getSysUser();
        user.setSex(dictDataService.selectDictLabel("sys_user_sex", user.getSex()));
        mmap.put("user", user);
        mmap.put("roleGroup", userService.selectUserRoleGroup(user.getUserId()));
        mmap.put("postGroup", userService.selectUserPostGroup(user.getUserId()));


        return prefix + "/dzgj.html";
    }


}


