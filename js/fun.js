(function(sihan,$){
	//格式化 JSON 字符串
	sihan.formatJSON = function(str){
		return "JSON" in window ? JSON.parse(str) : eval('('+str+')');
	}
	//
	
})(window.sihan={},$)
