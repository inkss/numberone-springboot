LoadAnalytics()
LoadBooks()
LoadPurchase()
LoadActiveLine()

Logined()
/*
 *  2015.12.29
 *  获取首页
 *
 */
function Logined(){
  var userid,loginDiv
  userid = getCookie('userID')
  loginDiv = $('#LoginOrLogout')
  if(userid ===''|| userid.length===0) {
    
  }
  else {
    loginDiv.html('<a href="./account.html">'+getCookie('nickname')+'</a><a href="#" class="logout hidden-xs">退出登录</a>')
    /*2015/1/13 用户没设置名称时显示“个人中心”*/
    if(($("#LoginOrLogout").find("a").eq(0).text())===''){
      $("#LoginOrLogout").find("a").eq(0).text("个人中心");
    }
  }
}
$(document).on('click','.logout',function(){
  var loginDiv = $('#LoginOrLogout')
  loginDiv.html('<a href="/login.html">登录</a><a href="register.html">注册</a>')
  removeCookie('userID')
  window.location.href = window.location.href
})
/*
 *  2015.12.28
 *  读取统计数据
 *
 */
function LoadAnalytics(){
  var date,year,month,monthEng,monthCss
  
  monthEng=new Array(12)
  monthEng[1]="jan"
  monthEng[2]="feb"
  monthEng[3]="mar"
  monthEng[4]="apr"
  monthEng[5]="may"
  monthEng[6]="jun"
  monthEng[7]="jul"
  monthEng[8]="aug"
  monthEng[9]="sep"
  monthEng[10]="oct"
  monthEng[11]="nov"
  monthEng[12]="dec"
  date = new Date()
  year = date.getFullYear()
  month  = date.getMonth()+2
  if(month>12) {
    month=1
    year+=1
  }
  monthCss = monthEng[month]
  
  $.ajax({
    url: './AjaxPage/GetStatisticsByWeb.ashx',
    data: {'year': year, 'month': month},
    type: 'get',
    dataType: 'json',
    success: function(result) {
      if(result.BespeakCount===0){
        month -= 1
        if(month<0){
          year -= 1
          month = 12
        }
        $.ajax({
          url: './AjaxPage/GetStatisticsByWeb.ashx',
          data: {'year': year, 'month': month},
          type: 'get',
          dataType: 'json',
          async: false,
          success: function(old_result) {
            result = old_result
            monthCss = monthEng[month]
          }
        })
      }
      new Vue({
        el: '#analytics-index',
        data: {
          ServiceCount: result.ServiceCount,
          RecruitCount: result.RecruitCount,
          PersonalNeedsCount: result.PersonalNeedsCount,
          OrderCount: result.OrderCount,
          BespeakCount: result.BespeakCount,
          MonthCss: monthCss
        }
      })
      $('#analytics-index').css({'visibility':'visible'})
    },
    error: function(e) {
      console.log(e)
      
      new Vue({
        el: '#analytics-index',
        data: {
          ServiceCount: 0,
          RecruitCount: 0,
          PersonalNeedsCount: 0,
          OrderCount: 0,
          BespeakCount: 0,
          MonthCss: monthCss
        }
      })
      $('#analytics-index').css({'visibility':'visible'})
    }
  })
}


/*
 *  2015.12.25
 *  读取ajax预约列表，绑到vue上
 *
 */
function LoadBooks(){
  var userID = getCookie('userID') === ''? 0 : getCookie('userID')
  
  var listJson = '',statusClass,statusText,statusYear,statusMonth,date,year,month
  date = new Date();
  year = date.getFullYear()
  month  = date.getMonth()+2
  if(month>12) {
    month=1
    year+=1
  }

  removeCookie('isOrdered');
  removeCookie('Ordered_Line');
  $.ajax({
    url: './AjaxPage/IndexAjaxPage.ashx',
    data: {'userid': userID, 'year':year, 'month':month, 'pageIndex': 1, 'pageSize': 5},
    type: 'get',
    dataType: 'json',
    success: function(result) {
      if(result.length===0||result===''){
        month -= 1
        if(month<0){
          year -= 1
          month = 12
        }
        $.ajax({
          url: './AjaxPage/IndexAjaxPage.ashx',
          data: {'userid': userID, 'year':year, 'month':month, 'pageIndex': 1, 'pageSize': 5},
          type: 'get',
          dataType: 'json',
          async: false,
          success: function(old_result) {
            result = old_result
          }
        })
      }
      statusClass = result[0].timeType === 1 ? 'init' : 'uninit'
      statusText = result[0].timeType === 1 ? '预约中' : '已结束'
      statusYear = result[0].cycleYear
      statusMonth = result[0].cycleMonth
      for(var i=0;i<result.length;i+=1) {
        if(result[i].isOrdered===true) {
          setCookie('isOrdered',1,1);
          setCookie('Ordered_Line',result[i].lineNum,1);
        }
      }
      new Vue({
        el: '#booking-list',
        data: {
          statusClass: statusClass,
          statusText: statusText,
          statusYear: statusYear,
          statusMonth: statusMonth,
          lists: result
        }
      })
      $('#booking-list').css({'visibility':'visible'})
    },
    error: function(e) {
      console.log(e)
      statusClass = 'uninit'
      statusText = '已结束'
      statusYear = year
      statusMonth = month
      
      new Vue({
        el: '#booking-list',
        data: {
          statusClass: statusClass,
          statusText: statusText,
          statusYear: statusYear,
          statusMonth: statusMonth,
          lists: result
        }
      })
      $('#booking-list').css({'visibility':'visible'})
    }
  })
}

