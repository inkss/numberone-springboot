package com.szyink.custombus.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class userController {

    @RequestMapping("/hello")
    public String hello(){
        return "hello world,quick!";
    }
}
