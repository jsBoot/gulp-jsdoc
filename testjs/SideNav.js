/**
 * SideNav
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
     * @param {Object} [setting]  setting object
     *      @param {String} setting.el  jquery selector .
     *      @param {String} setting.nav   navigation button.
     *      @param {String} setting.target  target area
     *      @param {String} [setting.container]  nav container
     *      @param {String} [setting.autoNav]  whether listen to the change of area , default is true
     *      @param {String} [setting.fixTop]  fixtop
     *
     */
    var SideNav = function (setting) {
    }

    return SideNav;
}));
