var browser = {
    versions:function(){
    var u = navigator.userAgent, app = navigator.appVersion;
    return {
        trident: u.indexOf("Trident") > -1,
        presto: u.indexOf("Presto") > -1,
        webKit: u.indexOf("AppleWebKit") > -1,
        gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1,
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
        iPhone: u.indexOf("iPhone") > -1 ,
        iPad: u.indexOf("iPad") > -1,
        webApp: u.indexOf("Safari") == -1
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
$(".person-window").click(function(){
  $(this).hide();
});
$(".logo-window").click(function(){
  $(this).hide();
});
$("a").each(function(index,ele){
    if($(this).attr("href")!=""){
      $(this).attr("target","_blank");
    }
});

$(".ani").each(function(index,ele){
  if($(this).hasClass("randomEffect")){
    var randomEffects = ["fadeInUp","fadeInDown","fadeInLeft","fadeInRight"];
    $(this).attr("swiper-animate-effect",randomEffects[Math.floor(Math.random()*3)]);
  }else{
    $(this).attr("swiper-animate-effect",$(this).data("effect"));
  }
  $(this).attr("swiper-animate-duration","0.5s");
  $(this).attr("swiper-animate-delay","0.3s");
});

if(browser.versions.mobile){
  scheduleSwiperDirection="horizontal";
  transitionSpeed=500;
  $(".margin").css("height",$(window).height()-100);
}else{
  scheduleSwiperDirection="vertical";
  transitionSpeed=1000;
  $(".margin").css("height",$(window).height()-400);
}


var mainSwiper = new Swiper('#main', {
    direction: 'vertical',
    speed:transitionSpeed,
    slidesPerView: 'auto',
    parallax: true,
    mousewheelControl: true,
    noSwiping : true,
    roundLengths : true,
    keyboardControl: true,
    onKeyPress: function(swiper, event){
      console.log('press keyboard key'+event);
      if(event==33){//pageup
        mainSwiper.slidePrev();
      }
      if(event==34){//pagedown
        mainSwiper.slideNext();
      }
      if(event==35){//end
        mainSwiper.slideTo(8, 2000, false);
      }
      if(event==36){//home
        mainSwiper.slideTo(0, 2000, false);
      }
    },
    onInit: function(swiper){
      swiperAnimateCache(swiper);  
      swiperAnimate(swiper);
      $("#navScroll li").each(function(index,ele){
          $(this).click(function(){
            swiper.slideTo($(this).data("link"));
          $("#navScroll li").removeClass("active");
            $(this).addClass("active");
          });
      });
    }, 
    onSlideChangeEnd: function(swiper){ 
      swiperAnimate(swiper);
    },
    onSetTransition: function(swiper){
      var spanText = ["DAY 1","DAY 2","社区专场"];
      $(".swiper-pagination-bullet").each(function(index,ele){
        $(this).html(spanText[index]);
      });
      //if(swiper.activeIndex==2 || swiper.activeIndex==3){
      if(swiper.activeIndex==2){
        swiper.params.onlyExternal=true;
        swiper.disableMousewheelControl();
        swiper.disableKeyboardControl();
        document.onkeydown=function(event){
          var e = event || window.event || arguments.callee.caller.arguments[0];
          if(scheduleSwiper.activeIndex==0){
            if(e && (e.keyCode==38 || e.keyCode==33)){ // press top or pageUp
              if(schedule01Swiper.translate>-2){
                mainSwiper.slideTo(1);
              }else{
                schedule01Swiper.setWrapperTranslate(schedule01Swiper.getWrapperTranslate()+40);
              }
            }
            if(e && (e.keyCode==40 || e.keyCode==34)){ // 按下
              slideHeight=schedule01Swiper.slides[0].scrollHeight;
              swiperHeight=schedule01Swiper.height;
              if(slideHeight-swiperHeight+schedule01Swiper.translate<2){
                scheduleSwiper.slideTo(1);
              }else{ 
                schedule01Swiper.setWrapperTranslate(schedule01Swiper.getWrapperTranslate()-40);
              }
            }  
          }
          if(scheduleSwiper.activeIndex==1){
            if(e && (e.keyCode==38 || e.keyCode==33)){ // 按上 
              if(schedule02Swiper.translate>-2){
                scheduleSwiper.slideTo(0);
              }else{
                schedule02Swiper.setWrapperTranslate(schedule02Swiper.getWrapperTranslate()+45);
              }
            }
            if(e && (e.keyCode==40 || e.keyCode==34)){ // 按下
              slideHeight=schedule02Swiper.slides[0].scrollHeight;
              swiperHeight=schedule02Swiper.height;
              if(slideHeight-swiperHeight+schedule02Swiper.translate<2){
                scheduleSwiper.slideTo(2);
              }else{ 
                schedule02Swiper.setWrapperTranslate(schedule02Swiper.getWrapperTranslate()-45);
              }
            }  
          }
          if(scheduleSwiper.activeIndex==2 && mainSwiper.activeIndex!=3){
            if(e && (e.keyCode==38 || e.keyCode==33)){ // 按上 
              if(schedule03Swiper.translate>-2){
                scheduleSwiper.slideTo(1);
              }else{
                schedule03Swiper.setWrapperTranslate(schedule03Swiper.getWrapperTranslate()+10);
              }
            }
            if(e && (e.keyCode==40 || e.keyCode==34)){ // 按下
              slideHeight=schedule03Swiper.slides[0].scrollHeight;
              swiperHeight=schedule03Swiper.height;
              if(slideHeight-swiperHeight+schedule03Swiper.translate<2){
                mainSwiper.slideTo(3);
              }else{ 
                schedule03Swiper.setWrapperTranslate(schedule03Swiper.getWrapperTranslate()-10);
              }
            }  
          }

        };
      }else{
        swiper.params.onlyExternal=false;
        swiper.enableMousewheelControl();
        swiper.enableKeyboardControl();
      }
      if(swiper.activeIndex==3 && $("#cqu_map").html()==""){
      //if(swiper.activeIndex==3 && $("#cqu_map").attr("src")==""){
        //<iframe id="cqu_map" class="map" src="" width="100%" height="100%" frameborder="0" scrolling="no" style="border:0" allowfullscreen></iframe>
        //$("#cqu_map").attr("src","https://gaode.com/search?id=B0017822WN&city=500106&geoobj=106.45715%7C29.554432%7C106.462917%7C29.557242&query_type=IDQ&query=%E9%87%8D%E5%BA%86%E5%A4%A7%E5%AD%A6%E4%B8%BB%E6%95%99%E5%AD%A6%E6%A5%BC&zoom=18");
        creatMap1();
      }
      schedule01Swiper.setWrapperTranslate(-40);
      schedule02Swiper.setWrapperTranslate(-40);
      schedule03Swiper.setWrapperTranslate(-40);
    }
});

function setEventContentHeight(){
  $(".slide-schedule .times").each(function(index,ele){
    var maxEventBoxHeight=0;
    var that = $(this);
    that.find(".event-box").each(function(index,ele){
      if($(this).find(".event-content").height()>maxEventBoxHeight){
        maxEventBoxHeight=$(this).find(".event-content").height();
      }
      if(index==that.find(".event-box").length-1){
        that.find(".event-box").height(maxEventBoxHeight+5);
      }
    });
  });
}
var scheduleSwiper = new Swiper('#schedule', {
    direction: 'vertical',
    speed:transitionSpeed,
    pagination: '.swiper-pagination-schedule',
    paginationClickable: true,
    autoHeight: true,
    slidesPerView: 1,
    mousewheelControl: true,
    keyboardControl:false,
    noSwiping : true,
    roundLengths : true,
    onInit: function(swiper){
      var spanText = ["DAY 1","DAY 2","社区专场"];
      $(".swiper-pagination-bullet").each(function(index,ele){
        $(this).html(spanText[index]);
      });
      setEventContentHeight();
    },
    onSetTransition: function(swiper,translate){
      //父级锁定&解锁
      setEventContentHeight();
      if(mainSwiper.activeIndex==2){
        mainSwiper.params.onlyExternal=true;
        mainSwiper.disableMousewheelControl();
        mainSwiper.disableKeyboardControl();
      }else{
        mainSwiper.params.onlyExternal=false;
        mainSwiper.enableMousewheelControl();
        mainSwiper.enableKeyboardControl();
      }
//    timelineSwiper.setWrapperTranslate(-40);
      schedule01Swiper.setWrapperTranslate(-40);
      schedule02Swiper.setWrapperTranslate(-40);
      schedule03Swiper.setWrapperTranslate(-40);
    }
});

  var schedule01Swiper = new Swiper('#schedule01',{
      scrollbar: '.swiper-scrollbar',
      direction: 'vertical',
      speed:transitionSpeed,
      slidesPerView: 'auto',
      freeMode: true,
      freeModeSticky : false,
      freeModeMomentum : false,
      mousewheelControl: true,
      mousewheelSensitivity : 0.77,
      roundLengths : true,
      onSetTranslate: function(swiper,translate){
         if(swiper.getWrapperTranslate()<-190 && scheduleSwiper.activeIndex==0){
          $(".rooms").fadeIn();
          $(".room1").fadeIn();
         }else{
          $(".rooms").hide();
          $(".room1").hide();
         }
         if(swiper.getWrapperTranslate()<-656 && scheduleSwiper.activeIndex==0){
          $(".room2").fadeIn();
          $(".room3").fadeIn();
         }else{
          $(".room2").hide();
          $(".room3").hide();
         }
      },
      onSetTransition: function(swiper,translate){
        //父级锁定&解锁
        if(scheduleSwiper.activeIndex==0){
          scheduleSwiper.params.onlyExternal=true;
          scheduleSwiper.disableMousewheelControl();
        }else{
          scheduleSwiper.params.onlyExternal=false;
          scheduleSwiper.enableMousewheelControl();
        }

        //translate 一直为0，不可直接用
        nowTranslate=swiper.translate;
        if(typeof(beforeTranslate)=="undefined"){
          beforeTranslate=0;
        };
        slideHeight=swiper.slides[0].scrollHeight;
        swiperHeight=swiper.height;
        if(nowTranslate>-2 && nowTranslate > beforeTranslate){//当前到顶
          mainSwiper.slideTo(1);
          $(".rooms").hide();
          $(".room1").hide();
          $(".room2").hide();
          $(".room3").hide();
          mainSwiper.params.onlyExternal=false;
          mainSwiper.enableMousewheelControl();
          mainSwiper.enableKeyboardControl();
          beforeTranslate = -1;
        }
        if(slideHeight-swiperHeight+nowTranslate<2 && nowTranslate < beforeTranslate){//当前到底
          scheduleSwiper.slideTo(1);
          $(".rooms").hide();
          $(".room1").hide();
          $(".room2").hide();
          $(".room3").hide();
          $("#schedule01 .swiper-wrapper").css("transform","matrix(1, 0, 0, 1, 0, 0)");
          beforeTranslate = 1;
        }else{
          beforeTranslate=nowTranslate;
        }
      },
       onReachBeginning:function(swiper){
        if(swiper.translate>0){
          scheduleSwiper.slideTo(0);
        }
         if(swiper.translate<(swiper.height-swiper.slides[0].scrollHeight)){
          scheduleSwiper.slideTo(1);
        }
       }
      });

  var schedule02Swiper = new Swiper('#schedule02',{
      scrollbar: '.swiper-scrollbar',
      direction: 'vertical',
      speed:transitionSpeed,
      slidesPerView: 'auto',
      freeMode: true,
      freeModeMomentum : false,
      mousewheelControl: true,
      mousewheelSensitivity : 0.77,
      roundLengths : true,
      onSetTranslate: function(swiper,translate){
         if(swiper.getWrapperTranslate()<-260 && scheduleSwiper.activeIndex==1){
          $(".rooms").fadeIn();
          $(".room1").fadeIn();
          $(".room2").fadeIn();
          $(".room3").fadeIn();
         }else{
          $(".rooms").hide();
          $(".room1").hide();
          $(".room2").hide();
          $(".room3").hide();
         }
      },
      onSetTransition: function(swiper,translate){
        //父级    
        if(scheduleSwiper.activeIndex==1){
          scheduleSwiper.params.onlyExternal=true;
          scheduleSwiper.disableMousewheelControl();
        }else{
          scheduleSwiper.params.onlyExternal=false;
          scheduleSwiper.enableMousewheelControl();
        }

        //translate 一直为0，不可直接用
        nowTranslate=swiper.translate;
        if(typeof(beforeTranslate)=="undefined"){
          beforeTranslate=0;
        };
        slideHeight=swiper.slides[0].scrollHeight;
        swiperHeight=swiper.height;
        if(nowTranslate>-2 && nowTranslate > beforeTranslate){
          scheduleSwiper.slideTo(0);
          beforeTranslate = -1;
          $(".rooms").hide();
          $(".room1").hide();
          $(".room2").hide();
          $(".room3").hide();
        }
        if(slideHeight-swiperHeight+nowTranslate<2 && nowTranslate < beforeTranslate){
          scheduleSwiper.slideTo(2);
          $(".rooms").hide();
          $(".room1").hide();
          $(".room2").hide();
          $(".room3").hide();
          //mainSwiper.slideTo(3);
          $("#schedule02 .swiper-wrapper").css("transform","matrix(1, 0, 0, 1, 0, 0)")
          beforeTranslate=1;
        }else{
          beforeTranslate=nowTranslate;
        }
      },
       onReachBeginning:function(swiper){
         if(swiper.translate>0){
          scheduleSwiper.slideTo(1);
        }
         if(swiper.translate<(swiper.height-swiper.slides[0].scrollHeight)){
          scheduleSwiper.slideTo(2);
          //mainSwiper.slideTo(3);
        }
       }
      });

  var schedule03Swiper = new Swiper('#schedule03',{
      scrollbar: '.swiper-scrollbar',
      direction: 'vertical',
      speed:transitionSpeed,
      slidesPerView: 'auto',
      freeMode: true,
      freeModeMomentum : false,
      mousewheelControl: true,
      mousewheelSensitivity : 0.77,
      roundLengths : true,
      onSetTransition: function(swiper,translate){
        //父级    
        if(scheduleSwiper.activeIndex==2){
          scheduleSwiper.params.onlyExternal=true;
          scheduleSwiper.disableMousewheelControl();
        }else{
          scheduleSwiper.params.onlyExternal=false;
          scheduleSwiper.enableMousewheelControl();
        }

        //translate 一直为0，不可直接用
        nowTranslate=swiper.translate;
        if(typeof(beforeTranslate)=="undefined"){
          beforeTranslate=0;
        };
        slideHeight=swiper.slides[0].scrollHeight;
        swiperHeight=swiper.height;
        if(nowTranslate>-2 && nowTranslate > beforeTranslate){
          scheduleSwiper.slideTo(1);
          beforeTranslate = -1;
        }
        if(slideHeight-swiperHeight+nowTranslate<2 && nowTranslate < beforeTranslate){
          mainSwiper.slideTo(3);
          mainSwiper.params.onlyExternal=false;
          mainSwiper.enableMousewheelControl();
          mainSwiper.enableKeyboardControl();
          $("#schedule03 .swiper-wrapper").css("transform","matrix(1, 0, 0, 1, 0, 0)")
          beforeTranslate = 1;
        }else{
          beforeTranslate=nowTranslate;
        }
      },
       onReachBeginning:function(swiper){
         if(swiper.translate>0){
          scheduleSwiper.slideTo(1);
        }
         if(swiper.translate<(swiper.height-swiper.slides[0].scrollHeight)){
          mainSwiper.slideTo(3);
        }
      }
  });


var transportSwiper = new Swiper('#transport', {
    direction: 'horizontal',
    speed:transitionSpeed,
    slidesPerView: 1,
    mousewheelControl: false,
    keyboardControl:true,
    roundLengths : true,
    autoplay:5000,
    prevButton:'.swiper-button-prev',
    nextButton:'.swiper-button-next',
    onSetTransition: function(swiper,translate){
      if(swiper.activeIndex==1 && $("#hotel_map1").html()==""){
        creatMap2();
        //$("#hotel_map1").attr("src","https://gaode.com/search?id=B001702171&city=500106&geoobj=106.577472%7C29.556369%7C106.579741%7C29.557361&query_type=IDQ&query=%E9%87%8D%E5%BA%86%E4%B8%BD%E8%8B%91%E5%A4%A7%E9%85%92%E5%BA%97&zoom=18");
      }
      if(swiper.activeIndex==2 && $("#hotel_map2").html()==""){
        creatMap3();
        //$("#hotel_map2").attr("src","https://gaode.com/search?query=%E7%93%A6%E8%88%8D%E5%9B%BD%E9%99%85%E9%9D%92%E5%B9%B4%E6%97%85%E8%88%8D(%E9%87%8D%E5%BA%86%E8%A7%A3%E6%94%BE%E7%A2%91%E8%BE%83%E5%9C%BA%E5%8F%A3%E5%9C%B0%E9%93%81%E7%AB%99%E5%BA%97)&city=500000&geoobj=106.570113%7C29.55144%7C106.57478%7C29.5536&zoom=18");
      }
      if(swiper.activeIndex==3 && $("#hotel_map3").html()==""){
        creatMap4();
        //$("#hotel_map3").attr("src","https://gaode.com/search?query=%E7%93%A6%E8%88%8D%E5%9B%BD%E9%99%85%E9%9D%92%E5%B9%B4%E6%97%85%E8%88%8D(%E9%87%8D%E5%BA%86%E8%A7%A3%E6%94%BE%E7%A2%91%E8%BE%83%E5%9C%BA%E5%8F%A3%E5%9C%B0%E9%93%81%E7%AB%99%E5%BA%97)&city=500000&geoobj=106.570113%7C29.55144%7C106.57478%7C29.5536&zoom=18");
      }
    }
  });