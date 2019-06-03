package com.numberone.suncustom.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
public class UserRoute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userRouteId;

    @Column(length = 30)
    private String loginName;

    @Column(length = 100)
    private String livePlace;

    @Column(length = 100)
    private String jobPlace;

    @Column(length = 20)
    private String startTime;

    @Column(length = 20)
    private String endTime;

    @Column(length = 10)
    private Integer nowType;

    private Date operTime;

    public UserRoute(String loginName, String livePlace, String jobPlace, String startTime, String endTime, Integer nowType, Date operTime) {
        this.loginName = loginName;
        this.livePlace = livePlace;
        this.jobPlace = jobPlace;
        this.startTime = startTime;
        this.endTime = endTime;
        this.nowType = nowType;
        this.operTime = operTime;
    }

    public UserRoute() {
        super();
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public Long getUserRouteId() {
        return userRouteId;
    }

    public void setUserRouteId(Long userRouteId) {
        this.userRouteId = userRouteId;
    }

    public String getLivePlace() {
        return livePlace;
    }

    public void setLivePlace(String livePlace) {
        this.livePlace = livePlace;
    }

    public String getJobPlace() {
        return jobPlace;
    }

    public void setJobPlace(String jobPlace) {
        this.jobPlace = jobPlace;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public Integer getNowType() {
        return nowType;
    }

    public void setNowType(Integer nowType) {
        this.nowType = nowType;
    }

    public Date getOperTime() {
        return operTime;
    }

    public void setOperTime(Date operTime) {
        this.operTime = operTime;
    }

    @Override
    public String toString() {
        return "UserRoute{" +
                "userRouteId=" + userRouteId +
                ", loginName='" + loginName + '\'' +
                ", livePlace='" + livePlace + '\'' +
                ", jobPlace='" + jobPlace + '\'' +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", nowType=" + nowType +
                ", operTime=" + operTime +
                '}';
    }
}
