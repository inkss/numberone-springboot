/*
 *  2015.10.14 GKHB
 *  Nathan
 */

/*2015/12/30 页头的返回列表跳转*/

$("a.DZW_backup").on("click",function(){
  window.history.go(-1);
});


/*
 *  2015.11.03
 *  登录/注册页面的万用提示
 *  根据status的值确定显示的内容，需手动定义
 *  2015.11.06提炼了一下方法，使得这个功能不会显得蠢得一逼
 */

//  2015.11.06改为修改透明度造成渐显渐隐，避免使用hide和show改变高度导致的体验问题
function ShowAlertHandle(type,message) {
  var infoLayer = $('.info');
  var alertLabel = $('.alert');
  
  alertLabel.addClass('alert-'+type).text(message);
  infoLayer.animate({opacity:1},500,function(){
    setTimeout(function(){
      infoLayer.animate({opacity:0},1000,function(){
        alertLabel.removeClass('alert-'+type);
      });
    }, 5000);
  });
}

//  2015.11.24 更通用的系统alert
function SystemAlert(type,message) {
  var alertLabel = $('.sys-msg');
  
  alertLabel.removeClass('alert-warning');
  alertLabel.removeClass('alert-info');
  alertLabel.removeClass('alert-danger');
  alertLabel.removeClass('alert-success');
  
  alertLabel.addClass('alert-'+type).text(message).show(500).animate({opacity:1},500);
  setTimeout(function(){
    alertLabel.removeClass('alert-warning');
    alertLabel.removeClass('alert-info');
    alertLabel.removeClass('alert-danger');
    alertLabel.removeClass('alert-success');
    
    alertLabel.animate({opacity:0},500).hide(500);
  }, 5000);
}
$(document).on('click','.sys-msg',function(){
  var _this = $(this);
  _this.removeClass('alert-warning');
  _this.removeClass('alert-info');
  _this.removeClass('alert-danger');
  _this.removeClass('alert-success');
  
  _this.animate({opacity:0},500).hide(500);
})

function timer(time) {
  var btn = $('#send-msg');
  btn.attr('disabled', true);  //按钮禁止点击
  btn.off('click');
  btn.text(time <= 0 ? '发送验证码' : '再次发送 ('+time+')');
  var hander = setInterval(function() {
    if (time <= 0) {
      clearInterval(hander); //清除倒计时
      btn.text('再次发送');
      btn.attr('disabled', false);
      btn.on('click',SendSMS);
      return false;
    }
    else {
      btn.text('再次发送 ('+(time--)+')');
    }
  }, 1000);
}

function encrypt(phoneno) {
    var phonemm = "";
    $.ajax({
        url: './AjaxPage/Encrypt.ashx',
        data: { 'phoneno': phoneno },
        type: 'post',
        async: false,
        dataType: 'json',
        success: function (result) {
            phonemm= result.mm;
        },
        error: function (e) {
            console.log(e);
            SystemAlert('warning', '亲，你的网络好像不稳定，请重新来过。');
            timer(60);
        }
    });
    return phonemm;
   
}

//发送验证码
var SendSMS = function(){
  var regiName = $('#regi-name').val();
  if(regiName === '' || regiName.length != 11) {
    SystemAlert('warning','请填写正确的手机号');
  }
  else {
    var isreg = IsReged(regiName);
    if(isreg===1) {
      $.ajax({
        url:'./AjaxPage/SendSMS.ashx',
        data:{'phoneno':encrypt(regiName)},
        type:'post',
        dataType:'json',
        success:function(result) {
          if(result.status === 101) {
            SystemAlert('info','验证码已发送至您的手机');
            timer(60);
          }
          else {
            SystemAlert('danger','验证码发送失败，请稍后重试');
            timer(30);
            
          }
        },
        error: function(e){
          console.log(e);
          SystemAlert('warning','亲，你的网络好像不稳定，请重新来过。');
          timer(30);
        }
      });
    }
    else if(isreg===0){
      SystemAlert('danger','该手机号码已注册');
    }
    else {
      SystemAlert('danger','验证码发送失败，请稍后重试');
    }
  }
}
/*
 *  2015.10.14
 *  处理预约公交逻辑 对应booking.html
 *  在element显示查询的值
 *  element是jQuery对象
 *  2015.11.02 做了大量修改，支持下拉刷新，method判断上拉还是下拉刷新，决定不同的插入方式。
 *  2015.11.05 修改加载为刷新，去掉提示无新路线的功能，相对页面上的count也暂时注释掉了
 *  2015.11.25 在li附加data-uid，data-rid，data-year，data-month，用于跳转页面//  结束预约的线路应该无法点击，以后再处理
 *  2015.11.26 增加了显示时间戳功能，附加函数：GetTimeValue(setTime)
 *  2015.11.27 结束预约的线路可以点击，把相关参数（end）传到下一层，由下一层决定
 *  2015.11.30 增加了start，用于标记还未开始的状态
 *  2015.12.03 增加了loading
 *  2015.12.09 大改，下拉刷新，上拉加载。初次加载没数据或出错，全局图像（nodata），之后加载没数据了使用SystemAlert。
 *  2015.12.15 增加显示统计数字，以及增加了已结束印戳
 *  2015.12.29 改为通过年月来获取值
 */
function ShowBookString(element, year, month, uid, pageIndex, pageSize, method) {
  var _bookString = '',beforeStart,beforeEnd,loading,pre,preWidth=0;
  
  //每次刷新列表都清除cookie
  removeCookie('isOrdered');
  removeCookie('Ordered_Line');
  $.ajax({
    url: './AjaxPage/IndexAjaxPage.ashx',
    data: {'userid': uid,'year':year,'month':month, 'pageIndex': pageIndex, 'pageSize': pageSize},
    type: 'get',
    async: false,
    dataType: 'json',
    success: function(result) {
      
      pre = $('.pre-loading');
      pre.show();
      if(result === undefined || result.length === 0){
        _bookString = '<li class="nodata"><img src="./images/nodata.png"></li>';
        //如果统计数为初始状态（generatedCount=1）
        if(generatedCount === 1) {
          element.html(_bookString);
          //$('#pullDown,#pullUp').hide();
        }
        else {
          SystemAlert('info','所有数据都在这里了')
          generatedCount -= 1;
        }
      }
      // else if (result.length === 0) {
        // _bookString = '已无新线路';
      // }
      else {
        if(generatedCount === 1) {
          if(result.length<1) {$('#pullDown').css({'display':'none'});}
          if(result.length<5) {$('#pullUp').css({'display':'none'});}
        }
        //loading初始化loading
        loading = (1/result.length) * 100;
        
        
        for (var i=0;i<result.length;i+=1) {
          // beforeStart = GetTimeValue(result[i].timeBegin);
          // if(beforeStart<0)
          // {
            // beforeEnd = GetTimeValue(result[i].timeEnd);
          // }
          //loading变动
          preWidth += loading;
          pre.animate({'width':preWidth+'%'},20); 
          
          //start=1；预约开始，end=1预约结束
          _bookString += result[i].timeType=='-1' ? '<li data-end="1"': '<li data-end="0"';
          _bookString += result[i].timeType=='1' ? ' data-start="1" ': ' data-start="0" '
          _bookString += 'data-rid="'+result[i].feasibleRouteID+'" data-year="'+result[i].cycleYear+'" data-month="'+result[i].cycleMonth+'">';
          
          _bookString += '<div class="show-label';
          _bookString += result[i].timeType=='1' ? ' active-label ' : ' ';//添加激活标签
          _bookString +='col-xs-12"><div class="label-head row"><div class="label-left col-xs-2">';
		  _bookString += result[i].CarrierID=='C02' ? '<div class="line-num" style="background-color:#0774fb;">' : '<div class="line-num">';
          _bookString += result[i].lineNum;
          _bookString += '</div></div><div class="show-line label-right col-xs-8">';
          _bookString += '<div>'+result[i].lineStartAddr+'<br><span>'+result[i].getOnStop+'</span></div><div>—</div><div>'+result[i].lineEndAddr+'<br><span>'+result[i].getOffStop+'</span></div></div>';
		  _bookString += result[i].CarrierID=='C02' ? '<div class="col-xs-2" style="text-align:right;"><img src="/images/d02_sign.png" style="width:60px;"></div></div>' : '</div>';
          _bookString += '<div class="label-body row"><div class="label-left col-xs-2"><div class="show-date"><span>'+result[i].cycleMonth+'</span>月<br>'+result[i].cycleYear+'年</div></div>';
          _bookString += '<div class="label-right col-xs-10"><div class="show-info row"><div class="col-xs-5"><span>'+result[i].busNumbers+'</span><br>车次</div>';
          _bookString += '<div class="col-xs-4"><span>'+result[i].lineRvNum+'</span><br>人数</div>';
		  _bookString += (result[i].CarrierID == 'C02' && result[i].BusType == 'D') ? '<div class="col-xs-3 no-padding bus-type-text">豪华大巴</div></div>' : '<div class="col-xs-3 no-padding bus-type-text"></div></div>';
          _bookString += '<div class="label-foot row"><div class="show-deadline col-xs-12">';
          //timeType=0 :未开始 , timeType =1:进行中, timeType=-1 结束 :已经结束;
          if(result[i].timeType=='1') {
            _bookString += '还有<span>'+result[i].timeDesc+'</span>结束预约';
          }
          else if(result[i].timeType=='0') {
            _bookString += '还有<span>'+result[i].timeDesc+'</span>开始预约';
          }
          else {
            _bookString += '预约已经结束';
          }
          _bookString += '</div></div></div></div>';
          //未处理订单状态戳记，根据isOrdered（预约， boolean）状态，在status后插入class值 booked
          _bookString += '<div class="status';
          if(result[i].timeType=='-1'){
            _bookString += ' end col-xs-3">';
			_bookString += '<span>累计' + result[i].BespeakCount + '人</span>';
          }
          else {
            _bookString += ' col-xs-3">';
			if (result[i].CarrierID == 'C01') {
				_bookString += '<span style="color:#107df1;">累计' + result[i].BespeakCount + '人</span>';
			}else {
				_bookString += '<span style="color:#ff7e00;">累计' + result[i].BespeakCount + '人</span>';
			}
          }
          
          _bookString += '</div></div></li>';
          
          //记录是否已购买
          if(result[i].isOrdered===true) {
            setCookie('isOrdered',1,1);
            setCookie('Ordered_Line',result[i].lineNum,1);
          }
        }
        
        if(method==='up') {
          element.append(_bookString);
        }
        else {
          element.html(_bookString);
        }
        pageIndex += 1
        if(HasMoreBook(year,month,uid,pageIndex,pageSize)===1){
          element.append('<label class="load-more" data-count="'+pageIndex+'" data-year="'+year+'" data-month="'+month+'">点击加载更多</label>')
        }
      }
      //隐藏loading
      pre.fadeOut();
    },
    error: function(e) {
      element.html('<li class="nodata"><img src="./images/nodata.png"></li>');
      SystemAlert('warning','亲，你的网络好像不稳定，请重新来过。');
      //$('#pullDown,#pullUp').hide();
      console.log(e);
    }
  });
}

