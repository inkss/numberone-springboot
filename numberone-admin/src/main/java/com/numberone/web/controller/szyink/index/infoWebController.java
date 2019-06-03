package com.numberone.web.controller.szyink.index;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/info")
public class infoWebController {
    private String prefix = "index/";

    @GetMapping
    public String info() {

        return prefix + "info.html";
    }
}
