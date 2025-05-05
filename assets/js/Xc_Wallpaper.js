document.addEventListener("DOMContentLoaded", () => {
    Xc_Wallpaper();
  });
  function Xc_Wallpaper() {
    let loading = false,
      page = { cid: -999, start: -999, count: 48 },
      total = -999;
    function renderList() {
      window.scrollTo({ top: 0, behavior: "smooth" });
      $(".Xc_wallpaper__list").html("");
      loading = true;
      $.ajax({
        url: Xc.BASE_API,
        type: "POST",
        dataType: "json",
        data: {
          routeType: "wallpaper_list",
          cid: page.cid,
          start: page.start,
          count: page.count
        },
        success(res) {
          if (res.code !== 1) return (loading = false);
          loading = false;
          let html = res.data.map(item =>
            `<a class="item animated bounceIn" data-fancybox="gallery" href="${item.url}">
              <img width="100%" height="100%" class="lazyload" src="${Xc.LAZY_LOAD}" data-src="${item.img_1024_768 || item.url}" alt="壁纸">
            </a>`
          ).join("");
          $(".Xc_wallpaper__list").html(html);
          total = res.total;
          renderPagination();
        }
      });
    }
    function renderPagination() {
      let html = "";
      const curPage = Math.ceil(page.start / page.count) + 1;
      const maxPage = Math.ceil(total / page.count);
      if (page.start / page.count !== 0) {
        html += `<li class="Xc_wallpaper__pagination-item" data-start="0">首页</li>`;
        html += `<li class="Xc_wallpaper__pagination-item" data-start="${page.start - page.count}"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="12" height="12"><path d="M822.272 146.944l-396.8 396.8c-19.456 19.456-51.2 19.456-70.656 0-18.944-19.456-18.944-51.2 0-70.656l396.8-396.8c19.456-19.456 51.2-19.456 70.656 0 18.944 19.456 18.944 45.056 0 70.656z"/><path d="M745.472 940.544l-396.8-396.8c-19.456-19.456-19.456-51.2 0-70.656 19.456-19.456 51.2-19.456 70.656 0l403.456 390.144c19.456 25.6 19.456 51.2 0 76.8-26.112 19.968-51.712 19.968-77.312.512zm-564.224-63.488c0-3.584 0-7.68.512-11.264h-.512v-714.24h.512c-.512-3.584-.512-7.168-.512-11.264 0-43.008 21.504-78.336 48.128-78.336s48.128 34.816 48.128 78.336c0 3.584 0 7.68-.512 11.264h.512v714.24h-.512c.512 3.584.512 7.168.512 11.264 0 43.008-21.504 78.336-48.128 78.336s-48.128-35.328-48.128-78.336z"/></svg></li>`;
        html += `<li class="Xc_wallpaper__pagination-item" data-start="${page.start - page.count}">${curPage - 1}</li>`;
      }
      html += `<li class="Xc_wallpaper__pagination-item active">${curPage}</li>`;
      if (page.start < total - page.count) {
        html += `<li class="Xc_wallpaper__pagination-item" data-start="${page.start + page.count}">${curPage + 1}</li>`;
        html += `<li class="Xc_wallpaper__pagination-item" data-start="${page.start + page.count}"><svg class="next" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="12" height="12"><path d="M822.272 146.944l-396.8 396.8c-19.456 19.456-51.2 19.456-70.656 0-18.944-19.456-18.944-51.2 0-70.656l396.8-396.8c19.456-19.456 51.2-19.456 70.656 0 18.944 19.456 18.944 45.056 0 70.656z"/><path d="M745.472 940.544l-396.8-396.8c-19.456-19.456-19.456-51.2 0-70.656 19.456-19.456 51.2-19.456 70.656 0l403.456 390.144c19.456 25.6 19.456 51.2 0 76.8-26.112 19.968-51.712 19.968-77.312.512zm-564.224-63.488c0-3.584 0-7.68.512-11.264h-.512v-714.24h.512c-.512-3.584-.512-7.168-.512-11.264 0-43.008 21.504-78.336 48.128-78.336s48.128 34.816 48.128 78.336c0 3.584 0 7.68-.512 11.264h.512v714.24h-.512c.512 3.584.512 7.168.512 11.264 0 43.008-21.504 78.336-48.128 78.336s-48.128-35.328-48.128-78.336z"/></svg></li>`;
        html += `<li class="Xc_wallpaper__pagination-item" data-start="${total - page.count}">末页</li>`;
      }
      $(".Xc_wallpaper__pagination").html(html);
    }
    $.ajax({
      url: Xc.BASE_API,
      type: "POST",
      dataType: "json",
      data: { routeType: "wallpaper_type" },
      success(res) {
        if (res.code !== 1)
          return $(".Xc_wallpaper__type-list").html('<li class="error">壁纸抓取失败！请联系作者！</li>');
        if (!res.data.length)
          return $(".Xc_wallpaper__type-list").html('<li class="error">暂无数据！</li>');
        let html = res.data.map(item => `<li class="item animated swing" data-cid="${item.id}">${item.name}</li>`).join("");
        $(".Xc_wallpaper__type-list").html(html);
        $(".Xc_wallpaper__type-list .item").first().click();
      }
    });
    $(".Xc_wallpaper__type-list").on("click", ".item", function () {
      const cid = $(this).attr("data-cid");
      if (!loading) {
        $(this).addClass("active").siblings().removeClass("active");
        page.cid = cid;
        page.start = 0;
        renderList();
      }
    });
    $(".Xc_wallpaper__pagination").on("click", ".Xc_wallpaper__pagination-item", function () {
      const start = $(this).attr("data-start");
      if (start && !loading) {
        page.start = Number(start);
        renderList();
      }
    });
  }