/*
 *  2015.12.29
 *  新增用于判断是否还有数据的方法
 *  对应ShowBookString
 */
function HasMoreBook(year,month, uid, pageIndex, pageSize){
  var hasMore
  $.ajax({
    url: './AjaxPage/IndexAjaxPage.ashx',
    data: {'userid': uid,'year':year,'month':month, 'pageIndex': pageIndex, 'pageSize': pageSize},
    type: 'post',
    async: false,
    dataType: 'json',
    success: function(result) {
      if(result.length===0) {
        hasMore = 0
      }
      else {
        hasMore = 1
      }
    },
    error: function(e) {
      hasMore = 0
      console.log(e)
    }
  })
  return hasMore
}

/*
 *  2015.10.15
 *  处理订购公交逻辑 虽然不应该叫ORDER但是没办法了懒得改了就这样吧，对应buy_line.html
 *  在element显示查询的值
 *  element是jQuery对象
 *  2015.11.04 做了大量修改，支持下拉刷新，method判断上拉还是下拉刷新，决定不同的插入方式。
 *  2015.11.05 修改加载为刷新，去掉提示无新路线的功能，相对页面上的count也暂时注释掉了
 *  2015.11.25 在li附加data-uid，data-rid，data-year，data-month，用于跳转页面//  结束订购和已订购的线路应该无法点击，以后再处理
 *  2015.11.30 增加了显示时间戳功能，附加函数：GetTimeValue(setTime)
 *  2015.11.30 结束预约的线路可以点击，把相关参数（end）传到下一层，由下一层决定
 *  2015.11.30 增加了start，用于标记还未开始的状态
 *  2015.12.03 增加了loading
 *  2015.12.09 大改，下拉刷新，上拉加载。初次加载没数据或出错，全局图像（nodata），之后加载没数据了使用SystemAlert。
 *  2015.12.15 增加显示统计数字，以及增加了已结束印戳
 *  2015.12.29 改为通过年月来获取值
 */
function ShowOrderString(element,year,month, uid, pageIndex, pageSize, method) {
  var _orderString = '',beforeStart,beforeEnd,loading,pre,preWidth=0;
  //每次刷新列表都清除cookie
  removeCookie('ispay');
  $.ajax({
    url: './AjaxPage/orderAjaxPage.ashx',
    data: {'userid': uid,'year':year,'month':month, 'pageIndex': pageIndex, 'pageSize': pageSize},
    type: 'post',
    async: false,
    dataType: 'json',
    success: function(result) {
      
      pre = $('.pre-loading');
      pre.show();
      if(result === undefined || result.length === 0){
        _orderString = '<li class="nodata"><img src="./images/nodata.png"></li>';
        //如果统计数为初始状态（generatedCount=1）
        if(generatedCount === 1) {
          element.html(_orderString);
          //$('#pullDown,#pullUp').hide();
        }
        else {
          SystemAlert('info','所有数据都在这里了')
          //generatedCount -= 1;
        }
      }
      // else if (result.length === 0) {
        // _orderString = '已无新线路';
      // }
      else {
                
        loading = (1/result.length) * 100;
        
        
        for (var i=0;i<result.length;i+=1) {
          
          preWidth += loading;
          pre.animate({'width':preWidth+'%'},20); 
          _orderString += '<li data-line="'+result[i].lineName+'" ';
          _orderString += result[i].IsCanOrder=='-1' ? 'data-end="1"': 'data-end="0"';
          _orderString += result[i].IsCanOrder=='1' ? ' data-start="1" ': ' data-start="0" '
          _orderString += 'data-rid="'+result[i].feasibleRouteID+'" data-year="'+result[i].cycleYear+'" data-month="'+result[i].cycleMonth+'">';
          _orderString += '<div class="show-label';
          _orderString += result[i].IsCanOrder=='1' ? ' active-label ' : ' ';//添加激活标签
          _orderString +='col-xs-12"><div class="label-head row"><div class="label-left col-xs-2">';
		  _orderString += result[i].CarrierID=='C02' ? '<div class="line-num" style="background-color:#0774fb;">' : '<div class="line-num">';
          _orderString += result[i].lineName;
          _orderString += '</div></div><div class="show-line label-right col-xs-8">';
          _orderString += '<div>'+result[i].lineStartAddr+'<br><span>'+result[i].getOnStop+'</span></div><div>—</div><div>'+result[i].lineEndAddr+'<br><span>'+result[i].getOffStop+'</span></div></div>';
		  _orderString += result[i].CarrierID=='C02' ? '<div class="col-xs-2" style="text-align:right;"><img src="/images/d02_sign.png" style="width:60px;"></div></div>' : '</div>';
          _orderString += '<div class="label-body row"><div class="label-left col-xs-2"><div class="show-date"><span>'+result[i].cycleMonth+'</span>月<br>'+result[i].cycleYear+'年</div></div>';
          _orderString += '<div class="label-right col-xs-10"><div class="show-info row"><div class="col-xs-5"><span>'+result[i].busNumbers+'</span><br>车次</div>';
          _orderString += '<div class="col-xs-4"><span>'+result[i].surplusTickets+'</span><br>余票</div>';
		  _orderString += (result[i].CarrierID == 'C02' && result[i].BusType == 'D') ? '<div class="col-xs-3 no-padding bus-type-text">豪华大巴</div></div>' : '<div class="col-xs-3 no-padding bus-type-text"></div></div>';
          _orderString += '<div class="label-foot row"><div class="show-deadline col-xs-12">';
          //IsCanOrder= 0 :未开始 , IsCanOrder = 1 :IsCanOrder = -1 :已经结束;
          if(result[i].IsCanOrder=='1') {
            _orderString += '还有<span>'+result[i].timeDesc+'</span>结束订购';
          }
          else if(result[i].IsCanOrder=='0') {
            _orderString += '还有<span>'+result[i].timeDesc+'</span>开始订购';
          }
          else {
            _orderString += '订购已经结束';
          }
          _orderString += '</div></div></div></div>';
          //未处理订单状态戳记，根据surplusTickets（余票，int），isorder（下单，boolean）和ispay（支付，boolean）状态，在status后插入class值（暂时未定义class）
          _orderString += '<div class="status';
          if(result[i].IsCanOrder=='-1'){
            _orderString += ' end col-xs-3">';
			_orderString += '<span><i>累计' + result[i].OrderCount + '人</i></span>';
          }
          else {
            _orderString += ' col-xs-3">';
			if (result[i].CarrierID == 'C01') {
				_orderString += '<span><i style="color:#107df1;">累计' + result[i].OrderCount + '人</i></span>';
			}/*else {
				_orderString += '<span><i style="color:#ff7e00;">累计' + result[i].OrderCount + '人</i></span>';
			}*/
          }
          
          _orderString += '</div></div></li>';
        
          //记录是否已购买
          if(result[i].ispay===true) {
            setCookie('ispay',1,1);
          }
          
        }
        if(method==='up') {
          element.append(_orderString);
        }
        else {
          element.html(_orderString);
        }
        pageIndex += 1
        if(HasMoreOrder(year,month,uid,pageIndex,pageSize)===1){
          element.append('<label class="load-more" data-count="'+pageIndex+'" data-year="'+year+'" data-month="'+month+'">点击加载更多</label>')
        }
      }
      
      pre.fadeOut();
    },
    error: function(e) {
      element.html('<li class="nodata"><img src="./images/nodata.png"></li>');
      SystemAlert('warning','亲，你的网络好像不稳定，请重新来过。');
      //$('#pullDown,#pullUp').hide();
      console.log(e);
    }
  });
}
/*
 *  2015.12.29
 *  新增用于判断是否还有数据的方法
 *  对应ShowOrderString
 */
function HasMoreOrder(year,month, uid, pageIndex, pageSize){
  var hasMore
  $.ajax({
    url: './AjaxPage/orderAjaxPage.ashx',
    data: {'userid': uid,'year':year,'month':month, 'pageIndex': pageIndex, 'pageSize': pageSize},
    type: 'post',
    async: false,
    dataType: 'json',
    success: function(result) {
      if(result.length===0) {
        hasMore = 0
      }
      else {
        hasMore = 1
      }
    },
    error: function(e) {
      hasMore = 0
      console.log(e)
    }
  })
  return hasMore
}



/*
 *  2015.10.30
 *  处理有预订的用户订购公交逻辑 虽然不应该叫ORDER但是没办法了懒得改了就这样吧，对应buy_line_booked.html
 *  在element显示查询的值
 *  element是jQuery对象
 *  2015.11.04 做了大量修改，支持下拉刷新，method判断上拉还是下拉刷新，决定不同的插入方式。
 *  2015.11.05 修改加载为刷新，去掉提示无新路线的功能，相对页面上的count也暂时注释掉了
 *  2015.11.25 在li附加data-uid，data-rid，data-year，data-month，用于跳转页面//  结束订购和已订购的线路应该无法点击，以后再处理
 */