function LoadPurchase(){
  var userID = getCookie('userID') === ''? 0 : getCookie('userID')
  
  var listJson = '',statusClass,statusText,statusYear,statusMonth,date,year,month
  date = new Date()
  year = date.getFullYear()
  month  = date.getMonth()+2;
  if(month>12) {
    month=2
    year+=1
  }

  removeCookie('ispay');
  $.ajax({
    url: './AjaxPage/orderAjaxPage.ashx',
    data: {'userid': userID, 'year':year, 'month':month, 'pageIndex': 1, 'pageSize': 5},
    type: 'get',
    dataType: 'json',
    success: function(result) {
      if(result.length===0||result===''){
        month -= 1
        
        if(month<0){
          year -= 1
          month = 12
        }

        $.ajax({
          url: './AjaxPage/orderAjaxPage.ashx',
          data: {'userid': userID, 'year':year, 'month':month, 'pageIndex': 1, 'pageSize': 5},
          type: 'get',
          dataType: 'json',
          async: false,
          success: function(old_result) {
            result = old_result
          }
        })
      }
//alert(result[0].IsCanOrder);
	  if (result[0].timeType == -1){
		  statusClass = 'uninit';
		  statusText = '已结束';
	  }else if (result[0].timeType == 0){
		  statusClass = 'notyet';
		  statusText = '未开始';
	  }else if (result[0].timeType == 1){
		  statusClass = 'init';
		  statusText = '订购中';
	  }
	  
      statusYear = result[0].cycleYear
      statusMonth = result[0].cycleMonth
      for(var i=0;i<result.length;i+=1) {
        if(result[i].ispay===true) {
          setCookie('ispay',1,1);
        }
      }
      new Vue({
        el: '#purchase-list',
        data: {
          statusClass: statusClass,
          statusText: statusText,
          statusYear: statusYear,
          statusMonth: statusMonth,
          lists: result
        }
      })
      $('#purchase-list').css({'visibility':'visible'})
    },
    error: function(e) {
      console.log(e)
      statusClass = 'uninit'
      statusText = '已结束'
      statusYear = year
      statusMonth = month
      
      new Vue({
        el: '#purchase-list',
        data: {
          statusClass: statusClass,
          statusText: statusText,
          statusYear: statusYear,
          statusMonth: statusMonth,
          lists: result
        }
      })
      $('#purchase-list').css({'visibility':'visible'})
    }
  })
}

function LoadActiveLine(){
  
  var listJson = '',statusYear,statusMonth,date,year,month
  
  date = new Date()
  year = date.getFullYear()
  month  = date.getMonth()+1
  
  $.ajax({
    url: './AjaxPage/GetIndexOpenList.ashx',
    data: {'year': year, 'month' : month, 'pageIndex': 1, 'pageSize': 5},
    type: 'get',
    dataType: 'json',
    success: function(result) {
      if(result.DataList.length===0||result.DataList===''){
        month -= 1
        if(month===0){
          year -= 1
          month = 12
        }
        $.ajax({
          url: './AjaxPage/GetIndexOpenList.ashx',
          data: {'year':year, 'month':month, 'pageIndex': 1, 'pageSize': 5},
          type: 'get',
          dataType: 'json',
          async: false,
          success: function(old_result) {
            result = old_result
          }
        })
      }
      
      statusYear = result.DataList[0].CycleYear
      statusMonth = result.DataList[0].CycleMonth
      
      new Vue({
        el: '#active-list',
        data: {
          statusYear: statusYear,
          statusMonth: statusMonth,
          lists: result.DataList
        }
      })
      $('#active-list').css({'visibility':'visible'})
    },
    error: function(e) {
      console.log(e)
      
      statusYear = year
      statusMonth = month
      
      new Vue({
        el: '#active-list',
        data: {
          statusYear: statusYear,
          statusMonth: statusMonth,
          lists: result.DataList
        }
      })
      $('#active-list').css({'visibility':'visible'})
    }
  })
}

$('#booking-list').on('click','li',function(){
  var _this = $(this)
  window.open('./bookinginfo.html?rid='+_this.data('rid')+'&year='+_this.data('year')+'&month='+_this.data('month'),'_blank')
})

$('#purchase-list').on('click','li',function(){
  var _this = $(this)
  window.open('./purchaseinfo.html?rid='+_this.data('rid')+'&year='+_this.data('year')+'&month='+_this.data('month'),'_blank')
})

$('#active-list').on('click','li',function(){
  var _this = $(this)
  window.open('./businfo.html?rid='+$(this).data('rid')+'&year='+_this.data('year')+'&month='+_this.data('month'),'_blank')
})

/*
 *  2015.11.03
 *  操作Cookies
 *  基础函数
 */

function getCookie(c_name){
  if (document.cookie.length>0){
    c_start=document.cookie.indexOf(c_name + "=");
    if (c_start!=-1){ 
      c_start=c_start + c_name.length+1;
      c_end=document.cookie.indexOf(";",c_start);
      if (c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
      }
    }
  return ""
}

function setCookie(c_name,value,expiredays){
  var exdate=new Date();
  exdate.setDate(exdate.getDate()+expiredays);
  document.cookie=c_name+ "=" +escape(value)+ ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}


function removeCookie(c_name){
    setCookie(c_name, '', -1);
}
