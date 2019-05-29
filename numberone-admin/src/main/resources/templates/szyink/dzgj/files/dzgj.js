function G(id) {
    return document.getElementById(id);
}
     
//测试某个字符是属于哪一类.        
function CharMode(iN) {
    if (iN >= 48 && iN <= 57) //数字               
        return 1;
    if (iN >= 65 && iN <= 90) //大写字母             
        return 2;
    if (iN >= 97 && iN <= 122) //小写          
        return 4;
    else
        return 8; //特殊字符        
}       
//计算出当前密码当中一共有多少种模式     
function bitTotal(num) {
    modes = 0;
    for (i = 0; i < 4; i++) {
        if (num & 1) modes++;
        num >>>= 1;
    }
    return modes;
}    
//返回密码的强度级别   
function checkStrong(sPW) {
    if (sPW.length < 6)
        return 1; //密码太短         
    Modes = 0;
    for (i = 0; i < sPW.length; i++) {
        //测试每一个字符的类别并统计一共有多少种模式.              
        Modes |= CharMode(sPW.charCodeAt(i));
    }
    return bitTotal(Modes);
}     
//当用户放开键盘或密码输入框失去焦点时，根据不同的级别显示不同的颜色        
function pwStrength(pwd) {
    O_color = "#FF8400";
    L_color = "#FF0000";
    M_color = "#ff6600";
    H_color = "#33CC00";
    if (pwd == null || pwd == '') {
        Lcolor = Mcolor = Hcolor = O_color;
    }
    else {
        S_level = checkStrong(pwd);
        switch (S_level) {
            case 0:
                Lcolor = Mcolor = Hcolor = O_color;
                break;
            case 1:
                Lcolor = L_color;
                Mcolor = Hcolor = O_color;
                break;
            case 2:
                Lcolor = Mcolor = M_color;
                Hcolor = O_color;
                break;
            default:
                Lcolor = Mcolor = Hcolor = H_color;
        }
    }
    document.getElementById("strength_L").style.background = Lcolor;
    document.getElementById("strength_M").style.background = Mcolor;
    document.getElementById("strength_H").style.background = Hcolor;
    return;
}

//鼠标放在tr td上背景颜色随着变化
var highlightcolor = '#FFFFBB';
var clickcolor = '#51b2f6';
function mouseOver() {
    source = event.srcElement;
    if (source.tagName == "TR" || source.tagName == "TABLE")
        return;
    while (source.tagName != "TD")
        source = source.parentElement;
    source = source.parentElement;
    cs = source.children;
    if (cs[1].style.backgroundColor != highlightcolor && source.id != "nc" && cs[1].style.backgroundColor != clickcolor) {
        for (i = 0; i < cs.length; i++) {
            cs[i].style.backgroundColor = highlightcolor;
        }
    }
}

function mouseOut() {
    if (event.fromElement.contains(event.toElement) || source.contains(event.toElement) || source.id == "nc") {
        return;
    }
    if (event.toElement != source && cs[1].style.backgroundColor != clickcolor)
    {
        for (i = 0; i < cs.length; i++) {
            cs[i].style.backgroundColor = "";
        }
    }
}

// 打开密码强度的说明
function showexplain() {
    if (G('explain').style.display == 'block') {
        G('explain').style.display = 'none';
    } else {
        G('explain').style.display = 'block'
    }
    return false;
}

// 关闭密码强度的说明
function closeexplain() {
    G('explain').style.display = 'none';
    return false;
}
var duihao = "<img src='../img/ok.png' style=' margin-top:5px'>";
var cuo = "<img src='../img/error.png' style='vertical-align:sub;margin-right:4px'>";
// 检测身份证号码是否符合规范
function CheckIdCard() {
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X   
    var idCard = G("txtIdCard");
    var lb = G("sp_idCard");

    if (idCard.value == "" || idCard.value == null) {
        lb.innerHTML = cuo + '请输入身份证号码';
        return false;
    } else {
        if (isIdCard(idCard.value)) {
            lb.innerHTML = duihao;
            return true;
        } else {
            lb.innerHTML = cuo + '您输入的身份证号不符合规范';
            return false;
        }
    }
}
var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];// 加权因子;
var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];// 身份证验证位值，10代表X;

function isIdCard(gets) {
    if (gets.length == 15) {
        return isValidityBrithBy15IdCard(gets);
    } else if (gets.length == 18) {
        var a_idCard = gets.split("");// 得到身份证数组   
        if (isValidityBrithBy18IdCard(gets) && isTrueValidateCodeBy18IdCard(a_idCard)) {
            return true;
        }
        return false;
    }
    return false;
}