function ShowBookedOrderString(element, uid, pageIndex, pageSize) {
  var _orderString = '',beforeStart,beforeEnd;
  
  $.ajax({
    url: './AjaxPage/orderAjaxPage.ashx',
    data: {'userid': uid, 'pageIndex': pageIndex, 'pageSize': pageSize},
    type: 'post',
    async: false,
    dataType: 'json',
    success: function(result) {
      if(result === undefined || result.length === 0){
        _orderString = '<li class="nodata"><img src="./images/nodata.png"></li>';
        //$('#pullDown,#pullUp').hide();
      }
      // else if (result.length === 0) {
        // _orderString = '已无新线路';
      // }
      else {
        if(result.length<1) {$('#pullDown').css({'display':'none'});}
        if(result.length<5) {$('#pullUp').css({'display':'none'});}
        for (var i=0;i<result.length;i+=1) {
          if(result[i].isBespeak) {
            
            _orderString += result[i].timeType=='-1' ? '<li data-end="1"': '<li data-end="0"';
            _orderString += result[i].timeType=='1' ? ' data-start="1" ': ' data-start="0" '
            _orderString += 'data-rid="'+result[i].feasibleRouteID+'" data-year="'+result[i].cycleYear+'" data-month="'+result[i].cycleMonth+'">';
            _orderString += '<div class="show-label';
            _orderString += result[i].timeType=='1' ? ' active-label ' : ' ';//添加激活标签
            _orderString +='col-xs-12"><div class="label-head row"><div class="label-left col-xs-2"><div class="line-num">';
            _orderString += result[i].lineName;
            _orderString += '</div></div><div class="show-line label-right col-xs-10">';
            _orderString += '<div>'+result[i].lineStartAddr+'<br><span>'+result[i].getOnStop+'</span></div><div>—</div><div>'+result[i].lineEndAddr+'<br><span>'+result[i].getOffStop+'</span></div></div></div>';
            _orderString += '<div class="label-body row"><div class="label-left col-xs-2"><div class="show-date"><span>'+result[i].cycleMonth+'</span>月<br>'+result[i].cycleYear+'年</div></div>';
            _orderString += '<div class="label-right col-xs-10"><div class="show-info row"><div class="col-xs-5"><span>'+result[i].busNumbers+'</span><br>车次</div>';
            _orderString += '<div class="col-xs-6"><span>'+result[i].surplusTickets+'</span><br>余票</div></div>';
            _orderString += '<div class="label-foot row"><div class="show-deadline col-xs-12">';
            //beforeStart > 0 :未开始 , beforeEnd > 0 :进行中，beforeEnd<0 :已经结束;
            //这里的时间都是小时，取值的时候向下取整
            if(result[i].timeType=='1') {
              _orderString += '还有<span>'+result[i].timeDesc+'</span>结束订购';
            }
            else if(result[i].timeType=='0') {
              _orderString += '还有<span>'+result[i].timeDesc+'</span>开始订购';
            }
            else {
              _orderString += '订购已经结束';
            }
            _orderString += '</div></div></div></div>'
            //未处理订单状态戳记，根据surplusTickets（余票，int），isorder（下单，boolean）和ispay（支付，boolean）状态，在status后插入class值（暂时未定义class）
            _orderString += '<div class="status';
            if(result[i].timeType=='-1'){
              _orderString += ' end col-xs-3">';
            }
            else {
              _orderString += ' col-xs-3">';
            }
            
            _orderString += '<span>累计<i>' + result[i].OrderCount + '</i>人</span></div></div></li>';
            
            //记录是否已购买
            if(result[i].ispay===true) {
              setCookie('ispay',1,1);
            }
          }
        }
      }
      element.html(_orderString);
    },
    error: function(e) {
      element.html('<li class="nodata"><img src="./images/nodata.png"></li>');
      SystemAlert('warning','亲，你的网络好像不稳定，请重新来过。');
      //$('#pullDown,#pullUp').hide();
      console.log(e);
    }
  });
}

/*
 *  2015.10.15
 *  处理线路招募逻辑 对应recruit_line.html
 *  在element显示查询的值
 *  element是jQuery对象
 *  目前缺少：正式的接口（使用的是预约接口）
 *  2015.12.15 增加显示统计数字，以及增加了已结束印戳
 */
function ShowRecruitString(element, uid, pageIndex, pageSize,method) {
  var _recruitString = '',timeCost,date,year,month,loading,pre,preWidth=0;//beforeStart=0,beforeEnd=0
  
  $.ajax({
    url: './AjaxPage/GetAllRecruitBusLinesNew.ashx',
    data: {'userid': uid, 'pageIndex': pageIndex, 'pageSize': pageSize},
    type: 'get',
    async: false,
    dataType: 'json',
    success: function(result) {
      
      pre = $('.pre-loading');
      pre.show();
      
      if(result === undefined || result.length === 0){
        _recruitString = '<li class="nodata"><img src="./images/nodata.png"></li>';
        
        if(generatedCount === 1) {
          element.html(_recruitString);
          //$('#pullDown,#pullUp').hide();
        }
        else {
          SystemAlert('info','所有数据都在这里了')
          //generatedCount -= 1;
        }
        
      }
      else {
        date = new Date();
        console.log(date)
        year = date.getFullYear();
        month = date.getMonth()+1;
        
        loading = (1/result.length) * 100;
        
        
        if(generatedCount === 1) {
          if(result.length<1) {$('#pullDown').css({'display':'none'});}
          if(result.length<5) {$('#pullUp').css({'display':'none'});}
        }
        
        for (var i=0;i<result.length;i+=1) {
          //beforeStart = result[i].isStart === true ? 1:0;
          //beforeEnd = result[i].isOver === true ? 1:0;
          
          if(Math.floor(result[i].minutes/60) === 0) {
            timeCost = '约' + result[i].minutes + '分钟';
          }
          else if (result[i].minutes%60 === 0) {
            timeCost = '约' + Math.floor(result[i].minutes/60) + '小时';
          }
          else {
            timeCost = '约' + Math.floor(result[i].minutes/60) + '小时' + (result[i].minutes%60) + '分钟';
          }
          
          preWidth += loading;
          pre.animate({'width':preWidth+'%'},20);
          
          _recruitString += result[i].isStart === '1' ? '<li data-start="1"': '<li data-start="0" ';
          _recruitString += 'data-rid="'+result[i].feasibleRouteID+'" data-year="'+year+'" data-month="'+month+'">';
          _recruitString += '<div class="show-label';
          _recruitString += result[i].isStart === '1' ? ' active-label ' : ' ';//添加激活标签
          _recruitString +='col-xs-12"><div class="label-head row"><div class="label-left col-xs-2">';
		  _recruitString += result[i].CarrierID=='C02' ? '<div class="line-num" style="background-color:#0774fb;">' : '<div class="line-num">';
          _recruitString += result[i].lineNum;
          _recruitString += '</div></div><div class="show-line label-right col-xs-8">';
          _recruitString += '<div>'+result[i].lineStartAddr+'<br><span>'+result[i].getOnStop+'</span></div><div>—</div><div>'+result[i].lineEndAddr+'<br><span>'+result[i].getOffStop+'</span></div></div>';
		  _recruitString += result[i].CarrierID=='C02' ? '<div class="col-xs-2" style="text-align:right;"><img src="/images/d02_sign.png" style="width:60px;"></div></div>' : '</div>';
          _recruitString += '<div class="label-body row"><div class="label-left col-xs-2"><div class="show-date"><span>'+result[i].lineRvNum+'</span>人</div></div>';
          _recruitString += '<div class="label-right col-xs-10"><div class="show-info row"><div class="col-xs-5">';
          _recruitString += '<span>'+timeCost+'</span><br>全程用时</div><div class="col-xs-4">';
          _recruitString += '<span>约'+result[i].distance+'公里</span><br>全程距离</div>';
		  _recruitString += (result[i].CarrierID == 'C02' && result[i].BusType == 'D') ? '<div class="col-xs-3 no-padding bus-type-text">豪华大巴</div></div>' : '<div class="col-xs-3 no-padding bus-type-text"></div></div>';
          _recruitString += '<div class="label-foot row"><div class="show-deadline col-xs-12"><span>';
          //timeType: 0,还未开始；1，正在进行；-1，已经结束;
          if(result[i].isStart === '0'){_recruitString += '招募已经结束';}
          else if (result[i].isStart === '1') {_recruitString += '线路招募中';}
          _recruitString += '</span></div></div></div></div>';
          //未处理订单状态戳记，根据isOrdered（预约， boolean）状态，在status后插入class值（暂时未定义class）
          _recruitString += '<div class="status';
          if(result[i].isStart=='1'&&result[i].isOrdered&&uid!=0){
            _recruitString += ' joined col-xs-3">';
          }
          else if(result[i].isStart=='-1') {
            _recruitString += ' end col-xs-3">';
          }
          else {
            _recruitString += ' col-xs-3">';
          }
          
          //_recruitString += '<span>累计<i>' + result[i].RecruitCount + '</i>人</span></div></div></li>';
          _recruitString += '</div></div></li>';
        }
        if(method==='up') {
          element.append(_recruitString);
        }
        else {
          element.html(_recruitString);
        }
        pageIndex += 1
        if(HasMoreRecruit(uid,pageIndex,pageSize)===1){
          element.append('<label class="load-more" data-count="'+pageIndex+'">点击加载更多</label>')
        }
      }
      
      pre.fadeOut();
    },
    error:function(e){
      console.log(e);
      element.html('<li class="nodata"><img src="./images/nodata.png"></li>');
      SystemAlert('warning','亲，你的网络好像不稳定，请重新来过。');
      //$('#pullDown,#pullUp').hide();
    }
  });
}
/*
 *  2015.12.29
 *  新增用于判断是否还有数据的方法
 *  对应ShowOrderString
 */
function HasMoreRecruit(uid, pageIndex, pageSize){
  var hasMore
  $.ajax({
    url: './AjaxPage/GetAllRecruitBusLinesNew.ashx',
    data: {'userid': uid, 'pageIndex': pageIndex, 'pageSize': pageSize},
    type: 'get',
    async: false,
    dataType: 'json',
    success: function(result) {
      if(result.length===0) {
        hasMore = 0
      }
      else {
        hasMore = 1
      }
    },
    error: function(e) {
      hasMore = 0
      console.log(e)
    }
  })
  return hasMore
}


/*
 *  2015.12.29
 *  处理开行线路逻辑 对应bus.html
 *  在element显示查询的值
 *  element是jQuery对象
 */
