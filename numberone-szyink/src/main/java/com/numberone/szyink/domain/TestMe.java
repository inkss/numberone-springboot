package com.numberone.szyink.domain;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class TestMe {

    @Id
    private int id;

    private String userName;

    private String password;

    private String realName;

    private String idCard;

    private String email;

    private String phone;

    public TestMe() {
    }

    public void Hello() {
        System.out.println("你是你是你是");
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPasswd() {
        return password;
    }

    public void setPasswd(String passwd) {
        this.password = passwd;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
