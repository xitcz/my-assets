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

  // 初始化文章列表
  initArticleList();
});

// 文章列表初始化和加载功能
const initArticleList = () => {
  // 文章模板生成函数
  const generateArticleHTML = article => {
    const { permalink, title, type, abstract, created, views, commentsNum, agree, category } = article;
    const categoryDisplay = category.length ? 'flex' : 'none';
    const stickyDisplay = type === 'sticky' ? 'inline-block' : 'none';
    
    return `
      <li class="Xc_home_article-si index6">
        <div class="information">
          <a href="${permalink}" class="title" title="${title}" rel="noopener noreferrer">
            <span class="badge" style="display:${stickyDisplay}">置顶</span>${title}
          </a>
          <a class="abstract" href="${permalink}" title="文章摘要" rel="noopener noreferrer">${abstract}</a>
          <div class="meta">
            <ul class="items">
              <li><svg class="icon2" aria-hidden="true"><use xlink:href="#icon-time"></use></svg>${created}</li>
              <li><svg class="icon2" aria-hidden="true"><use xlink:href="#icon-yuedu"></use></svg>${views}</li>
              <li><svg class="icon2" aria-hidden="true"><use xlink:href="#icon-pinglun"></use></svg>${commentsNum}</li>
              <li><svg class="icon2" aria-hidden="true"><use xlink:href="#icon-zan"></use></svg>${agree}</li>
            </ul>
            <div class="last" style="display:${categoryDisplay}">
              <svg class="icon2" aria-hidden="true"><use xlink:href="#icon-A21"></use></svg>
              <a class="link" rel="noopener noreferrer" href="${category.length ? category[0].permalink : ''}">
                ${category.length ? category[0].name : ''}
              </a>
            </div>
          </div>
        </div>
      </li>
    `;
  };

  // 文章列表状态管理
  let listState = {
    page: window.Xc.PAGE_INDEX,
    pageSize: window.Xc.PAGE_SIZE,
    type: "created"
  };

  // 重置文章列表
  const resetArticleList = () => {
    $(".Xc_home_article .Xc_home_article-list").html("");
    $(".Xc_load").show();
    const activeItem = $(`.Xc_home_column-title .item[data-type="${listState.type}"]`);
    const line = $(".Xc_home_column-title .line");
    activeItem.addClass("active").siblings().removeClass("active");
  };

  // 加载文章列表数据
  const loadArticles = () => {
    return new Promise((resolve, reject) => {
      const $loadBtn = $(".Xc_load");
      const $loading = $(".Xc_home_article .Xc_home_article-list_loading");

      $loadBtn.attr("loading", true).html("loading...");
      $loading.show();

      $.ajax({
        url: Xc.BASE_API,
        type: "POST",
        dataType: "json",
        data: {
          routeType: "publish_list",
          page: listState.page,
          pageSize: listState.pageSize,
          type: listState.type
        },
        success(response) {
          const { data } = response;
          
          if (data.length === 0) {
            $loadBtn.removeAttr("loading").html("查看更多").hide();
            $loading.hide();
            Qmsg.warning("没有更多内容了");
            return resolve(0);
          }

          data.forEach(article => {
            $(".Xc_home_article .Xc_home_article-list").append(generateArticleHTML(article));
          });

          $loadBtn.removeAttr("loading").html("查看更多");
          $loading.hide();
          resolve(data.length);
        },
        error(err) {
          reject(err);
          Qmsg.error("加载失败，请稍后重试");
        }
      });
    });
  };

  // 初始化文章列表
  resetArticleList();
  loadArticles();

  // 绑定文章类型切换事件
  $(".Xc_home_column-title .item").on("click", async function() {
    const newType = $(this).attr("data-type");
    if (newType === listState.type) return;

    listState = {
      page: window.Xc.PAGE_INDEX,
      pageSize: window.Xc.PAGE_SIZE,
      type: newType
    };
    resetArticleList();
    await loadArticles();
  });

  // 绑定加载更多事件
  $(".Xc_load").on("click", async function() {
    if ($(this).attr("loading")) return;
    listState.page++;
    await loadArticles();
  });
};

// 初始化Fancybox配置
$(document).ready(() => {
  $.fancybox.defaults.hash = false;
});