function ShowBusString(element,year,month, pageIndex, pageSize, method) {
  var _orderString = '',beforeStart,beforeEnd,loading,pre,preWidth=0;
  
  $.ajax({
    url: './AjaxPage/GetIndexOpenList.ashx',
    data: {'year':year,'month':month, 'pageIndex': pageIndex, 'pageSize': pageSize},
    type: 'post',
    async: false,
    dataType: 'json',
    success: function(result) {
      
      pre = $('.pre-loading');
      pre.show();
      if(result === undefined || result.DataList.length === 0){
        _orderString = '<li class="nodata"><img src="./images/nodata.png"></li>';
        //如果统计数为初始状态（generatedCount=1）
        if(generatedCount === 1) {
          element.html(_orderString);
          //$('#pullDown,#pullUp').hide();
        }
        else {
          SystemAlert('info','所有数据都在这里了')
          //generatedCount -= 1;
        }
      }
      // else if (result.length === 0) {
        // _orderString = '已无新线路';
      // }
      else {
                
        loading = (1/result.DataList.length) * 100;
        
        
        for (var i=0;i<result.DataList.length;i+=1) {
          
          preWidth += loading;
          pre.animate({'width':preWidth+'%'},20); 
          
          _orderString += '<li ';
   
          _orderString += 'data-rid="'+result.DataList[i].ID+'" data-year="'+result.DataList[i].CycleYear+'" data-month="'+result.DataList[i].CycleMonth+'">';
          _orderString += '<div class="show-label';
          _orderString += ' active-label ';//添加激活标签
          _orderString +='col-xs-12"><div class="label-head row"><div class="label-left col-xs-2"><div class="line-num">';
          _orderString += result.DataList[i].RouteID;
          _orderString += '</div></div><div class="show-line label-right col-xs-10">';
          _orderString += '<div>'+result.DataList[i].RouteOrigin+'<br><span>'+result.DataList[i].OriginParkAddress+'</span></div><div>—</div><div>'+result.DataList[i].RouteDestination+'<br><span>'+result.DataList[i].DestinationParkAddress+'</span></div></div></div>';
          _orderString += '<div class="label-body row"><div class="label-left col-xs-2"><div class="show-date"><span>'+result.DataList[i].CycleMonth+'</span>月<br>'+result.DataList[i].CycleYear+'年</div></div>';
          _orderString += '<div class="label-right col-xs-10"><div class="show-info row"><div class="col-xs-5"><span>'+result.DataList[i].busnumbers+'</span><br>车次</div>';
          _orderString += '<div class="col-xs-6"><span>'+result.DataList[i].PeopleNum+'</span><br>人数</div></div>';
          _orderString += '<div class="label-foot row"><div class="show-deadline col-xs-12">';
          //timeType= 0 :未开始 , timeType = 1 :进行中，timeType = -1 :已经结束;

          _orderString += '</div></div></div></div>';
          //未处理订单状态戳记，根据surplusTickets（余票，int），isorder（下单，boolean）和ispay（支付，boolean）状态，在status后插入class值（暂时未定义class）
          _orderString += '<div class="status';
          //if(result[i].timeType=='-1'){
          //  _orderString += ' end col-xs-3">';
          //}
          //else {
            _orderString += ' col-xs-3">';
          //}
          
          _orderString += '<span></span></div></div></li>';
        
          
        }
        if(method==='up') {
          element.append(_orderString);
        }
        else {
          element.html(_orderString);
        }
        pageIndex += 1
        if(HasMoreBus(year,month,pageIndex,pageSize)===1){
          element.append('<label class="load-more" data-count="'+pageIndex+'" data-year="'+year+'" data-month="'+month+'">点击加载更多</label>')
        }
      }
      
      pre.fadeOut();
    },
    error: function(e) {
      element.html('<li class="nodata"><img src="./images/nodata.png"></li>');
      SystemAlert('warning','亲，你的网络好像不稳定，请重新来过。');
      //$('#pullDown,#pullUp').hide();
      console.log(e);
    }
  });
}
/*
 *  2015.12.29
 *  新增用于判断是否还有数据的方法
 *  对应ShowOrderString
 */
function HasMoreBus(year,month, pageIndex, pageSize){
  var hasMore
  $.ajax({
    url: './AjaxPage/GetIndexOpenList.ashx',
    data: {'year':year,'month':month, 'pageIndex': pageIndex, 'pageSize': pageSize},
    type: 'post',
    async: false,
    dataType: 'json',
    success: function(result) {
      if(result.DataList.length===0) {
        hasMore = 0
      }
      else {
        hasMore = 1
      }
    },
    error: function(e) {
      hasMore = 0
      console.log(e)
    }
  })
  return hasMore
}

/*
 *  2015.11.25
 *  处理订单列表逻辑 对应order_list.html 正牌的order，不要和前面的迷之Order搞混了
 *  在element显示查询的值
 *  element是jQuery对象
 *  
 */
function ShowOrderListString(element, uid, pageIndex, pageSize,method) {
  var status_stamp,_olString = '',loading,pre,preWidth=0;
  
  $.ajax({
    url: './AjaxPage/GetOrderListByUserId.ashx',
    data: {'userid': uid, 'pageIndex': pageIndex, 'pageSize': pageSize},
    type: 'get',
    async: false,
    dataType: 'json',
    success: function(result) {
      pre = $('.pre-loading');
      pre.show();
      if(result.listData.length === 0||result.listData===undefined){
        _olString = '<li class="nodata"><img src="./images/nodata.png"></li>';
        if(generatedCount === 1) {
          element.html(_olString);
          $('#pullDown,#pullUp').hide();
        }
        else {
          SystemAlert('info','所有数据都在这里了')
          generatedCount -= 1;
        }
      }
      else {
        loading = (1/result.listData.length) * 100;
        
        
        if(result.listData.length<1) {$('#pullDown').css({'display':'none'});}
        if(result.listData.length<5) {$('#pullUp').css({'display':'none'});}
        for (var i=0;i<result.listData.length;i+=1) {
          
          preWidth += loading;
          pre.animate({'width':preWidth+'%'},20);
          
          _olString += '<li>';
          _olString += '<div class="show-label active-label col-xs-12"><div class="label-head row"><div class="label-left col-xs-2"><div class="line-num">';
          _olString += result.listData[i].RouteID;
          _olString += '</div></div><div class="show-line label-right col-xs-10">';
          _olString += '<div>'+result.listData[i].RouteOrigin+'<br><span>'+result.listData[i].OriginParkAddress+'</span></div><div>—</div><div>'+result.listData[i].RouteDestination+'<br><span>'+result.listData[i].DestinationParkAddress+'</span></div></div></div>';
          _olString += '<div class="label-body row"><div class="label-left col-xs-2"><div class="show-date"><span>'+result.listData[i].CycleMonth+'</span>月<br>'+result.listData[i].CycleYear+'年</div></div>';
          _olString += '<div class="label-right col-xs-10"><div class="show-info row"><div class="col-xs-5"><span>'+result.listData[i].OnCarName+'</span><br>去程车次</div>';
          _olString += '<div class="col-xs-6"><span>'+result.listData[i].OffCarName+'</span><br>回程车次</div></div>';
          _olString += '<div class="label-foot row"><div class="show-deadline col-xs-12">';
          _olString += '订单号：<span>'+result.listData[i].OrderNo+'</span>'
          _olString += '</div></div></div></div>';
          //订单状态戳记，根据OrderStateName（预约， int）状态，在status后插入class值
          //1.订单完成  其他暂无，接口本身不支持
          switch(result.listData[i].OrderStateName) {
            case '1':
              status_stamp = 'finish';
            break;
            default:
              status_stamp = '';
          }
          _olString += '<div class="status '+status_stamp+' col-xs-3"></div></div></li>'
        }
        if(method==='up') {
          element.append(_olString);
        }
        else {
          element.html(_olString);
        }
      }
      
      
      pre.fadeOut();
    },
    error: function(e) {
      console.log(e);
      element.html('<li class="nodata"><img src="./images/nodata.png"></li>');
      SystemAlert('warning','亲，你的网络好像不稳定，请重新来过。');
      $('#pullDown,#pullUp').hide();
    }
  });
}

/*
 *  2015.12.04
 *  处理订单列表逻辑 对应book_list.html
 *  在element显示查询的值
 *  element是jQuery对象
 *  
 */
function ShowBookListString(element, uid, pageIndex, pageSize,method) {
  var status_stamp,_olString = '',loading,pre,preWidth=0;
  
  $.ajax({
    url: './AjaxPage/GetLineReservationByUserId.ashx',
    data: {'userid': uid},
    type: 'get',
    async: false,
    dataType: 'json',
    success: function(result) {
      pre = $('.pre-loading');
      pre.show();
      
      if(result === null || result.length === 0){
        _olString = '<li class="nodata"><img src="./images/nodata.png"></li>';
        if(generatedCount === 1) {
          element.html(_olString);
          $('#pullDown,#pullUp').hide();
        }
        else {
          SystemAlert('info','所有数据都在这里了')
          generatedCount -= 1;
        }
      }
      else {
        loading = (1/result.length) * 100;
        
        if(generatedCount === 1) {
          if(result.length<1) {$('#pullDown').css({'display':'none'});}
          if(result.length<5) {$('#pullUp').css({'display':'none'});}
        }
        for (var i=0;i<result.length;i+=1) {
          
          preWidth += loading;
          pre.animate({'width':preWidth+'%'},20);
          
          _olString += '<li>';
          _olString += '<div class="show-label active-label col-xs-12"><div class="label-head row"><div class="label-left col-xs-2"><div class="line-num">';
          _olString += result[i].lineNum;
          _olString += '</div></div><div class="show-line label-right col-xs-10">';
          _olString += '<div>'+result[i].getOnStop+'<br><span>'+result[i].lineStartAddr+'</span></div><div>—</div><div>'+result[i].getOffStop+'<br><span>'+result[i].lineEndAddr+'</span></div></div></div>';
          _olString += '<div class="label-body row"><div class="label-left col-xs-2"><div class="show-date"><span>'+result[i].cycleMonth+'</span>月<br>'+result[i].cycleYear+'年</div></div>';
          _olString += '<div class="label-right col-xs-10"><div class="show-info row"><div class="col-xs-5"><span>'+result[i].gono+'</span><br>去程车次</div>';
          _olString += '<div class="col-xs-6"><span>'+result[i].backno+'</span><br>回程车次</div></div>';
          _olString += '<div class="label-foot row"><div class="show-deadline col-xs-12">';
          _olString += '<span>&nbsp;</span>';//'订单号：<span>'+result.listData[i].OrderNo+'</span>'
          _olString += '</div></div></div></div>';
          _olString += '<div class="status col-xs-3"></div></div></li>'
        }
        if(method==='up') {
          element.append(_olString);
        }
        else {
          element.html(_olString);
        }
      }
      
      
      pre.fadeOut();
    },
    error: function(e) {
      console.log(e);
      element.html('<li class="nodata"><img src="./images/nodata.png"></li>');
      SystemAlert('warning','亲，你的网络好像不稳定，请重新来过。');
      $('#pullDown,#pullUp').hide();
    }
  });
}

