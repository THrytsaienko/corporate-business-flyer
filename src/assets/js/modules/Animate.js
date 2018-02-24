import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class Animate {
    constructor() {
        this.itemBlock1 = $('.block-1__content');
        this.itemBlock2 = $('.block-2__content');
        this.itemContacts = $('.contacts__content');
        this.itemFooter = $('.footer__content');
        this.createWaypoints();
    }

    createWaypoints() {
        var correctThis = this;
        this.itemBlock1.each(function () {
            var currentItem = this;
            new Waypoint({
                element: currentItem,
                handler: function () {
                    $(currentItem).addClass('animated bounceInLeft');
                },
                offset: '75%'
            });
        });
        this.itemBlock2.each(function () {
            var currentItem = this;
            new Waypoint({
                element: currentItem,
                handler: function () {
                    $(currentItem).addClass('animated zoomInDown');
                },
                offset: '75%'
            });
        });
        this.itemContacts.each(function () {
            var currentItem = this;
            new Waypoint({
                element: currentItem,
                handler: function () {
                    $(currentItem).addClass('animated lightSpeedIn');
                },
                offset: '75%'
            });
        });
        this.itemFooter.each(function () {
            var currentItem = this;
            new Waypoint({
                element: currentItem,
                handler: function () {
                    $(currentItem).addClass('animated zoomIn');
                }
            });
        });
    }
};
export default Animate;