var pjax = new Pjax({
selectors: [
"head",
".Xc_Pjax",
".Xc_top_img",
".header_internal",
".header_roll",
".header_search",
".header_hyal",
".header_below-classify",
"Xc_Pjax_top",
]
});

$(document).on('pjax:send', function() {
NProgress.start();
$('#Loadanimation').show();

});

$(document).on("pjax:complete", function () {
Xc_mode();Search_Box_pop_up();Global_drop_down_box();Rewrite_the_comments();Comments_submitted();Comments_window();Comment_Format();Switch_labels();Wap_Sidebar();Wap_Search_Box();Search_Box_Close();Wap_Search_Box_Close();Website_time();Comment_emoji();Me_motto();header_scrolling();Smooth_down();Xc_post_GN();Xc_Wallpaper();Message_card();Xc_post_Rotation_swiper();NProgress.done();Countdown_to_life();Dog_Licking_Diary();Xc_tongji();

$('#Loadanimation').hide();


{
const e = (e) =>
 `\n<li class="Xc_home_article-si index2">\n<a href="${
e.permalink
}" class="thumbnail" title="${
e.title
}" rel="noopener noreferrer">\n<img width="100%" height="100%" class="lazyload" src="${
e.lazyload
}" data-src="${e.image[0]}" alt="${
e.title
}" />\n</a>\n<div class="information">\n<a href="${
e.permalink
}" class="title" title="${
e.title
}" rel="noopener noreferrer">\n<span class="badge" style="display:${
"sticky" === e.type ? "inline-block" : "none"
}">置顶</span>${e.title}\n</a>\n<a class="abstract" href="${
e.permalink
}" title="文章摘要" rel="noopener noreferrer">${
e.abstract
}</a>\n<div class="meta">\n<ul class="items">\n<li><svg class="icon2" aria-hidden="true"><use xlink:href="#icon-time"></use></svg>${
e.created
}</li>\n<li><svg class="icon2" aria-hidden="true"><use xlink:href="#icon-yuedu"></use></svg>${
e.views
}</i></li>\n<li><svg class="icon2" aria-hidden="true"><use xlink:href="#icon-pinglun"></use></svg>${
e.commentsNum
}</li>\n<li><svg class="icon2" aria-hidden="true"><use xlink:href="#icon-zan"></use></svg>${
e.agree
}</li>\n</ul>\n<div class="last" style="display:${
e.category.length ? "flex" : "none"
}">\n<svg class="icon2" aria-hidden="true"><use xlink:href="#icon-A21"></use></svg>\n<a class="link" rel="noopener noreferrer" href="${
e.category.length && e.category[0].permalink
}">${
e.category.length && e.category[0].name
}</a>\n</div>\n</div>\n</div>\n</li>\n`;
let l = {
page: window.Xc.PAGE_INDEX,
pageSize: window.Xc.PAGE_SIZE,
type: "created"
};
const t = () => {
$(".Xc_home_article .Xc_home_article-list").html(""), $(".Xc_load").show();
let e = $('.Xc_home_column-title .item[data-type="' + l.type + '"]'),
t = $(".Xc_home_column-title .line");
e.addClass("active").siblings().removeClass("active"), t.css({});
},
a = () =>
new Promise((t, a) => {
$(".Xc_load").attr("loading", !0),
$(".Xc_load").html("loading..."),
$(".Xc_home_article .Xc_home_article-list_loading").show(),
$.ajax({
url: Xc.BASE_API,
type: "POST",
dataType: "json",
data: {
routeType: "publish_list",
page: l.page,
pageSize: l.pageSize,
type: l.type
},
success(l) {
if (0 === l.data.length)
return (
$(".Xc_load").removeAttr("loading"),
$(".Xc_load").html("查看更多"),
$(".Xc_load").hide(),
$(".Xc_home_article .Xc_home_article-list_loading").hide(),
Qmsg.warning("没有更多内容了")
);
l.data.forEach((l) =>
$(".Xc_home_article .Xc_home_article-list").append(e(l))
),
$(".Xc_load").removeAttr("loading"),
$(".Xc_load").html("查看更多"),
$(".Xc_home_article .Xc_home_article-list_loading").hide(),
t(l.data.length > 0 ? l.data.length - 1 : 0);
}
});
});
t(),
a(),
$(".Xc_home_column-title .item").on("click", async function () {
$(this).attr("data-type") !== l.type &&
((l = {
page: window.Xc.PAGE_INDEX,
pageSize: window.Xc.PAGE_SIZE,
type: $(this).attr("data-type")
}),
t(),
a());
}),
$(".Xc_load").on("click", async function () {
if ($(this).attr("loading")) return;
l.page++;
let e = await a();
e = $(".Xc_home_article .Xc_home_article-list .Xc_home_article-si").length - e;
const t = `.Xc_home_article .Xc_home_article-list .Xc_home_article-si:nth-child(${e})`,
n = $(t).offset();
});
}

});

$(document).ready(function () {
$.fancybox.defaults.hash = false;
});
