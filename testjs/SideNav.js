/**
 * 固定化导航栏控件
 * nav item must be a and attribute of href must be  #xxx , #xxx nav will trigger scroll by explorer
 * @module SideNav
 * @requires module:jquery
 */
(function (root, facotry) {

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], facotry);
    }else {
        root['SideNav'] = facotry($);
    }

}(this, function ($) {



    /**
     *
     * @constructor
     * @alias module:SideNav
     * @param {Object} [setting]  参数
     *      @param {String} setting.el  SideNav ，格式是 jquery selector .
     *      @param {String} setting.nav  SideNav 中的导航按钮 , 默认定位方式 href='#xx' 进行定位，格式是 jquery selector ,default is a。
     *      @param {String} setting.target  导航按钮所对应的定位区域，target 和 nav 个数必须是相同的. 格式是 jquery selector ， default is .side-nav-spy
     *      @param {String} [setting.container]  包裹 SideNav 的容器，SideNav 只能在其中滚动 ,格式是 jquery selector ,default is body
     *      @param {String} [setting.autoNav]  是否自动监听定位区域的变化 , default is true
     *      @param {String} [setting.fixTop]  定位点修正。
     *
     */
    var SideNav = function (setting) {


        var $el ,
            $ctn ,
            $target,
            $nav,

            targetSelector = '.side-nav-spy',
            activeClass = 'side-nav-item-active',
            navSelector = 'a',

            opt = {container : 'body' ,  autoNav : true  },
            targetOffsetCache = {},
            self = this,
            ctnOffset = null,
            ctnHeight = null,
            eventNameSp = 'sideNax:';

        //for function of fixNavPosition
        var elHeight = null ,
            preScrollTop = 0 ,
            firstScrollTop = null,
            isUp = false ,
            fixTop = 0;

        var _init = function () {
            opt = $.extend( opt , setting);

            opt.target &&  (targetSelector = opt.target);
            opt.nav &&  (navSelector = opt.nav);
            opt.activeClass &&  (activeClass = opt.activeClass);

            $el = $(opt.el);
            $ctn = $(opt.container);
            $target = $(targetSelector , $ctn);
            $nav = $(navSelector , $ctn);

            $nav.addClass('side-nav-item');

            bindEvent();
            resetTargetCache();
        }


        var resetTargetCache = function () {
            elHeight = $el.height();
            ctnOffset = $ctn.offset();
            ctnHeight = $ctn.height();

            var count = 0;
            $target.each(function ( key , value){
                var $this = $(this);
                var spyId = 'spy-id' + (count++);
                $this.data(spyId  , (count++));

                var offset = $this.offset();
                targetOffsetCache[spyId] = {
                    top: offset.top,
                    bottom: offset.top + $(this).height(),
                    $el: $this
                }

                if(firstScrollTop){
                    firstScrollTop > offset.top && (firstScrollTop = offset.top);
                }else {
                    firstScrollTop = offset.top;
                }
            });
        }

        var findItemHadScroll = function () {
            var matchedEl , count = 0;
            $.each(targetOffsetCache, function (key, value) {
                try {
                    var $navItem = $($nav.get(count)),
                        navOffset = $navItem.offset();
                    if (value.top <= navOffset.top && value.bottom > navOffset.top + $navItem.height()) {
                        matchedEl = $navItem;
                    }
                    count ++ ;
                }catch(e) {
                    console && console.log('can not matched nav'  );
                }
            });

            if (matchedEl) {
                matchedEl.trigger('click');
            }
        }


        var fixNavPosition = function (e) {
            var scrollTop = $(window).scrollTop();
            if (preScrollTop - scrollTop <= 0) {
                isUp = false;
            } else {
                isUp = true;
            }
            preScrollTop = scrollTop;

            var top = $el.offset().top;
            if (ctnOffset.top + ctnHeight < top + elHeight && !isUp) {
                $el.addClass('side-nav-bottom');
            } else if (scrollTop + fixTop < top && isUp && $el.hasClass('side-nav-bottom')) {
                $el.removeClass('side-nav-bottom ');
                if (scrollTop == 0) {
                    $el.removeClass('side-nav-scrolling');
                }
            } else if (scrollTop > firstScrollTop && !$el.hasClass('side-nav-scrolling')) { //  下来超过导航
                $el.addClass('side-nav-scrolling');
            } else if (scrollTop < firstScrollTop && $el.hasClass('side-nav-scrolling')) {   //   上拉超过最顶部
                $el.removeClass('side-nav-bottom side-nav-scrolling');
            }
        }




        var bindEvent = function () {
            $el.on('click', '.side-nav-item', function (e) {

                var $this = $(this);

                $nav.removeClass(activeClass);
                $this.addClass(activeClass);

                self.trigger(eventNameSp + 'click');
            });


            var clearId , flag = false;

            $(window).on('scroll', function (e) {
                if (flag) {
                    return;
                }
                flag = true;
                clearId = setTimeout(function () {
                    opt.autoNav && resetTargetCache();
                    fixNavPosition(e);
                    findItemHadScroll();
                    flag = false;
                }, 25);
            });

        }

        _init();



        //////////////////  public mehtod /////////////////////

        /**
         * 绑定事件
         * @param argument  参考jquery on
         *
         * @fires click 点击后回调
         *
         */
        this.on = function(){
            arguments[0] = eventNameSp + arguments[0];
            $el.on.apply($el , arguments);
        }


        /**
         * 取消事件
         * @param argument  参考jquery off
         */
        this.off = function(){
            arguments[0] = eventNameSp + arguments[0];
            $el.off.apply($el , arguments);
        }

        /**
         * 触发事件
         * @param argument 参考jquery trigger
         *
         */
        this.trigger = function(){
            arguments[0] = eventNameSp + arguments[0];
            $el.trigger.apply($el , arguments);
        }

        /**
         * 重置记录的定位区域(authNav = true 将会自动监听)
         */
        this.resetItemPosition = function () {
            resetTargetCache();
            $el.removeClass('side-nav-bottom side-nav-scrolling');
            $(window).trigger('side-nav-scroll');
        }


    }




    return SideNav;
}));