/*
 *  http://localhost/AjaxPage/xlinfoAjaxPage.ashx?userid=0&feasibleRouteID=134&year=2015&month=8
 *  2015.11.24
 *  处理预约详情页面
 *
 */
function GetBookInfoJson(uid, RouteID, year, month) {
  var json
  
  $.ajax({
    async: false,
    url: './AjaxPage/xlinfoAjaxPage.ashx',
    data: {'userid': uid, 'feasibleRouteID': RouteID, 'year': year, 'month': month},
    type: 'get',
    dataType: 'json',
    success: function(result) {
      if(result === undefined || result === ''){
        json = '0';
      }
      else {
        json = result;
      }
    },
    error: function(e) {
      console.log(e);
      SystemAlert('warning','亲，你的网络好像不稳定，请重新来过。');
      json = '0';
    }
  });
  return json;

}
/*
 *  http://localhost/AjaxPage/xlinfoAjaxPage.ashx?userid=0&feasibleRouteID=134&year=2015&month=8
 *  2015.11.25
 *  处理订购详情页面
 *  没有余票的行不能选中，待补充
 */
function GetOrderInfoJson(uid, RouteID, year, month) {
  var json
  
  $.ajax({
    async: false,
    url: './AjaxPage/orderinfoAjaxPage.ashx',
    data: {'userid': uid, 'feasibleRouteID': RouteID/*, 'year': year, 'month': month*/},
    type: 'get',
    dataType: 'json',
    success: function(result) {
      if(result === undefined || result === ''){
        json = '0';
      }
      else {
        json = result;
      }
    },
    error: function(e) {
      console.log(e);
      SystemAlert('warning','亲，你的网络好像不稳定，请重新来过。');
      json = '0';
    }
  });
  return json;
}
/*
 *  http://localhost/AjaxPage/orderAjaxinfobyCount.ashx?feasibleRouteID=request['rid']
 *  2016.08.05
 *  处理订购详情页面(按次订购)
 *  没有余票的行不能选中，待补充
 */
function GetCountOrderInfoJson(feasibleRouteID){
	var json
  
  $.ajax({
    async: false,
    url: './AjaxPage/orderAjaxinfobyCount.ashx',
    data: {'feasibleRouteID': feasibleRouteID,'addmonth':1},
    type: 'get',
    dataType: 'json',
    success: function(result) {
      /*if(result === undefined || result === ''){
        json = '0';
      }
      else {
        json = result;
      }*/
	  if(result.status === 101){
		  json = result;
	  }else{
		  json = '0';
	  }
    },
    error: function(e) {
      console.log(e);
      SystemAlert('warning','亲，你的网络好像不稳定，请重新来过。');
      json = '0';
    }
  });
  return json;
}
/*
 *  http://localhost/AjaxPage/orderAjaxinfobyCount.ashx?feasibleRouteID=request['rid']
 *  2016.09.08
 *  处理订购详情页面(当月按次订购)
 *  没有余票的行不能选中，待补充
 */
function GetCurCountOrderInfoJson(feasibleRouteID){
	var json
  
  $.ajax({
    async: false,
    url: './AjaxPage/orderAjaxinfobyCount.ashx',
    data: {'feasibleRouteID': feasibleRouteID,'addmonth':0},
    type: 'get',
    dataType: 'json',
    success: function(result) {
      /*if(result === undefined || result === ''){
        json = '0';
      }
      else {
        json = result;
      }*/
	  if(result.status === 101){
		  json = result;
	  }else{
		  json = '0';
	  }
    },
    error: function(e) {
      console.log(e);
      SystemAlert('warning','亲，你的网络好像不稳定，请重新来过。');
      json = '0';
    }
  });
  return json;
}

/*
 *  2015.11.30
 *  http://localhost/AjaxPage/GetOrderDetailByOrderNo.ashx?orderno=201511270010001
 *  处理订购支付逻辑
 *
 */

function GetPayInfoJson(uid, OrderNo) {
  var json
  
  $.ajax({
    async: false,
    url: './AjaxPage/GetOrderDetailByOrderNo.ashx',
    data: {'orderno': OrderNo},
    type: 'get',
    dataType: 'json',
    success: function(result) {
      if(result === undefined || result === ''){
        json = '0';
      }
      else {
        json = result;
      }
    },
    error: function(e) {
      console.log(e);
      SystemAlert('warning','亲，你的网络好像不稳定，请重新来过。');
      json = '0';
    }
  });
  return json;
}
/*
 *  http://localhost/AjaxPage/GetAllRecruitBusLineDetail.ashx?userid=0&feasibleRouteID=134&year=2015&month=8
 *  2015.12.01
 *  处理订购详情页面
 *  没有余票的行不能选中，待补充
 */
function GetRecruitInfoJson(uid, RouteID, year, month) {
  var json
  
  $.ajax({
    async: false,
    url: './AjaxPage/GetAllRecruitBusLineDetail.ashx',
    data: {'userid': uid, 'feasibleRouteID': RouteID, 'year': year, 'month': month},
    type: 'get',
    dataType: 'json',
    success: function(result) {
      if(result[0] === undefined || result[0] === ''){
        json = '0';
      }
      else {
        json = result;
      }
    },
    error: function(e) {
      console.log(e);
      SystemAlert('warning','亲，你的网络好像不稳定，请重新来过。');
      json = '0';
    }
  });
  return json;
}
/*
 *  http://localhost:61342/AjaxPage/GetLineDetail.ashx?year=2015&month=12&id=134
 *  2015.12.30
 *  处理开行线路详情页面
 *
 */
function GetBusInfoJson(RouteID, year, month) {
  var json
  
  $.ajax({
    async: false,
    url: './AjaxPage/GetLineDetail.ashx',
    data: {'id': RouteID, 'year': year, 'month': month},
    type: 'get',
    dataType: 'json',
    success: function(result) {
      if(result === undefined || result === ''){
        json = '0';
      }
      else {
        json = result;
      }
    },
    error: function(e) {
      console.log(e);
      SystemAlert('warning','亲，你的网络好像不稳定，请重新来过。');
      json = '0';
    }
  });
  return json;

}

/*
 *  2015.11.25
 *  提交预约信息
 *  /AjaxPage/TakePartingAjaxPage.ashx?userid=" + tkpuserid + "&feasibleRouteID=" + tkpfeasibleRouteID + "&year=" + tkpyear + "&month=" + tkpmonth + "&busOnWorkLineID=" + tkbbusOnWorkLineID + "&busOffWorkLineID=" + tkpbusOffWorkLineID,
 *  {"result":"执行成功"}
 *  {"result":"您已参加预约。若需更改，请先变更预约"}
 *  2015.12.03 去掉了year和month
 *
 */
function SetBookInfo(uid, RouteID, Year, Month, goID, backID) {
  var returnMsg;
  
  $.ajax({
    async: false,
    url: './AjaxPage/TakePartingAjaxPage.ashx',
    data: {'userid':uid,'feasibleRouteID':RouteID,'year':Year,'month':Month,'busOnWorkLineID':goID,'busOffWorkLineID':backID},
    type: 'post',
    dataType: 'json',
    success: function(result) {
      if(result === undefined || result === ''){
        returnMsg = '0';
      }
      else if(result.status === 203 || result.status === 101){
        returnMsg = '1';
      }
      else {
        returnMsg = result.result;
      }
    },
    error: function(e) {
      console.log(e);
      SystemAlert('warning','亲，你的网络好像不稳定，请重新来过。');
      returnMsg = '0';
    }
  });
  return returnMsg;
}

//2015.11.27 提交订单
//2015.12.07 如果未选线路（ID=0），则提交的对应price也为0
function SubmitOrder(json) {
  var i,
      workOnCarID,workOffCarID,
      workOnTotalTickets=0,workOffTotalTickets=0;
  
  workOnCarID = GetCheckboxValueByName('go');
  workOffCarID = GetCheckboxValueByName('back');
  for (i=0;i<json.length;i+=1){
    if(json[i].carID==workOnCarID) {
      workOnTotalTickets = json[i].totalTickets;
    }
    else if(json[i].carID==workOffCarID) {
      workOffTotalTickets = json[i].totalTickets;
    }
  }
  $.ajax({
    
    url: './AjaxPage/SubmitOrder.ashx',
    data: {
      'userid': getCookie('userID'),
      'feasibleRouteID': request['rid'],
      'workOnCarID': workOnCarID,
      'workOffCarID': workOffCarID,
      'lineNo': json[0].RouteID,
      'days': json[0].days,
      'workOnPrice': json[0].price,
      'workOffPrice': json[0].price,
      'workOnTotalTickets': workOnTotalTickets,
      'workOffTotalTickets': workOffTotalTickets,
      'discount': json[0].discount
    },
    type: 'post',
    dataType: 'json',
    success: function(result) {
      if(result===undefined || result === '') {
        SystemAlert('danger','没有订购到班车，请稍后重试。');
      }else if (result.status === 205){
		SystemAlert('info','本月您已订购了该班次，不能再订购了。');
		return false;
	  }else if (result.status === 101) {
        SystemAlert('success','订单已提交，即将进入支付，请您尽快支付。');
        setTimeout(function(){
          var page_url,link='';
          page_url = './payment.html';  //方便统一改
          link += page_url;
          link += '?uid='+getCookie('userID');
          link += '&orderno='+result.orderNo;
          //link += '&end='+_this.data('end');
          
          window.location.href = link;
        }, 2000);
      }
      else {
        SystemAlert('danger','没有订购到班车，请稍后重试。');
      }
    },
    error: function(e) {
      console.log(e);
      SystemAlert('warning','亲，你的网络好像不稳定，请重新来过。');
    }
  });
}

