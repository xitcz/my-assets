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

});

$(document).ready(function () {
$.fancybox.defaults.hash = false;
});
