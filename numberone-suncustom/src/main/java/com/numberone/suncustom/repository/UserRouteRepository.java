package com.numberone.suncustom.repository;

import com.numberone.suncustom.domain.UserRoute;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRouteRepository extends JpaRepository<UserRoute, Long> {

    UserRoute findByUserRouteId(Long userRouteId);

    UserRoute findByLoginName(String loginName);

}