//2015.11.27 提交订单(按次订购)
//2015.12.07 如果未选线路（ID=0），则提交的对应price也为0
function SubmitOrderByCount(json) {
  var i,
      workOnCarID,workOffCarID;
  
  workOnCarID = GetCheckboxValueByName('go');
  workOffCarID = GetCheckboxValueByName('back');
  
  $.ajax({
    
    url: './AjaxPage/SubmitOrderCount.ashx',
    data: {
      'userid' : getCookie('userID'),
      'OnCouponID' : workOnCarID,
      'OffCouponID' : workOffCarID
    },
    type: 'post',
    dataType: 'json',
    success: function(result) {
      if(result===undefined || result === '') {
        SystemAlert('danger','没有订购到班车，请稍后重试。');
      }else if (result.status === 205){
		SystemAlert('info','本月您已订购了该班次，不能再订购了。');
		return false;
	  }else if (result.status === 101) {
      	var ua = navigator.userAgent.toLowerCase();	
		if (/iphone|ipad|ipod/.test(ua)) {
			setupWebViewJavascriptBridge(function(bridge) {
			  var data = {orderNo:result.orderNo};
			  bridge.callHandler('confirm-booking',data);
		    });	
		} 
//		else if (/android/.test(ua)) {
//			alert("android");	
//		} else {
//			alert("web");
//		}
        SystemAlert('success','订单已提交，即将进入支付，请您尽快支付。');
		
        setTimeout(function(){
          var page_url,link='';
          page_url = './payment.html';  //方便统一改
          link += page_url;
          link += '?uid='+getCookie('userID');
          link += '&orderno='+result.orderNo;
          //link += '&end='+_this.data('end');
          
          window.location.href = link;
		  
        }, 2000);
      }
      else {
        SystemAlert('danger','没有订购到班车，请稍后重试。');
      }
    },
    error: function(e) {
      console.log(e);
      SystemAlert('warning','亲，你的网络好像不稳定，请重新来过。');
    }
  });
}

//2015.12.01 提交招募
function JoinRecruit(data) {
  $.ajax({
    
    url: './AjaxPage/JoinRecruitByLine.ashx',
    data: data,
    type: 'post',
    dataType: 'json',
    success: function(result) {
      if(result===undefined || result === '') {
        SystemAlert('danger','没有加入招募，请稍后重试。');
      }
      else if (result.status === 101) {
        SystemAlert('success','您已参与招募，请关注官方线路开通信息');
        
        removeCookie('departure_id');
        removeCookie('departure_value');
        removeCookie('departure_json');
        removeCookie('arrival_id');
        removeCookie('arrival_value')
        removeCookie('arrival_json');
        setTimeout(function(){          
          window.location.href = './recruit.html';
        }, 2000);
      }
      else {
        SystemAlert('danger','没有加入招募，请稍后重试。');
      }
    },
    error: function(e) {
      console.log(e);
      SystemAlert('warning','亲，你的网络好像不稳定，请重新来过。');
    }
  });
}

//2015.11.25 获取被选中的ID值（单选）（都是当时给自己留下的坑。。。）
function GetCheckboxValueByName(name) {
  var value
  $(':checkbox[name="'+name+'"]').each(function(){
    if($(this).prop('checked')){
      //value = this.value;
      value = $(this).attr('id');
    }
  });
  return value === undefined ? 0: value;
}
//2015.11.24 拼接字符串，接GetBookInfoJson
//2015.12.07 新增判断，某一程无数据不显示全部内容。
function ShowBookInfo(bookInfoJson) {
  var i,
      head_string,
      go_string,
      back_string,
      line,
      go='------',
      back='------',
      isBooked,
      go_count=0,
      back_count=0,
      loading,
      pre,
      preWidth=0;

  pre = $('.pre-loading');
  pre.show();
  loading = 20;
  
  
  head_string = '<div class="label-left col-xs-2"><div class="line-num">'+bookInfoJson[0].RouteID+'</div></div><div class="show-line label-right col-xs-10"><div>'+bookInfoJson[0].RouteOrigin+'<br><span>'+bookInfoJson[0].OriginParkAddress+'</span></div><div>—</div><div>'+bookInfoJson[0].RouteDestination+'<br><span>'+bookInfoJson[0].DestinationParkAddress+'</span></div></div>';
  go_string = '<span class="pre-mark">去程</span> <span>'+bookInfoJson[0].RouteOrigin+' —> '+bookInfoJson[0].RouteDestination+'</span><table><tr><th>班次</th><th>到达时间</th><th>参考价格</th><th>预约人数</th><th class="chkbox"></th></tr>';
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  back_string = '<span class="pre-mark">回程</span> <span>'+bookInfoJson[0].RouteDestination+' —> '+bookInfoJson[0].RouteOrigin+'</span><table><tr><th>班次</th><th>出发时间</th><th>参考价格</th><th>预约人数</th><th class="chkbox"></th></tr>';
  line = bookInfoJson[0].RouteID;
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  for(i=0; i<bookInfoJson.length; i += 1) {
    //回程
    if(bookInfoJson[i].gB) {
      back_count+=1;
      isBooked='';
      if(bookInfoJson[i].isOrdered) {
        back = bookInfoJson[i].lineNum;
        isBooked = 'checked';//改成checked，在前面的input（undo）
        G_tmp_status = 'unlocked'; //不要问为什么，初始化的时候就锁了。
        G_tmp_back = bookInfoJson[i].lineID;
      }
      back_string += '<tr><td>'+bookInfoJson[i].lineNum+'</td><td>'+bookInfoJson[i].lineArriveTime+'</td><td>'+bookInfoJson[i].lineRvPrice+'</td><td>'+bookInfoJson[i].lineRvNum+'</td><td><input id="'+bookInfoJson[i].lineID+'" type="checkbox" name="back" value="'+bookInfoJson[i].lineNum+'" '+isBooked+'><i class="glyphicon glyphicon-ok"></i></td></tr>';
    }
    //去程
    else if(!bookInfoJson[i].gB) {
      go_count+=1;
      isBooked='';
      if(bookInfoJson[i].isOrdered) {
        go = bookInfoJson[i].lineNum;
        isBooked = 'checked';
        G_tmp_status = 'unlocked'; //不要问为什么，初始化的时候就锁了。
        G_tmp_go = bookInfoJson[i].lineID;
      }
      go_string += '<tr><td>'+bookInfoJson[i].lineNum+'</td><td>'+bookInfoJson[i].lineArriveTime+'</td><td>'+bookInfoJson[i].lineRvPrice+'</td><td>'+bookInfoJson[i].lineRvNum+'</td><td><input id="'+bookInfoJson[i].lineID+'" type="checkbox" name="go" value="'+bookInfoJson[i].lineNum+'" '+isBooked+'><i class="glyphicon glyphicon-ok"></i></td></tr>';
    }
    
    preWidth += loading
    pre.animate({'width':preWidth+'%'},20)
  }
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  //start=1；预约开始，end=1预约结束
  //2015.12.25 改成接口返回的timeType判断
  //if(request['end']==='1')
  if(bookInfoJson[0].timeType===-1) {
    G_tmp_status = 'finished';    
  }
  //else if(request['start']==='0')
  if(bookInfoJson[0].timeType===0) {
    G_tmp_status = 'unstart';
  }
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  ////2015.12.07 新增判断，某一程无数据不显示全部内容。
  if(back_count === 0) {
    back_string = '';
  }
  if(go_count === 0) {
    go_string = '';
  }
  
  $('.label-head').html(head_string);
  $('.go').html(go_string);
  $('.back').html(back_string); 
  $('#line').html(line);
  $('#go').html(go);
  $('#back').html(back);
  
  pre.fadeOut();
  
}
//2015.11.24 拼接字符串，接GetOrderInfoJson
//2015.12.07 新增判断，某一程无数据不显示全部内容。余票为0的特殊处理
function ShowOrderInfo(orderInfoJson) {
  var i,
      head_string,
      go_string,
      back_string,
      line,
      go='------',
      back='------',
      isSoldOut,
      go_count=0,
      back_count=0,
      loading,
      pre,
      preWidth=0;

  pre = $('.pre-loading');
  pre.show();
  loading = 20;
  
  head_string = '<div class="label-left col-xs-2"><div class="line-num">'+orderInfoJson[0].RouteID+'</div></div><div class="show-line label-right col-xs-10"><div>'+orderInfoJson[0].RouteOrigin+'<br><span>'+orderInfoJson[0].OriginParkAddress+'</span></div><div>—</div><div>'+orderInfoJson[0].RouteDestination+'<br><span>'+orderInfoJson[0].DestinationParkAddress+'</span></div></div>';
  go_string = '<span class="pre-mark">去程</span> <span>'+orderInfoJson[0].RouteOrigin+' —> '+orderInfoJson[0].RouteDestination+'</span><table><tr><th>车次</th><th>发车时间</th><th>预计到达</th><th width="15%">余票</th><th class="chkbox"></th></tr>';
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  back_string = '<span class="pre-mark">回程</span> <span>'+orderInfoJson[0].RouteDestination+' —> '+orderInfoJson[0].RouteOrigin+'</span><table><tr><th>车次</th><th>发车时间</th><th>预计到达</th><th width="15%">余票</th><th class="chkbox"></th></tr>';
  line = orderInfoJson[0].RouteID;
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  //2015.12.25 改成接口返回的timeType判断
  //if(request['start']==='0')
  if(orderInfoJson[0].timeType!==1) {
    SystemAlert('warning','现在不能订购，您可以先查看班车信息');
  }
  //else if(request['end']==='1')
  //{
  //  SystemAlert('warning','现在不能订购，您可以先查看班车信息');
  //}
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  for(i=0; i<orderInfoJson.length; i += 1) {
    //余票为0的一行，另选择框无法被选取
    isSoldOut = orderInfoJson[i].surplusTickets == 0 ? ' disabled' : '';
    
    //回程
    if(orderInfoJson[i].gb) {
      back_count += 1;
      back_string += '<tr><td>'+orderInfoJson[i].carNo+'</td><td>'+orderInfoJson[i].beginTime+'</td><td>'+orderInfoJson[i].endTime+'</td><td>'+orderInfoJson[i].surplusTickets+'/'+orderInfoJson[i].totalTickets+'</td><td><input id="'+orderInfoJson[i].carID+'" type="checkbox" name="back" value="'+orderInfoJson[i].carNo+'"'+isSoldOut+'></td></tr>';
    }
    //去程
    else if(!orderInfoJson[i].gb) {
      go_count += 1;
      go_string += '<tr><td>'+orderInfoJson[i].carNo+'</td><td>'+orderInfoJson[i].beginTime+'</td><td>'+orderInfoJson[i].endTime+'</td><td>'+orderInfoJson[i].surplusTickets+'/'+orderInfoJson[i].totalTickets+'</td><td><input id="'+orderInfoJson[i].carID+'" type="checkbox" name="go" value="'+orderInfoJson[i].carNo+'"'+isSoldOut+'></td></tr>';
    }
    
    preWidth += loading
    pre.animate({'width':preWidth+'%'},20)
  }
  //2015.12.07 新增判断，某一程无数据不显示全部内容。
  if(back_count === 0) {
    back_string = '';
  }
  if(go_count === 0) {
    go_string = '';
  }
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  $('.label-head').html(head_string);
  $('.go').html(go_string);
  $('.back').html(back_string);
  $('#line').html(line);
  $('#go').html(go);
  $('#back').html(back);
  
  pre.fadeOut();
}

