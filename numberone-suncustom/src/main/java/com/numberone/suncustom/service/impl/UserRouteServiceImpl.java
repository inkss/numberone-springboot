package com.numberone.suncustom.service.impl;

import com.numberone.suncustom.domain.UserRoute;
import com.numberone.suncustom.repository.UserRouteRepository;
import com.numberone.suncustom.service.UserRouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserRouteServiceImpl implements UserRouteService {

    @Autowired
    private UserRouteRepository routeRepository;

    @Override
    public UserRoute findByUserRouteId(Long id) {
        return routeRepository.findByUserRouteId(id);
    }

    @Override
    public UserRoute findByLoginName(String loginName) {
        return routeRepository.findByLoginName(loginName);
    }

    @Override
    public void insertUserRoute(UserRoute userRoute) {
        routeRepository.save(userRoute);
    }
}
