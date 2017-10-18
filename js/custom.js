// 对 Next 主题进行定制



//MathJax
window.MathJax = {
    AuthorInit: function () {
      MathJax.Hub.Register.StartupHook("Begin",function () {
        MathJax.Hub.Queue(function() {
      var all = MathJax.Hub.getAllJax(), i;
      for (i=0; i < all.length; i += 1) {
        all[i].SourceElement().parentNode.className += ' has-jax';
      }
    });
      });
    }
  };

window.MathJax = {
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      processEscapes: true,
      skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
    }
  };


//  <script type="text/javascript" src="//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
// jQuery
$.getScript('https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML', function()
{
    // script is now loaded and executed.
    // put your dependent JS here.
});






  // https://github.com/iissnan/hexo-theme-next/issues/947 侧边栏的关闭 更加方便：边栏内非链接区或者边栏外点击
  // $('.sidebar-inner').css({'height':'100%'});
  $('body').on('click',function(e){
    var bSidebarShow = $('#sidebar').css('display')==='block' && $('#sidebar').width() > 0;
    var bFlag = $(e.target).parents('#sidebar,.sidebar-toggle').length > 0;
    if(bSidebarShow && !bFlag){
        $('.sidebar-toggle-line-wrap').trigger('click');
        e.preventDefault();
    }
  });






// 在博文中加入标题自动编号
//	2016-09-18 10:15 不需要区分博文页还是其他页面了
$(document).ready(function(){
 $(".post-body").each(function(){
 var $article = $(this);
 var count = [0, 0, 0, 0, 0, 0];
 var mark = [0, 0, 0, 0, 0, 0];

  (function setMark(){
    var hTag = ["h1", "h2", "h3", "h4", "h5", "h6"];
    var index = 0;
    for (var i = 0; i < 6; ++i) {
      if ($article.children(hTag[i]).length > 0) {
        ++index;
        mark[i] = index;
      }
    }
  })();

    $article.children(":header").each(function(){
    var t = $(this);
    var pos = 0;
    switch (t[0].tagName) {
      case "H1": pos = 0; break;
      case "H2": pos = 1; break;
      case "H3": pos = 2; break;
      case "H4": pos = 3; break;
      case "H5": pos = 4; break;
      case "H6": pos = 5; break;
    }

    var len = mark[pos];
    if (len < 6) { count[len] = 0; }
    count[len - 1]++;

    var listStr = count[0] + "";
    for (var i = 1; i < len; ++i) { listStr += "." + count[i]; }
    listStr += " ";
    t.html(listStr + t.html());
  });
 });
});







// 特定段落(标志 ooNoIndent00)不缩进
$('p:contains("ooNoIndent00")').each(function() {
	var str = $(this).text();
	if (str.match("^ooNoIndent00")) {
		var text = $(this).html();
		$(this).css('text-indent', '0em');
		$(this).html(text.replace('ooNoIndent00', '')); 
	}
});








// 函数: html 中去掉 某 tag 最后那一次出现
var rmLastElm = function(text, selector) {
    var wrapped = $("<div>" + text + "</div>");
    wrapped.find(selector).last().remove();
    return wrapped.html();
}


// 弹出 tip 显示 脚注
var $fRef = $(".footnoteRef");
for(let i=0; i<$fRef.length; i++) {
	var sup = $fRef.children("sup")[i];		//work reliably as long as there's exactly one sup per footnotRef
//	var sup = $fRef[i].children("sup");		//a classic Dom Element, so it doesn't have any children method
	sup.onmouseover = function(event) {
		$('.footnoteTip').remove();
		var pTip = document.createElement('div');
		pTip.className = 'footnoteTip';		// CSS
		pTip.innerHTML = rmLastElm(document.getElementById($fRef[i].getAttribute("href").substring(1)).innerHTML,"a");
		document.body.appendChild(pTip);

		var posLeft = event.pageX - 180;
		if (posLeft<0) posLeft = 20;
		var posTop = event.pageY + 20;
		var od = $('.footnoteTip');
		var oH = od.outerHeight();
		var oW = od.outerWidth();
		if(posTop + oH - window.pageYOffset > $(window).height()) 	posTop = posTop - oH -40;
		if (posLeft + oW > $(window).width()) posLeft = $(window).width() - oW -20;	//NexT.Mist pageXOffset=0
		pTip.style.left = posLeft + 'px';
		pTip.style.top = posTop + 'px';

	};

	sup.onmouseout = function(event) {
		$('.footnoteTip').remove();
	};
}



