package com.numberone.suncustom.service;

import com.numberone.suncustom.domain.UserRoute;


public interface UserRouteService {

    UserRoute findByUserRouteId(Long id);

    UserRoute findByLoginName(String loginName);

    void delectById(Long id);

    void insertUserRoute(UserRoute userRoute);


}
