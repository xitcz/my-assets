ViewHistory = function() {
    this.config = {
        limit: 10,
        storageKey: 'viewHistory',
        primaryKey: 'url'
    };
    this.cache = {
        localStorage:  null,
        userData:  null,
        attr:  null
    };
};
ViewHistory.prototype = {
    init: function(config) {
        this.config = config || this.config;
        var _self = this;
        if (!window.localStorage && (this.cache.userData = document.body) && this.cache.userData.addBehavior && this.cache.userData.addBehavior('#default#userdata')) {
            this.cache.userData.load((this.cache.attr = 'localStorage'));
            this.cache.localStorage = {
                'getItem': function(key) {
                    return _self.cache.userData.getAttribute(key);
                },
                'setItem': function(key, value) {
                    _self.cache.userData.setAttribute(key, value);
                    _self.cache.userData.save(_self.cache.attr);
                }
            };
        } else {
            this.cache.localStorage = window.localStorage;
        }
    },
    addHistory: function(item) {
        var items = this.getHistories();
        for(var i=0, len=items.length; i<len; i++) {
            if(item[this.config.primaryKey] && items[i][this.config.primaryKey] && item[this.config.primaryKey] === items[i][this.config.primaryKey]) {
                items.splice(i, 1);
                break;
            }
        }
        items.push(item);
        if(this.config.limit > 0 && items.length > this.config.limit) {
            items.splice(0, 1);
        }
        var json = JSON.stringify(items);
        this.cache.localStorage.setItem(this.config.storageKey, json);
    },
    getHistories: function() {
        var history = this.cache.localStorage.getItem(this.config.storageKey);
        if(history) {
            return JSON.parse(history);
        }
        return [];
    }
};
function jl_viewHistory(config){
    if(typeof localStorage !== 'undefined' && typeof JSON !== 'undefined') {
        var viewHistory = new ViewHistory();
        viewHistory.init({
            limit: config.limit,
            storageKey: config.storageKey,
            primaryKey: config.primaryKey
        });
    }
    var wrap = document.getElementById(config.storageKey);
    if(!viewHistory){
        if(wrap){
            wrap.style.display = 'none';
        }
        return;
    }
    if(viewHistory && wrap) {
        var histories = viewHistory.getHistories();
        var list = document.createElement('ul');
        if(histories && histories.length > 0) {
            for(var i=histories.length-1; i>=0; i--) {
                var history = histories[i];
                var item = document.createElement('li');
                var link = document.createElement('a');
                link.href = history.url;
                link.innerHTML = history.title;
                item.appendChild(link);
                list.appendChild(item);
            }
            wrap.appendChild(list);
             $("#jl_viewHistory ul li a").prepend("<svg class='icon2' aria-hidden='true'><use xlink:href='#icon-A120'></use></svg> ");
        }
    }
    if( viewHistory && config.addHistory) {
        var page = {
            "title": document.getElementsByClassName("Xc_psot_title")[0].innerText,
            "url": location.href 
        };
        viewHistory.addHistory(page);
    }
}