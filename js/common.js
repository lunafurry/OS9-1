(function($,sihan){
	// 全局检测 Ctrl Alt 键状态
	sihan.alt=false;
	sihan.ctrl=false;
	sihan.shift=false;
	$(window).on('keydown keyup',function(e){
		sihan.alt=e.altKey ? true : false;
		sihan.ctrl=e.ctrlKey ? true : false;
		sihan.shift=e.shiftKey ? true : false;
	})
	// 拖拽
	sihan.drag=function(obj){
		var startY,startX,top,left,_switch=false;
		$(obj).on('mousedown',function(e){
			_switch = true;
			startY=e.clientY,startX=e.clientX;
			top=$(this).offset().top,left=$(this).offset().left;

			$('body').on('mousemove',function(ev){
				_switch ? $(obj).css({"top":ev.clientY - startY + top +"px","left":ev.clientX - startX + left +"px"}) : null;
			})
		})
		$(obj).on('mouseup',function(){
			_switch = false;
		})
	}
	// 右键菜单
	// 所有右键菜案都会有 switch-menu 类
	sihan.menu=function(obj,showObj){
		var top,left,winW=$(window).width(),showObjW=$(showObj).width(),winH=$(window).height(),showObjH=$(showObj).height();
		$(obj).on('contextmenu',function(e){
			top=e.clientY,left=e.clientX;
			left = left > (winW - showObjW) ? (winW - showObjW) : left;
			top = top > (winH - showObjH) ? (winH -showObjH) : top;
			$('.switch-menu').hide();
			$(showObj).css({"top": top + "px","left": left + "px"}).show();
			return false;
		})
	}
	// 按住鼠标多选
	sihan.rect=function(obj,type){
		var startX,startY,_switch=false,endX,endY;
		$(obj).on('mousedown',function(e){
			_switch = true;
			startX=e.clientX,startY=e.clientY;
			$('#rect').css({"top":startY+"px","left":startX+"px"}).show();
			$(obj).on('mousemove',function(ev){
				endX=ev.clientX - startX,endY=ev.clientY - startY;
				//_switch ? $('#rect').css({"width":ev.clientX - startX +"px","height":ev.clientY - startY +"px"}) : null;
				$('#rect').css({"width":ev.clientX - startX +"px","height":ev.clientY - startY +"px"})
			})
		})
		$(obj).on('mouseup',function(){
			_switch = false;
			$('#rect').css({"height":"0px","width":"0px"}).hide();
		})

	}
})($,window.sihan={})

// sihan.drag('.file-explorer');
// sihan.menu('#desktop','.context-menu');
// sihan.menu('#desktop li','.context-menu-desktop');
sihan.rect('#desktop');
$(function(){

	//判断是否点击 window其他区域
	$(window).on('click',function(){
		$('.switch-menu').hide();
		$('#desktop li').removeClass('active').find('p').addClass('ellipsis');
		$('.file-explorer').addClass('file-explorer-unactive');
	})
	// 桌面图标 点击选择  Ctrl多选
	$('#desktop').on('click','li',function(){
		if(sihan.ctrl){
			$(this).addClass('active');
		}else{
			$(this).addClass('active').siblings().removeClass('active'); 
			$(this).find('p').removeClass('ellipsis').parent().siblings().find('p').addClass('ellipsis');
		}
		return false;
	})
//	//转换定位
//	$('#desktop li').each(function(i){
//		var t=$(this).offset().top;
//		var l=$(this).offset().left;
//		$(this).css({"left":l,"top":t});
//	})
//	$('#desktop li').each(function(i){
//		$(this).css({"position":'absolute'});
//	})
	//navbar
//	$('.navbar-icon li').hover(function(){
//		var c=$(this).prop('class');
//		if(!c){
//			$(this).addClass('hover').siblings().removeClass('hover');
//		}
//	},function(){
//		$(this).removeClass('hover');		
//	})
	//关闭文件资源管理器
//	$('.file-explorer-tiitle .active').on('click',function(){
//		$('.file-explorer').hide();
//	})
})