function isTrueValidateCodeBy18IdCard(a_idCard) {
    var sum = 0; // 声明加权求和变量   
    if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10;// 将最后位为x的验证码替换为10方便后续操作   
    }
    for (var i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i];// 加权求和   
    }
    valCodePosition = sum % 11;// 得到验证码所位置   
    if (a_idCard[17] == ValideCode[valCodePosition]) {
        return true;
    }
    return false;
}

function isValidityBrithBy18IdCard(idCard18) {
    var year = idCard18.substring(6, 10);
    var month = idCard18.substring(10, 12);
    var day = idCard18.substring(12, 14);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题   
    if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
        return false;
    }
    return true;
}

function isValidityBrithBy15IdCard(idCard15) {
    var year = idCard15.substring(6, 8);
    var month = idCard15.substring(8, 10);
    var day = idCard15.substring(10, 12);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
    if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
        return false;
    }
    return true;
}


// 检查邮箱是否符合规范
function CheckEmail() {
    var email = G("txtEmail");
    var lb = G("sp_email");

    if (email.value == "" || email.value == null){
        lb.innerHTML = '';
        return true;
    } else {
        if (/^([a-zA-Z0-9]+[_\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/g.test(email.value)) {
            lb.innerHTML = duihao;
            return true;
        } else {
            lb.innerHTML = cuo + "您输入的邮箱不符合规范";
            return false;
        }
    }
}
function CheckOldPwd() {
    var pwd = G("txtOldPwd").value;
    var lb = G("sp_oldpwd");

    if (pwd == "") {
        lb.innerHTML = cuo + '请输入原密码';
        return false;
    }
    else if (pwd.length < 6)
    {
        lb.innerHTML = cuo + '原密码为6-16位，由英文、数字及符号组成';
        return false;
    } else {
        lb.innerHTML = duihao;
        return true;
    }
}
function IsDLPassword()
{
    var pwd = G("Password").value;
    var lb = G("sp_pwd");

    if (pwd == "") {
        lb.innerHTML = cuo + '请输入密码';
        return false;
        // else if (pwd.length < 6) {
        //    lb.innerHTML = cuo + '密码为6-16位，由英文、数字及符号组成';
        //    return false;
        //
    }
    else {
        lb.innerHTML = duihao;
        return true;
    }

}

function CheckLoginPwd() {
    var pwd = G("Password").value;
    var lb = G("sp_pwd");

    if (pwd == "") {
        lb.innerHTML = cuo + '请输入密码';
        return false;
    } else if (pwd.length < 6) {
        lb.innerHTML = cuo + '密码为6-16位，由英文、数字及符号组成';
        return false;
    } else {
        lb.innerHTML = duihao;
        return true;
    }
}
// 检查登录输入的用户名是否正确
function CheckLoginName() {
    var lb = G("sp_name");
    var name = G("UserName").value;
    if (CheckPhone(name)) {
        lb.innerHTML = duihao;
        return true;
    }
    else if (name == "" || name == "请输入手机号码") {
        lb.innerHTML = cuo + '请输入手机号码';
        return false;
    }
    else if (!CheckPhone(name)) {
        lb.innerHTML = cuo + '您输入的手机号码不符合规范';
        return false;
    }
}

function IsDLName() {
    var lb = G("sp_name");
    var name = G("UserName");
    var reg = /^[0-9a-zA-Z]*$/g;
    if (name.value == "" || name.value == "请输入手机号码") {
        lb.innerHTML = cuo + '请输入手机号码';
        return false;
    } else if (reg.test(name.value) == false) {
        name.value = "";
        lb.innerHTML = cuo + "只能填写数字、字母或组合！";
        return false;
    } else {
        lb.innerHTML = duihao;
        return true;
    }
    

};
// 检查密码
function CheckAllPwd() {
    CheckPwd();
    CheckTwoPwd();
    var pw1 = G("txtPwd").value; // 密码
    var pw2 = G("txtPwdTwo").value; // 确认密码
    if (pw1.length >= 6 && pw2.length >= 6 && pw1 == pw2)
    {
        return true;
    } else
    {
        return false;
    }
}
// 判断登录密码
function CheckPwd() {
    var pw1 = G("txtPwd").value; // 密码
    var pw2 = G("txtPwdTwo").value; // 确认密码
    var lb1 = G("sp_pwd");  // 密码提示
    var lb2 = G("sp_pwdTwo");  // 确认密码提示
    if (pw2 == "") {
        if (pw1 == "") {
            lb1.innerHTML = cuo + '请输入登录密码';
        }
        else if (pw1.length < 6) {
            lb1.innerHTML = cuo + '密码为6-16位，由英文、数字及符号组成';
        } else {
            lb1.innerHTML = duihao;
        }
    } else {
        if (pw1 == "") {
            lb1.innerHTML = cuo + '请输入登录密码';
        }
        else if (pw1.length < 6) {
            lb1.innerHTML = cuo + '密码为6-16位，由英文、数字及符号组成';
        } else {
            lb1.innerHTML = duihao;
        }
        CheckTwoPwd();
    }
}
// 判断确认密码
function CheckTwoPwd() {
    var pw1 = G("txtPwd").value; // 密码
    var pw2 = G("txtPwdTwo").value; // 确认密码
    var lb1 = G("sp_pwd");  // 密码提示
    var lb2 = G("sp_pwdTwo");  // 确认密码提示
    lb2.innerHTML = "*";
    if (pw2 == "") {
        lb2.innerHTML = cuo + '请输入确认密码';
    }
    if (pw1 != "") {
        if (pw2 == "") {
            lb2.innerHTML = cuo + '请输入确认密码';
        }else if (pw1 == pw2) {
            lb2.innerHTML = duihao;
        } else {          
            lb2.innerHTML = cuo + '确认密码与登录密码不一致';
        }
    } 
}
// 检测两次输入的密码是否符合规则
function CheckPassWord() {
    var pw1 = G("txtPwd").value; // 密码
    var pw2 = G("txtPwdTwo").value; // 确认密码
    var lb1 = G("sp_pwd");  // 密码提示
    var lb2 = G("sp_pwdTwo");  // 确认密码提示
    if ((pw1 != "") && (pw1.length < 6)) {
        lb1.innerHTML = cuo + '密码为6-16位，由英文、数字及符号组成';
    }
    else if(pw1 != "" && pw1.length >= 6 && pw2 == ""){
        lb1.innerHTML = duihao;
    }
    else if (pw1 != "" && pw2 != "") {
        if (pw1 == pw2) {
            lb1.innerHTML = duihao;
            lb2.innerHTML = duihao;
        } else {
            lb2.innerHTML = cuo + '确认密码与登录密码不一致';
        }
    } else if (pw1 == "" && pw2 == "") {
        lb1.innerHTML = cuo + '请输入登录密码';
        lb2.innerHTML = cuo + '请输入确认密码';
    }
    else if (pw1 == "") {
        lb1.innerHTML = cuo + '请输入登录密码';
    } else if (pw2 == "") {
        lb2.innerHTML = cuo + '请输入确认密码';
    }
    else {
        lb1.innerHTML = '*';
        lb2.innerHTML = '*';
    }
}
// 检测手机号码是否符合规范
function CheckPhone(phone) {
    if (/^1[3,4,5,7,8]\d{9}$/g.test(phone)) {
        return true;
    } else {
        return false;
    }
}
// 判断输入的用户名是否符合规范
function CheckName(name)
{
    PageMethods.CheckUserName(name.value, OnSucceeded);
}

function CheckTempName(name) {
    PageMethods.CheckTempName(name.value, OnSucceeded6);
}

function OnSucceeded6(result, userContext, methodName) {
    //var login = "<a href='Login.aspx' style='color:blue;margin-left:3px'>登录</a>";

    G("hidbj1").value = "0";
    G("sp_code").innerHTML = "*";
   
    lb = G("sp_name");
    var name = G("UserName").value;
    if (methodName == "CheckTempName") {
        if ((result == true) && (CheckPhone(name))) {
            lb.innerHTML = duihao;
            G("hidbj").value = "1";
        }
        else if (result == false && CheckPhone(name)) {
            lb.innerHTML = cuo + '该手机号码已注册，请直接登录';
            G("hidbj").value = "0";
        }
        else if (name == "" || name == "请输入手机号码") {
            lb.innerHTML = cuo + '请输入手机号码';
            G("hidbj").value = "0";
        }
        else if (!CheckPhone(name)) {
            lb.innerHTML = cuo + '您输入的手机号码不符合规范';
            G("hidbj").value = "0";
        }
    }
}
// 判断输入的找回密码是否正确
function CheckFindName(name) {
    PageMethods.CheckUserName(name.value, OnSucceeded2);
}
function CheckTempFindName(name) {
    PageMethods.CheckFindTempName(name.value, OnSucceeded12);
}
    function OnSucceeded(result, userContext, methodName) {
        //var login = "<a style='color:blue;margin-left:3px'>登录</a>";

        G("hidbj1").value = "0";
        G("sp_code").innerHTML = "*";
        G("txtCode").value = "";
        lb = G("sp_name");
        var name = G("UserName").value;
        if (methodName == "CheckUserName") {
            if ((result == true) && (CheckPhone(name))) {
                lb.innerHTML = duihao;
                G("hidbj").value = "1";
            }
            else if (result == false && CheckPhone(name)) {
                lb.innerHTML = cuo + '该手机号码已注册，请直接登录';
                G("hidbj").value = "0";
            }
            else if (name == "" || name == "请输入手机号码") {
                lb.innerHTML = cuo + '请输入手机号码';
                G("hidbj").value = "0";
            }
            else if (!CheckPhone(name)) {
                lb.innerHTML = cuo + '您输入的手机号码不符合规范';
                G("hidbj").value = "0";
            }
        }
    }
function OnSucceeded2(result, userContext, methodName) {
    var zhuce = "<a href='Register.aspx' style='color:blue'>注册</a>"

    G("hidbj1").value = "0";
    G("sp_code").innerHTML = "*";
    G("txtCode").value = "";

    lb = G("sp_name");
    var name = G("UserName").value;
    if (methodName == "CheckUserName") {
        if ((result == true) && (CheckPhone(name))) {
            lb.innerHTML = duihao;
            G("hidbj").value = "1";
        }
        else if (result == false && CheckPhone(name)) {
            lb.innerHTML = cuo + '该手机号码尚未注册，请选择' + zhuce;
            G("hidbj").value = "0";
        }
        else if (name == "" || name == "请输入手机号码") {
            lb.innerHTML = cuo + '请输入手机号码';
            G("hidbj").value = "0";
        }
        else if (!CheckPhone(name)) {
            lb.innerHTML = cuo + '您输入的手机号码不符合规范';
            G("hidbj").value = "0";
        }
    }
}
function OnSucceeded12(result, userContext, methodName) {
    var zhuce = "<a href='Register.aspx' style='color:blue'>注册</a>"

    G("hidbj1").value = "0";
    G("sp_code").innerHTML = "*";

    lb = G("sp_name");
    var name = G("UserName").value;
    if (methodName == "CheckFindTempName") {
        if ((result == true) && (CheckPhone(name))) {
            lb.innerHTML = duihao;
            G("hidbj").value = "1";
        }
        else if (result == false && CheckPhone(name)) {
            lb.innerHTML = cuo + '该手机号码尚未注册，请选择' + zhuce;
            G("hidbj").value = "0";
        }
        else if (name == "" || name == "请输入手机号码") {
            lb.innerHTML = cuo + '请输入手机号码';
            G("hidbj").value = "0";
        }
        else if (!CheckPhone(name)) {
            lb.innerHTML = cuo + '您输入的手机号码不符合规范';
            G("hidbj").value = "0";
        }
    }
}
// 判断获得手机验证码是否正确
function CheckCodeM(name)
{
    PageMethods.CheckMyCode(name.value, OnSucceeded1);
}

function OnSucceeded1(result, userContext, methodName)
{
    lb = G("sp_code");
    if (methodName == "CheckMyCode") {
        if (result == true) {
            lb.innerHTML = duihao;
            G("hidbj1").value = "1";
        } else if (G("txtCode").value == "") {
            lb.innerHTML = cuo + '请输入手机验证码'
            G("hidbj1").value = "0";
        }
        else {
            lb.innerHTML = cuo + '手机验证码错误'
            G("hidbj1").value = "0";
        }
    }
}
// 判断服务协议是否同意
function CheckAgree() {
    var chb = G("chkAgreement");
    lb = G("sp_agreement");
    if (!chb.checked) {
        lb.innerHTML = cuo + '您还没有同意协议';
        return false;
    } else {
        lb.innerHTML = duihao;
        return true;
    }
}
// 判断真实姓名是否填写
function CheckRealName(name) {
    var temp = name.value;
    var span = G("sp_realname");
    if (temp == "") {
        span.innerHTML = cuo + "请输入真实姓名";
        return false;
    }
    else if (temp.length > 5)
    {
        span.innerHTML = cuo + "姓名过长，最大长度5";
        return false;
    }
    else {
        span.innerHTML = duihao;
        return true;
    }
}
// 点击注册 检测输入的信息是否符合规范
function CheckRegister()
{    
    var name = G("UserName");
    var code = G("txtCode");
    var realName = G("txtRealName");
    CheckTempName(name);
    CheckCodeM(code);
    var bj = G("hidbj").value;
    var bj1 = G("hidbj1").value;

    if (bj == "1" & bj1 == "1" & CheckIdCard() & CheckAgree() & CheckAllPwd() & CheckRealName(realName) & CheckEmail())
    {
        return true;
    }
    else
    {
        return false;
    }
}
    
function CheckChangePhone() {
    var name = G("UserName");
    var code = G("txtCode");
    CheckTempName(name);
    CheckCodeM(code);
    var bj = G("hidbj").value;
    var bj1 = G("hidbj1").value;

    if (bj == "1" & bj1 == "1" & CheckIdCard() & CheckAgree() & CheckAllPwd() & CheckRealName(realName) & CheckEmail()) {
        return true;
    } else {
        return false;
    }

}


function CheckChangePhoneInfo() {
    var name = G("UserName");
    var code = G("txtCode");
    CheckTempName(name);
    CheckCodeM(code);
    var bj = G("hidbj").value;
    var bj1 = G("hidbj1").value;

    if (bj == "1" & bj1 == "1") {
        return true;
    } else {
        return false;
    }

}
/*判断验证码是否正确*/

function CheckCodeU(code)
{
    PageMethods.CheckCodeMethod(code.value, OnCheckCodes);
}

function OnCheckCodes(result, userContext, methodName) {
    var img = G("Image1");
    lb = G("CodeSpan");
    var code = G("CheckCode").value;
    if (methodName == "CheckCodeMethod") {
        if (code == "") {
            lb.innerHTML = cuo + '请输入验证码';
            G("tempcode").value = "0";
            img.src = img.src + "?";
        }
        else if (result == true && code != "")
        {
            lb.innerHTML = duihao;
            G("tempcode").value = "1";
        } else if (result == false && code != "") {
            lb.innerHTML = cuo + '验证码填写错误';
            G("tempcode").value = "0";
            G("CheckCode").value = "";
            //img.src = img.src + "?";
        }
    }
}

function CheckFindPwd() {
    var name = G("UserName");
    var code = G("txtCode");

    CheckTempFindName(name);
    CheckCodeM(code);
    var bj = G("hidbj").value;
    var bj1 = G("hidbj1").value;

    if (bj == "1" & bj1 == "1" & CheckAllPwd()) {
        return true;
    } else {
        return false;
    }
}

function CheckPersonSet()
{
    var realname = G("txtRealName");
    if (CheckIdCard() & CheckEmail()& CheckRealName(realname)) {
        return true;
    }
    else
    {
        return false;
    }
}

function CheckChangePwd() {
    if (CheckOldPwd() &CheckAllPwd()) {
        return true;
    } else {
        return false;
    }
}
// 检查登录的用户名和密码是否填写正确
function CheckLogin() {
    CheckCodeU(G("CheckCode"));
    //alert(G("tempcode").value);
    if (IsDLName() & IsDLPassword() & G("tempcode").value == "1") {
        return true;
    } else {
        return false;
    }
}

function SetHeader(id) {
    document.getElementById(id).getElementsByTagName("a").item(0).style.cssText = "background:#51a4f1; color:white;";
}

function SetLeft(id) {
    document.getElementById(id).style.cssText = "color:#FF8400;";
}

function setSettingId(id) {
    $("#hidSettingId").val(id);
}

function CheckRadio(radioName)   
{   
    var obj = document.getElementsByName(radioName);
    for (i = 0; i < obj.length; i++)
    {
        if (obj[i].checked)
        {
            return true;
        }   
    }           
    return false;
}

function two(a) {
    var b = a + "";
    if (b.length < 2) {
        return "0" + a;
    }
    else {
        return a;
    }
}

function changeDate(index) {
    var temp = index.split('-');
    var b = new Date(parseInt(temp[0]), parseInt(temp[1]) - 1, parseInt(temp[2]));
    return b;
}

// 获得输入月份的上班天数
function GetWorkdays() {
    var start = G("startdate").value;
    var end = G("enddate").value;
    var count = 0;
    if (start != "" && end != "") {
        var a = changeDate(start);
        var b = changeDate(end);       
        for (var i = a.getDate() ; i <= b.getDate() ; i++) {      
            var j = new Date(parseInt(a.getFullYear()), parseInt(a.getMonth()), i);
            var day = j.getDay();
            if (day != 6 && day != 0) {  // 1--5
                var temp = true;
                for (var x = 0 ; x < holidays.length ; x++)
                {
                    var datex = changeDate(holidays[x]);
                    if (datex.getTime() == j.getTime()) // 法定假日
                    {
                        temp = false;
                    }
                }
                if (temp) {
                    count++;
                }
            }
            if (day == 6 || day == 0) {
                var temp = false;
                for (var y = 0 ; y < workdays.length; y++) // 周末上班
                {
                    var datey = changeDate(workdays[y]);
                    if (datey.getTime() == j.getTime())
                    {
                        temp = true;
                    }
                }
                if (temp) {
                    count++;
                }
            }
        }
    }
    var price = G("hidOneWayPrice").value;
    G("myDay").value= count;
    G("myPrice").value = 2 * count * parseInt(price);
    var hidMyPrice = G("hidMyPrice");
    var hidMyDays = G("hidMyDays");
    if (hidMyPrice != null)
    {
        hidMyPrice.value = 2 * count * parseInt(price);
    }
    if (hidMyDays != null) 
    {
        hidMyDays.value = count;
    }
    initSeatNum("0");
    return false;
}

    function GetNowWorkdays() {
        //var a = new Date();
        //var b = a.getFullYear() + "-" + two(a.getMonth() + 1) + "-" + two(a.getDate());
        //G("startdate").value = b;
        //var c = new Date(a.getFullYear(), a.getMonth() + 1, 0);
        //var d = c.getFullYear() + "-" + two(c.getMonth() + 1) + "-" + two(c.getDate());
        //G("enddate").value = d;
        GetWorkdays();
    }

    //function CheckOpenApply() {
    //    var startname = G("dplStart").value;
    //    var endname = G("dplEnd").value;
    //    if (startname == "") {
    //        alert("您还没有选择始发站");
    //        return false;
    //    } else if (endname == "") {
    //        alert("您还没有选择终点站");
    //        return false;
    //    } else {
    //        return true;
    //    }
    //}

    function setLineId(id) {
        $("#hidLineId").val(id);
    }

function preshow(sh) {
    if (sh == "0") { //退款
        G("cancel").style.display = 'block';
        G("haspay").style.display = 'block';
        G("lblSuccess").style.display = 'none';
    }
    else if (sh == "1") { // 已付款
        G("cancel").style.display = 'block';
        G("haspay").style.display = 'block';
        G("lblNodate").style.display = 'none';
    }
    else if (sh == "2") { // 待付款
        G("cancel").style.display = 'block';
        G("nopay").style.display = 'block';
    }
    else if (sh == "4") { // 可退款
        G("cancel").style.display = 'block';
        G("tui").style.display = 'block';
    }
    else if (sh == "5") {
        G("cancel").style.display = 'block';
        G("nopay").style.display = 'block';
        G("btnPay").style.display = "none";
        G("lblNosdate").style.display = "";
    }
    else {
        G("bao").style.display = 'block';
        G("apply").style.display = 'block';
    }
}

function openshow(sh) {
    if (sh == "1") {
        G("cancel").style.display = 'block';
        G("haspay").style.display = 'block';
    } else if (sh == "2") {
        G("cancel").style.display = 'block';
        G("nopay").style.display = 'block';
        G("lblNodate").style.display = "none";
    }else if(sh=="3"){
        G("cancel").style.display = 'block';
        G("nopay").style.display = 'block';
        G("btnPay").style.display = "none";
    }
    else {
        G("bao").style.display = 'block';
        G("apply").style.display = 'block';
    }
}

function recruitshow(sh) {
    //alert(sh);
    if (sh == "1") {
        G("cancel").style.display = 'block';
        G("nopay").style.display = 'block';
        G("lblSuccess").style.display = "";
    }
    else {
        G("bao").style.display = 'block';
        G("apply").style.display = 'block';
    }
}
/*-------------------------------------------*/
var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount; //当前剩余秒数

// 点击发送短信执行操作，并进行倒计时
function SendMsg() {
    curCount = count;
    var phone = $("#UserName").val();
    var code = $("#CheckCode").val();
    var flag = G("tempcode").value;
    var bj = G("hidbj").value;
    if (phone == "" || phone == "请输入手机号码") {
        alert("您还没有输入手机号码");
        return;
    }
    if (bj != "1") {
        alert("请输入符合规范的电话号码");
        return;
    }
    if (code == "") {
        alert("您还没有输入验证码");
        return;
    }
    if (flag == "0") {
        alert("请输入正确验证码");
        return;
    }
    $.ajax({
        type: "get", //用POST方式传输
        dataType: "text", //数据格式:JSON
        url: 'Handler.ashx', //目标地址
        data: { action: "Captcha", value: $("#UserName").val() },
        //async: true,
        success: function (msg) {
            //alert(msg);
            G("txtCode").value = "";
            G("sp_code").innerHTML = "*";
            if (msg != "") {
                $("#btnSendCode").attr("disabled", "true");
                $("#btnSendCode").css("background-color", "#B5B5B5");
                InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
            }
        }
    });
}
// 获取倒计时时间
function SetRemainTime() {
    if (curCount == 0) {
        window.clearInterval(InterValObj); //停止计时器
        $("#btnSendCode").removeAttr("disabled"); //启用按钮
        $("#btnSendCode").css("background-color", "#38B348");
        $("#btnSendCode").val("获取验证码");
    }
    else {
        curCount--;
        $("#btnSendCode").val("重新获取(" + curCount + ")");
    }
}

//========================基于artdialog插件========================
//可以自动关闭的提示，基于artdialog插件
function jsprint(msgtitle, url, callback) {
    var d = dialog({ content: msgtitle }).show();
    setTimeout(function () {
        d.close().remove();
    }, 2000);
    if (url != "") {
        location.href = url;
    }
    //执行回调函数
    if (arguments.length == 3) {
        callback();
    }
}
//弹出一个Dialog窗口
function jsdialog(msgtitle, msgcontent, url) {
    var d = dialog({
        title: msgtitle,
        content: msgcontent,
        okValue: '确定',
        ok: function () { },
        onclose: function () {
           location.href = url;
        }
    }).showModal();
}
//打开一个最大化的Dialog
function ShowMaxDialog(tit, url) {
    dialog({
        title: tit,
        url: url
    }).showModal();
}
//执行回传函数
function ExePostBack(objId, objmsg) {
    if ($(".checkall input:checked").size() < 1) {
        parent.dialog({
            title: '提示',
            content: '对不起，请选中您要操作的记录！',
            okValue: '确定',
            ok: function () { }
        }).showModal();
        return false;
    }
    var msg = "删除记录后不可恢复，您确定吗？";
    if (arguments.length == 2) {
        msg = objmsg;
    }
    parent.dialog({
        title: '提示',
        content: msg,
        okValue: '确定',
        ok: function () {
            __doPostBack(objId, '');
        },
        cancelValue: '取消',
        cancel: function () { }
    }).showModal();

    return false;
}
//检查是否有选中再决定回传
function CheckPostBack(objId, objmsg) {
    var msg = "对不起，请选中您要操作的记录！";
    if (arguments.length == 2) {
        msg = objmsg;
    }
    if ($(".checkall input:checked").size() < 1) {
        parent.dialog({
            title: '提示',
            content: msg,
            okValue: '确定',
            ok: function () { }
        }).showModal();
        return false;
    }
    __doPostBack(objId, '');
    return false;
}
//执行回传无复选框确认函数
function ExeNoCheckPostBack(objId, objmsg) {
    var msg = "删除记录后不可恢复，您确定吗？";
    if (arguments.length == 2) {
        msg = objmsg;
    }
    parent.dialog({
        title: '提示',
        content: msg,
        okValue: '确定',
        ok: function () {
            __doPostBack(objId, '');
        },
        cancelValue: '取消',
        cancel: function () { }
    }).showModal();

    return false;
}
//======================以上基于artdialog插件======================
function closetipx()
{
    G("surveytip").style.display = "none";
}
function closetipy() {
    G("surveytipy").style.display = "none";
}
// 滚动新闻
function rollnews(ticker) {
    ticker.css("overflow", "hidden");
    function animator(currentItem) {
        var distance = currentItem.height();
        // 改变0.02即可改变滚动速度 + 加速 - 加速
        duration = (distance + parseInt(currentItem.css("marginTop"))) / 0.02;
        currentItem.animate({ marginTop: -distance }, duration, "linear", function () {
            currentItem.appendTo(currentItem.parent()).css("marginTop", 0);
            animator(currentItem.parent().children(":first"));
        });
    };
    animator(ticker.children(":first"));
    ticker.mouseenter(function () {
        ticker.children().stop();
    });
    ticker.mouseleave(function () {
        animator(ticker.children(":first"));
    });
}


function checkRefund()
{
    //alert(id);
    var id = G("hidOrderId").value;
    alert(id);
    $.ajax({
        type: "get", //用POST方式传输
        dataType: "text", //数据格式:JSON
        url: 'CheckRefund.ashx?rand=' + (new Date()).getTime(), //目标地址
        data: { action: "Captcha", value: id },
        //async: true,
        success: function (msg)
        {
            //alert(msg);
            if (msg != "")
            {
                window.open("RefundsOnlineCheck.aspx?RefundNo=" + id);

            }
        }
    });
    return false;
}

function initSeatNum(sh) {
    //alert("zzz");
    var start = $("#startdate").val();
    var end = $("#enddate").val();
    if (sh == "2") {
        start = $("#txtStartDate").html();
        end = $("#txtEndDate").html();
    }
    $.ajax({
        type: "get", //用POST方式传输
        dataType: "text", //数据格式:JSON
        url: 'SeatNum.ashx?rand=' + (new Date()).getTime(), //目标地址
        data: { action: "Captcha", startdate: start, enddate:end, lid: $("#hidLineId").val() },
        success: function (result) {
            if (result != "error") {
                $("#hidSelectSeat").val(result);
                //alert($("#hidSelectSeat").val());
                indexMapSeat();
            } else {
                alert("数据出错了，请重新进行选择");
                window.open("MyOpenLine.aspx");
            }
        }
    });
}

function indexMapSeat() {
    $("#divzero").hide();
    $("#divone").hide();
    $("#divtwo").hide();
    $("#divthree").hide();
    $("#divfour").hide();
    $("#divfive").hide();
    var typeid = $("#hidBusTypeId").val();
    if (typeid != "") {
        if (typeid == "0") {
            $("#divzero").show();
        } else if (typeid == "1") {
            $("#divone").show();
        } else if (typeid == "2") {
            $("#divtwo").show();
        } else if (typeid == "3") {
            $("#divthree").show();
        } else if (typeid == "4") {
            $("#divfour").show();
        } else if (typeid == "5") {
            $("#divfive").show();
        }
    }
    var ids = $("#hidSelectSeat").val().split(',');

    $("td.red").each(function ()
    {
        $(this).removeClass("red").addClass("none");
    });
    $("td.Green").each(function () {
        $(this).removeClass("Green").addClass("none");
    });
    $("td.none").each(function () {
        var html = $.trim($(this).html());
        for (var i = 0; i < ids.length; i++) {
            if (html == ids[i]) {
                $(this).removeClass("none").addClass("red");
                //alert(html);
            }
        }
    });
    $("td.none").each(function () {
        $(this).removeClass("none").addClass("Green");
    });
    

}


function CheckMyPay()
{
    var days = parseInt(G("hidMyDays").value);
    var price = parseFloat(G("hidMyPrice").value);
    //alert(days);
    //alert(price);
    if (days <= 0 || price <= 0)
    {
        alert("请选择合适的时间区间进行订购");
        return false;
    } else {
        G("loadingDiv").style.display = "";
        return true;
    }
}

//function LoadingHtml(msg) {
//    var _PageHeight = document.documentElement.clientHeight, _PageWidth = document.documentElement.clientWidth;
//    //计算loading框距离顶部和左部的距离（loading框的宽度为215px，高度为61px）
//    var _LoadingTop = _PageHeight > 61 ? (_PageHeight - 61) / 2 : 0, _LoadingLeft = _PageWidth > 215 ? (_PageWidth - 215) / 2 : 0;
//    //在页面未加载完毕之前显示的loading Html自定义内容
//    var _LoadingHtml = '<div><div id="loadingDiv" style="position:absolute;left:0;width:100%;height:' + _PageHeight + 'px;top:0;background:#f3f8ff;opacity:0.8;filter:alpha(opacity=80);z-index:10000;"><div style="position: absolute; cursor1: wait; left: ' + _LoadingLeft + 'px; top:' + _LoadingTop + 'px; width: auto; height: 28px; line-height: 27px; padding: 10px 10px 10px 50px; background: #fff url(../img/loading.gif) no-repeat scroll 10px 10px; border: 2px solid #0094FF; color: #0094FF; font-family:\'Microsoft YaHei\';">' + msg + '</div></div></div>';
//    //呈现loading效果
//    //alert(_LoadingHtml);
//    document.write(_LoadingHtml);
//    //监听加载状态改变
//    //document.onreadystatechange = completeLoading;
//}

//function completeLoading()
//{
//    if (document.readyState == "complete") {
//        var list = document.getElementById("loadingDiv");
//        if (list != null) {
//            list.parentNode.parentNode.removeChild(list.parentNode);
//        }
//        //list.style.display = "none";
//    }
//}

function CheckPrePay() {
    var days = parseInt(G("hidWorkDays").value);
    var price = parseFloat(G("hidLinePrice").value);
    //alert(days);
    //alert(price);
    if (days <= 0 || price <= 0) {
        alert("数据加载错误。");
        return false;
    } else {
        G("loadingDiv").style.display = "";
        return true;
    }
}

function checkLyInfo() {
    var title = G("txtMsgTitle").value;
    var content = G("txtMsgContent").value;
    //var phone = G("txtContact").value;
    if (title == "") {
        alert("请输入留言标题");
        return false;
    }
    if (title.length > 100) {
        alert("留言标题长度最大为100字符");
        return false;
    }
    if (content == "") {
        alert("请输入留言内容");
        return false;
    }
    //if (phone == "") {
    //    alert("请输入手机号码以便我们联系您");
    //    return false;
    //}
    //if (!CheckPhone(phone))
    //{
    //    alert("请输入正确的手机号码以便我们联系您");
    //    return false;
    //}
    return true;
}