//2015.11.24 拼接字符串，接GetOrderInfoJson
//2015.12.07 新增判断，某一程无数据不显示全部内容。余票为0的特殊处理
//2016.08.05 此方法为显示按次购买Html内容
function ShowCountOrderInfo(orderInfoJson) {
  var i,
      head_string,
      go_string,
      back_string,
      line,
      go='------',
      back='------',
      isSoldOut,
      go_count=0,
      back_count=0,
      loading,
      pre,
      preWidth=0;

  pre = $('.pre-loading');
  pre.show();
  loading = 20;
  
  head_string = '<div class="label-left col-xs-2">' +
				  '<div class="line-num">'+orderInfoJson.RouteID+'</div>' +
				'</div>' +
				'<div class="show-line label-right col-xs-10">' +
				  '<div>'+orderInfoJson.RouteOrigin+'<br><span>'+orderInfoJson.OriginParkAddress+'</span></div>' +
				  '<div>—</div>' +
				  '<div>'+orderInfoJson.RouteDestination+'<br><span>'+orderInfoJson.DestinationParkAddress+'</span></div>' +
				'</div>';
  go_string = '<span class="pre-mark">去程</span> ' +
			  '<span>'+orderInfoJson.RouteOrigin+' —> '+orderInfoJson.RouteDestination+'</span>' +
			  '<table>' +
			    '<tr>' +
				  '<th>车次</th>' +
				  '<th>发车时间</th>' +
				  '<th>预计到达</th>' +
				  '<th>次数</th>' +
				  '<th>已购</th>' +
				  '<th class="chkbox"></th>' +
				'</tr>';
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  back_string = '<span class="pre-mark">回程</span> ' +
				'<span>'+orderInfoJson.RouteDestination+' —> '+orderInfoJson.RouteOrigin+'</span>' +
				'<table>' +
				  '<tr>' +
				    '<th>车次</th>' +
					'<th>发车时间</th>' +
					'<th>预计到达</th>' +
					'<th>次数</th>' +
					'<th>已购</th>' +
					'<th class="chkbox"></th>' +
				  '</tr>';
  line = orderInfoJson.RouteID;
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  if(orderInfoJson.IsCarnOrder == 0)
  {
    SystemAlert('warning','现在不能订购，您可以先查看班车信息');
  }
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)

  var items = orderInfoJson.DataList;
  for(i = 0; i < items.length; i += 1) {
    //余票为0的一行，令选择框无法被选取
    //isSoldOut = items[i].surplusTickets == 0 ? ' disabled' : '';
    
    //回程
    if(items[i].GB == "True") {
      back_count += 1;
      back_string += '<tr>' +
					   '<td>'+items[i].CarNo+'</td>' +
					   '<td>'+items[i].CarDepartureTime+'</td>' +
					   '<td>'+items[i].CarArrivalTime+'</td>' +
					   '<td>'+items[i].OrderCount+'</td>' +
					   '<td>'+items[i].BuyCount+'</td>' +
					   '<td><input id="'+items[i].CouponID+'" type="checkbox" name="back" value="'+items[i].CarNo+'"></td>' +
					 '</tr>';
    }
    //去程
    else if(items[i].GB == "False") {
      go_count += 1;
      go_string += '<tr>' +
				     '<td>'+items[i].CarNo+'</td>' +
					 '<td>'+items[i].CarDepartureTime+'</td>' +
					 '<td>'+items[i].CarArrivalTime+'</td>' +
					 '<td>'+items[i].OrderCount+'</td>' +
					 '<td>'+items[i].BuyCount+'</td>' +
					 '<td><input id="'+items[i].CouponID+'" type="checkbox" name="go" value="'+items[i].CarNo+'"></td>' +
				   '</tr>';
    }
    
    preWidth += loading
    pre.animate({'width':preWidth+'%'},20)
  }
  //2015.12.07 新增判断，某一程无数据不显示全部内容。
  if(back_count === 0) {
    back_string = '';
  }
  if(go_count === 0) {
    go_string = '';
  }
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  $('.label-head').html(head_string);
  $('.go').html(go_string);
  $('.back').html(back_string);
  $('#line').html(line);
  $('#go').html(go);
  $('#back').html(back);
  
  pre.fadeOut();
}

//2015.11.30 拼接字符串，接GetPayInfoJson
/*
 *  2015.11.30
 *  订单状态表
 *  1 订购成功
 *  2	全额退款
 *  3	部分退款
 *  4	等待付款
 *  5	异常
 *  6	后台退款待成功（支付宝）
 *
 *  如果订购的时候只选了回程或者去程，应该如何处理
 */
