package com.numberone.suncustom.repository;

import com.numberone.suncustom.domain.UserRoute;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;


public interface UserRouteRepository extends JpaRepository<UserRoute, Long> {

    UserRoute findByUserRouteId(Long userRouteId);

    UserRoute findByLoginName(String loginName);

    @Transactional
    Void deleteByUserRouteId(Long id);


}
