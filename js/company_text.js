var scrollTop;

// delay 초 후에 active 시킨다.
function djAppear__setTimeActive($node) {
    var delay = $node.attr('data-dj-appear-delay');
    delay = delay ? parseInt(delay) : 0;
    
    setTimeout(function() {
        if ( $node.hasClass('dj-appear-found') ) {
            $node.addClass('dj-appear-active');
        }
        else {
            $node.removeClass('dj-appear-active');
        }
    }, delay);
}

// jhs appear 엘리먼트 발견 콜백
function djAppear__onFound($node) {
    
}

// jhs appear 엘리먼트들 초기화
function djAppear__init() {
    var $djAppearEl = $('.dj-appear');
    
    setInterval(function() {
        scrollTop = $(window).scrollTop();
        var scrollHeight = $('body').prop('scrollHeight');
        var windowHeight = $(window).height();
        
        $djAppearEl.each(function(index, node) {
            var $node = $(node);
            
            var djAppearTriggerElSelector = $node.attr('data-dj-appear-trigger-el');
            var $djAppearTriggerEl = djAppearTriggerElSelector ? $(djAppearTriggerElSelector) : $node;
            
            var djAppearTriggerElAddiTop = $node.attr('data-dj-appear-trigger-el-addi-top');
            
            djAppearTriggerElAddiTop = djAppearTriggerElAddiTop ? djAppearTriggerElAddiTop : '0';
            
            if ( djAppearTriggerElAddiTop.indexOf("% of window height") !== false ) {
                djAppearTriggerElAddiTop = djAppearTriggerElAddiTop.split('% of window height');
                djAppearTriggerElAddiTop = djAppearTriggerElAddiTop[0];
                djAppearTriggerElAddiTop = windowHeight * parseInt(djAppearTriggerElAddiTop) / 100;
            }
            else {
                djAppearTriggerElAddiTop = parseInt(djAppearTriggerElAddiTop);
            }
            
            var top = $djAppearTriggerEl.offset().top;
            
            var condi = scrollTop + windowHeight > top + djAppearTriggerElAddiTop;
            
            if ( $node.hasClass('dj-appear-active-only-visible') ) {
                condi = condi && scrollTop + windowHeight < top + djAppearTriggerElAddiTop + windowHeight;
            }
            
            if ( condi ) {
                if ( $node.hasClass('dj-appear-found') === false ) {
                    djAppear__onFound($node);
                    
                    $node.addClass('dj-appear-found');
                    djAppear__setTimeActive($node);
                }
            }
            else {
                if ( $node.hasClass('dj-appear-found') && $node.hasClass('dj-appear-irreversible') === false ) {
                    $node.removeClass('dj-appear-found');
                    $node.removeClass('dj-appear-active');
                }
            }
        });
    }, 200);
}

$(function() {
    djAppear__init();
});