document.addEventListener("DOMContentLoaded", () => {
    Xc_tongji();
  });
  function Xc_tongji() {
    let page = 0;
    function loadData() {
      if ($('.Xc_census__filing .button').html() === 'loading...') return;
      $.ajax({
        url: Xc.BASE_API,
        type: 'POST',
        dataType: 'json',
        data: { routeType: 'article_filing', page: ++page },
        success(res) {
          if (!res.length) {
            $('.Xc_census__filing .item.load').remove();
            Qmsg.warning('没有更多内容了');
            return;
          }
          const html = res.map(item =>
            `<div class="item">
              <div class="tail"></div>
              <div class="head"></div>
              <div class="wrapper">
                <div class="panel">${item.date}<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M21.6 772.8c28.8 28.8 74.4 28.8 103.2 0L512 385.6l387.2 387.2c28.8 28.8 74.4 28.8 103.2 0 28.8-28.8 28.8-74.4 0-103.2L615.2 282.4l-77.6-77.6c-14.4-14.4-37.6-14.4-51.2 0l-77.6 77.6L21.6 669.6c-28.8 28.8-28.8 75.2 0 103.2z"/></svg></div>
                <ol class="panel-body">
                  ${item.list.map(sub => `<li><a rel="noopener noreferrer" target="_blank" href="${sub.permalink}">${sub.title}</a></li>`).join('')}
                </ol>
              </div>
            </div>`
          ).join('');
          $('#filing').append(html);
          $('.Xc_census__filing .button').html('加载更多');
        }
      });
    }
    loadData();
    $('.Xc_census__filing .content').on('click', '.panel', function () {
      const $content = $(this).parents('.content');
      $content.find('.panel').not(this).removeClass('in');
      $content.find('.panel-body').not($(this).siblings('.panel-body')).stop().hide('fast');
      $(this).toggleClass('in').siblings('.panel-body').stop().toggle('fast');
    });
    $('.Xc_census__filing .button').on('click', function () {
      $(this).html('loading...');
      loadData();
    });
  }
