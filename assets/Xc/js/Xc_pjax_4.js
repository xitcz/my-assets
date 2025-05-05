// 定义PJAX配置和选择器
const pjaxSelectors = [
  "head",
  ".Xc_Pjax",
  ".Xc_top_img",
  ".header_internal",
  ".header_roll",
  ".header_search",
  ".header_hyal",
  ".header_below-classify",
  "Xc_Pjax_top"
];

// 初始化PJAX
const pjax = new Pjax({ selectors: pjaxSelectors });

// PJAX加载开始事件
$(document).on('pjax:send', () => {
  NProgress.start();
  $('#Loadanimation').show();
});

// PJAX加载完成事件
$(document).on("pjax:complete", () => {
  // 执行所有必要的页面初始化函数
  const initFunctions = [
    Xc_mode, Search_Box_pop_up, Global_drop_down_box, Rewrite_the_comments,
    Comments_submitted, Comments_window, Comment_Format, Switch_labels,
    Wap_Sidebar, Wap_Search_Box, Search_Box_Close, Wap_Search_Box_Close,
    Website_time, Comment_emoji, Me_motto, header_scrolling, Smooth_down,
    Xc_post_GN, Message_card, Xc_post_Rotation_swiper,
    NProgress.done, Countdown_to_life, Dog_Licking_Diary
  ];
  initFunctions.forEach(fn => fn());
  $('#Loadanimation').hide();
});

// 初始化Fancybox配置
$(document).ready(() => {
  $.fancybox.defaults.hash = false;
});