function ShowPayInfo(payInfoJson) {
  var userMobile,
      head_string,
      go_string,
      back_string,
      price_string,
      submitPrice,
      discountPrice,
	  couponPrice,
      totalPrice,
      loading,
      pre,
      preWidth=0;
  
  pre = $('.pre-loading');
  pre.show();
  loading = 20;
  
  userMobile = payInfoJson.Tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  head_string = '<div class="label-left col-xs-2">' +
				  '<div class="line-num">'+payInfoJson.RouteID+'</div>' +
				'</div>' +
				'<div class="show-line label-right col-xs-10">' +
				  '<div>' +
				    payInfoJson.RouteOrigin+'<br>' +
				    '<span>'+payInfoJson.OriginParkAddress+'</span>' +
				  '</div>' +
				  '<div>—</div>' +
				  '<div>' +
				    payInfoJson.RouteDestination+'<br>' +
					'<span>'+payInfoJson.DestinationParkAddress+'</span>' +
				  '</div>' +
				'</div>';
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  if(payInfoJson.OnAllPrice != '0') {
    go_string = '<span class="pre-mark">去程</span> '+
	            '<span>'+payInfoJson.RouteOrigin+' —> '+payInfoJson.RouteDestination+'</span>' +
				'<table>' +
				  '<tr>' +
				    '<th>车次</th>';
	if (payInfoJson.OrderNo.length <= 15){
		// 按月订购
		go_string +='<th>发车时间</th>' +
					'<th>预计到达</th>' +
					'<th>天数</th>' +
					'<th>原价</th>';
	}else if (payInfoJson.OrderNo.length >= 20){
		// 按次订购
		go_string +='<th>发车时间</th>' +
					'<th>预计到达</th>' +
					'<th>次数</th>' +
					'<th>优惠</th>';
	}
					
	go_string +=	'<th>现价</th>' +
				  '</tr>';
				  
    go_string +=  '<tr>' +
					'<td>'+payInfoJson.OnCarName+'</td>';
	if (payInfoJson.OrderNo.length <= 15){
		// 按月订购
		go_string +='<td>'+payInfoJson.OnCarDepartureTime+'</td>' +
					'<td>'+payInfoJson.OnCarArrivalTime+'</td>' +
					'<td>'+payInfoJson.OrderDays+'</td>' +
					'<td class="yuanjia">'+payInfoJson.OnPrice+'</td>' +
					'<td class="xianjia">'+payInfoJson.OnDiscount.toFixed(2)+'</td>';
	}else if (payInfoJson.OrderNo.length >= 20){
		// 按次订购
		go_string +='<td>'+payInfoJson.OnCarDepartureTime+'</td>' +
					'<td>'+payInfoJson.OnCarArrivalTime+'</td>' +
					'<td>'+payInfoJson.OnOrderCount+'</td>' +
					'<td>'+payInfoJson.OnCouponPrice.toFixed(2)+'</td>' +
					'<td class="xianjia">'+payInfoJson.OnPrice+'</td>';
	}
	go_string +=  '</tr>';
  }
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  if(payInfoJson.OffAllPrice != '0') {
    back_string = '<span class="pre-mark">回程</span> ' +
				  '<span>'+payInfoJson.RouteDestination+' —> '+payInfoJson.RouteOrigin+'</span>' +
				  '<table>' +
				    '<tr>' +
					  '<th>车次</th>';
	if (payInfoJson.OrderNo.length <= 15){
		// 按月订购
		back_string +='<th>发车时间</th>' +
					'<th>预计到达</th>' +
					'<th>天数</th>' +
					'<th>原价</th>';
	}else if (payInfoJson.OrderNo.length >= 20){
		// 按次订购
		back_string +='<th>发车时间</th>' +
					'<th>预计到达</th>' +
					'<th>次数</th>' +
					'<th>优惠</th>';
	}
					
	back_string +=	'<th>现价</th>' +
				  '</tr>';
				  
    back_string += '<tr>' +
					 '<td>'+payInfoJson.OffCarName+'</td>';
	if (payInfoJson.OrderNo.length <= 15){
		// 按月订购
		back_string +='<td>'+payInfoJson.OffCarDepartureTime+'</td>' +
					 '<td>'+payInfoJson.OffCarArrivalTime+'</td>' +
					 '<td>'+payInfoJson.OrderDays+'</td>' +
					 '<td class="yuanjia">'+payInfoJson.OffPrice+'</td>' +
					 '<td class="xianjia">'+payInfoJson.OffDiscount.toFixed(2)+'</td>';
	}else if (payInfoJson.OrderNo.length >= 20){
		// 按次订购
		back_string +='<td>'+payInfoJson.OffCarDepartureTime+'</td>' +
					'<td>'+payInfoJson.OffCarArrivalTime+'</td>' +
					'<td>'+payInfoJson.OffOrderCount+'</td>' +
					'<td>'+payInfoJson.OffCouponPrice.toFixed(2)+'</td>' +
					'<td class="xianjia">'+payInfoJson.OffPrice+'</td>';
	}
	back_string +='</tr>';
  }
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  submitPrice = (payInfoJson.SubmitPrice).toFixed(2)
  totalPrice =  (payInfoJson.TotalPrice).toFixed(2)
  discountPrice = (payInfoJson.DiscountPrice).toFixed(2);
  couponPrice = (payInfoJson.CouponPrice).toFixed(2);
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  price_string = '<div class="col-xs-6"><span class="yuanjia">原价：'+totalPrice+'元</span></div><div class="total-price xianjia col-xs-6">现价：'+discountPrice+'元<br>优惠券：-'+couponPrice+'元<br><span>实付款：'+submitPrice+'元</span></div>';
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  $('#mobile').html(userMobile);
  $('.label-head').html(head_string);
  $('.go').html(go_string);
  $('.back').html(back_string);
  $('.label-foot').html(price_string);
  
  pre.fadeOut();
}
//调起支付宝支付
function PayOrderByAli(orderno, submitPrice) {
    window.location.href = "./Pay/default.aspx?orderNo=" + orderno + "&totalfee=" + submitPrice;
}
//2015.12.01 拼接字符串，接GetRecruitInfoInfoJson
function ShowRecruitInfo(recruitInfoJson) {
  var timeCost,
      head_string,
      date_string,
      right_string,
      foot_string,
      loading,
      pre,
      preWidth=0;
  
  pre = $('.pre-loading');
  pre.show();
  loading = 20;
  
  if(Math.floor(recruitInfoJson.minutes/60) === 0) {
    timeCost = '约' + recruitInfoJson.minutes + '分钟';
  }
  else if (recruitInfoJson.minutes%60 === 0) {
    timeCost = '约' + Math.floor(recruitInfoJson.minutes/60) + '小时';
  }
  else {
    timeCost = '约' + Math.floor(recruitInfoJson.minutes/60) + '小时' + (recruitInfoJson.minutes%60) + '分钟';
  }
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  head_string = '<div class="label-left col-xs-2"><div class="line-num">'+recruitInfoJson.lineNum+'</div></div><div class="show-line label-right col-xs-10"><div>'+recruitInfoJson.lineStartAddr+'<br><span>'+recruitInfoJson.getOnStop+'</span></div><div>—</div><div>'+recruitInfoJson.lineEndAddr+'<br><span>'+recruitInfoJson.getOffStop+'</span></div></div>';
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  date_string = '<span>'+recruitInfoJson.lineRvNum+'</span>人';
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  right_string = '<div class="col-xs-5"><span>'+timeCost+'</span><br>全程用时</div><div class="col-xs-6"><span>约'+recruitInfoJson.distance+'公里</span><br>全程距离</div>';
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  if(request['start']==='0'){
    SystemAlert('warning','招募还未开始，您可以先查看招募计划');
    foot_string = '<span>招募还未开始</span>';
  }
  else if(request['end']==='1'){
    SystemAlert('warning','招募已经结束，您仅可以查看招募计划');
    foot_string = '<span>招募已经结束</span>';
  }
  else {
    foot_string = '<span>线路招募中</span>';
  }
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  $('.label-head').html(head_string);
  $('.show-date').html(date_string);
  $('.show-info').html(right_string);
  $('.show-deadline').html(foot_string);
  
  pre.fadeOut();
  
}
//2015.12.30 拼接字符串，接GetBusInfoJson
function ShowBusInfo(busInfoJson) {
  var i,
      head_string,
      go_string,
      back_string,
      line,
      go='------',
      back='------',
      isSoldOut,
      go_count=0,
      back_count=0,
      loading,
      pre,
      preWidth=0;

  pre = $('.pre-loading');
  pre.show();
  loading = 20;
  
  head_string = '<div class="label-left col-xs-2"><div class="line-num">'+busInfoJson.PubLineModel.RouteID+'</div></div><div class="show-line label-right col-xs-10"><div>'+busInfoJson.PubLineModel.RouteOrigin+'<br><span>'+busInfoJson.PubLineModel.OriginParkAddress+'</span></div><div>—</div><div>'+busInfoJson.PubLineModel.RouteDestination+'<br><span>'+busInfoJson.PubLineModel.DestinationParkAddress+'</span></div></div>';
  go_string = '<span class="pre-mark">去程</span> <span>'+busInfoJson.PubLineModel.RouteOrigin+' —> '+busInfoJson.PubLineModel.RouteDestination+'</span><table><tr><th>车次</th><th>发车时间</th><th>预计到达</th><th width="15%">班车车型</th><th>原价</th><th>优惠价</th></tr>';
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  back_string = '<span class="pre-mark">回程</span> <span>'+busInfoJson.PubLineModel.RouteDestination+' —> '+busInfoJson.PubLineModel.RouteOrigin+'</span><table><tr><th>车次</th><th>发车时间</th><th>预计到达</th><th width="15%">班车车型</th><th>原价</th><th>优惠价</th></tr>';
  line = busInfoJson.PubLineModel.RouteID;
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  
  for(i=0; i<busInfoJson.DataList.length; i += 1) {
    //回程
    if(busInfoJson.DataList[i].GB==='1') {
      back_count += 1;
      back_string += '<tr><td>'+busInfoJson.DataList[i].CarNo+'</td><td>'+busInfoJson.DataList[i].CarDepartureTime+'</td><td>'+busInfoJson.DataList[i].CarArrivalTime+'</td><td>'+busInfoJson.DataList[i].BusTypeID+'-'+busInfoJson.DataList[i].BusTypeName+'</td><td><s>'+busInfoJson.DataList[i].Price+'</s></td><td>'+busInfoJson.DataList[i].discount+'</td></tr>';
    }
    //去程
    else if(busInfoJson.DataList[i].GB==='0') {
      go_count += 1;
      go_string += '<tr><td>'+busInfoJson.DataList[i].CarNo+'</td><td>'+busInfoJson.DataList[i].CarDepartureTime+'</td><td>'+busInfoJson.DataList[i].CarArrivalTime+'</td><td>'+busInfoJson.DataList[i].BusTypeID+'-'+busInfoJson.DataList[i].BusTypeName+'</td><td><s>'+busInfoJson.DataList[i].Price+'</s></td><td>'+busInfoJson.DataList[i].discount+'</td></tr>';
    }
    
    preWidth += loading
    pre.animate({'width':preWidth+'%'},20)
  }
  //2015.12.07 新增判断，某一程无数据不显示全部内容。
  if(back_count === 0) {
    back_string = '';
  }
  if(go_count === 0) {
    go_string = '';
  }
  
  preWidth += loading
  pre.animate({'width':preWidth+'%'},20)
  
  $('.label-head').html(head_string);
  $('.go').html(go_string);
  $('.back').html(back_string);
  $('#line').html(line);
  $('#go').html(go);
  $('#back').html(back);
  
  pre.fadeOut();
}
//绑定checkbox的事件
function BindCheckbox() {
  $(':checkbox[name=go]').on('ifClicked', G_tmp_go, function(){
    if(G_tmp_go == $(this).attr('id')) {
      $('#'+this.name).html('------');
      $(this).prop('checked', false);
      G_tmp_go = '';//清空临时变量
    }
    else {
      $('#'+this.name).html(this.value+'班');
      $(this).prop('checked', true);
      G_tmp_go = $(this).attr('id');//记录单次点击
    }
    $(':checkbox[name=' + this.name + ']').iCheck('uncheck');
    $(this).iCheck('check');
    
  });
  $(':checkbox[name=back]').on('ifClicked', G_tmp_back, function(){
    if(G_tmp_back == $(this).attr('id')) {
      $('#'+this.name).html('------');
      $(this).prop('checked', false);
      G_tmp_back = '';//清空临时变量
    }
    else {
      $('#'+this.name).html(this.value+'班');
      $(this).prop('checked', true);
      G_tmp_back = $(this).attr('id');//记录单次点击
    }
    $(':checkbox[name=' + this.name + ']').iCheck('uncheck');
    $(this).iCheck('check');
  });
}

/*
 *  2015.12.08  线路跳转
 
$('.icon-map').on('click',function(){
  window.location.href = $(this).data('link');
});*/
/*
 *  2015.12.08  设置统计代码
 *  2015.12.11  暂时改为手动加在所有_line，以及_info，外加_buy和recruit_collect recruit_company的页尾
 
$(document).ready(function(){
  $.get('./AjaxPage/GetStatisticsMethod.ashx',function(result){
    $('#analytics').html(result);
  });
});
 */

/*
 *  2015.11.26
 *  取时间
 *  返回小时数
 */
function GetTimeValue(setTime) {
  var date,time,now;
  date = new Date();
  time = Date.parse(setTime);
  now = date.getTime();
  
  return Math.floor(time-now);
}
/*登录判断*/
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
 *  2015.10.14
 *  获取url中"?"符后的字串
 *  基础函数放在最后面因为基本不改
 *
 */
 
function GetRequest() {
  var url = location.search;
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i=0;i<strs.length;i+=1) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
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
  document.cookie=c_name+ "=" +escape(value)+
  ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}


function removeCookie(c_name){
    setCookie(c_name, '', -1);
}

