package com.numberone.web.controller.suser;


import com.google.gson.Gson;
import com.numberone.common.json.JSONObject;
import com.numberone.suncustom.domain.UserRoute;
import com.numberone.suncustom.service.UserRouteService;
import com.numberone.system.service.ISysUserService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;


@Controller
@RequestMapping("/suser/customroute")
public class CustomRouteController {

    private String prefix = "suser/customroute/";

    @Autowired
    private UserRouteService userRouteService;

    @Autowired
    private ISysUserService userService;

    @RequiresPermissions("user:suser:view")
    @GetMapping
    public String index() {
        return prefix + "customr.html";

    }


    @RequestMapping("/insert")
    @ResponseBody
    public Object insertCustomRoute(@RequestBody JSONObject params) {
        //{"live_place":"大连市中山区大连大学附属中山医院","job_place":"大连市中山区大连火车站-公交车站","work_time":"09:00","off_time":"18:00","now_type":"2"}
        try {
            String livePlace = params.getStr("live_place");
            String jobPlace = params.getStr("job_place");
            String workTime = params.getStr("work_time");
            String offTime = params.getStr("off_time");
            Integer nowType = Integer.valueOf(params.getStr("now_type"));
            String loginName = params.getStr("loginName");

            UserRoute routes = userRouteService.findByLoginName(loginName);
            UserRoute userRoute = new UserRoute(loginName, livePlace, jobPlace, workTime, offTime, nowType, new Date());
            if (routes != null) {
                //修改操作  如果使用的JPA,应该是 findByUid之后 将新的值对old进行赋值,最后对old值进行flush(),即可完成更新,而不应该去更新新的实体.
                routes.setJobPlace(userRoute.getJobPlace());
                routes.setLivePlace(userRoute.getLivePlace());
                routes.setEndTime(userRoute.getEndTime());
                routes.setStartTime(userRoute.getStartTime());
                routes.setOperTime(new Date());
                routes.setNowType(userRoute.getNowType());
                userRouteService.insertUserRoute(routes);
                return "2"; // 视为已经存在定制需求
            } else {
                userRouteService.insertUserRoute(userRoute);
                return 1;
            }
        } catch (Exception e) {
            return 0;
        }
    }

    @RequestMapping("/first")
    @ResponseBody
    public Object firstSelect(@RequestBody JSONObject params) {
        String loginName = params.getStr("loginName");
        Gson gson = new Gson();
        return gson.toJson(userRouteService.findByLoginName(loginName));
    }

}
