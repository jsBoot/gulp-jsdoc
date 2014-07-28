/**
 * 用于中奖名单的滚屏插件
 * @module Roll
 * @requires module:jquery
 */
define([
    'jquery'
], function($) {
	/**
     * @constructor
     * @alias module:Roll
     * @param {Selector} selector 容器
     * @param {Object} [option] 参数
     * 		@param {Number} [option.interval] 动画间隔
     * 		@param {Number} [option.distance] 滚动距离
     */
    var exports = function (selector, option) {
        option = option || {};
        this.container = $(selector);
        this.interval = option.interval || 5000;
        this.distance = option.distance || 30;
        this._scroll();
    }
    exports.prototype = {
        constructor: exports,
        _scroll: function () {
            var self = this,
                container = self.container;
            setTimeout(function () {
                container.animate({
                    top: '-=' + self.distance
                }, 1000, function(){
                    container.children().eq(0).appendTo(container);
                    container.css('top', 0);
                });
                self._scroll();
            }, self.interval);
        },
        /**
         * 插入html片段
         * @param {String} html html字符串
         */
        html: function (html) {
            this.container.html(html);
            return this;
        }
    }

    return exports;
});
