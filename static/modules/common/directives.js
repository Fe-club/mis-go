angular.module('directives', [])
    .directive('demoDirective', function(){
        return {
            restrict: 'E',
            replace: true,
            scope: {
                init: '@'
            },
            link: function(scope, element, attrs){
                console.log('directive');
            },
            template: '<div>第一个指令-来自{{init | demoFilter}}</div>'
        };
    })
    .directive('slidingValid', ['$timeout', function($timeout){
        return {
            restrict: 'E',
            scope: {
                arges: '='
            },
            replace: true,
            link: function(scope, element, attrs){
                var $slider = element.find('.sv-slider');
                var $boxUp = element.find('.sv-box-up');
                var $boxText = element.find('.sv-box-text');
                var isSlider = false;
                var isVaild = false;
                var oX = 0;
                var w = window.parseInt($boxText.css('width')) - 50;
                var body = document.body;

                scope.text = attrs.text || '请按住滑块，拖动到最右边';
                scope.textSuccess = attrs.textSuccess || '验证通过';

                $slider.on('mousedown', function(event){
                    isSlider = true;
                    oX = event.pageX;
                }).on('mouseup', function(event){
                    isSlider && gradual(event.pageX, oX, 0.015);
                    isSlider = false;
                });

                if(scope.arges && !scope.arges.reset){
                    scope.arges.reset = function(){
                        isSlider = false;
                        isVaild = false;
                        moveSlider(0);
                        $slider.removeClass('success');
                        $boxText.html(scope.text);
                        init();
                    };
                }

                init();
                function init(){
                    body.addEventListener('mousemove', onBodyMousemove);
                    body.addEventListener('mouseup', onBodyMouseup);
                }

                function onBodyMousemove(event){
                    if(isSlider){
                        if(moveSlider(event.pageX - oX)){
                            $boxText.html(scope.textSuccess);
                            $slider.addClass('success');
                            body.removeEventListener('mousemove', onBodyMousemove);
                            body.removeEventListener('mouseup', onBodyMouseup);
                            if(typeof scope.arges.success === 'function'){
                                scope.arges.success();
                            }
                        }
                    }
                }

                function onBodyMouseup(event){
                    isSlider && gradual(event.pageX, oX, 0.015);
                    isSlider = false;
                }

                // 移动滑块
                function moveSlider(x){
                    if(x >= w){
                        $slider.css('left', w);
                        $boxUp.css('width', w);
                        isVaild = true;
                        return true;
                    }

                    if(!isVaild && x >= 0){
                        $slider.css('left', x);
                        $boxUp.css('width', x);
                        return false;
                    }
                }

                // 缓动函数
                function gradual(currentX, targetX, a){
                    a = a || 0.03;
                    var timer = setInterval(function(){
                        if(currentX <= targetX){
                            clearInterval(timer);
                            moveSlider(0);
                        }else {
                            currentX = currentX - currentX * a;
                            moveSlider(currentX - targetX);
                        }
                    }, 16);
                }
            },
            template:
                '<div class="sv">' +
                    '<span class="sv-slider">' +
                        '<span class="sv-arrow">&gt;&gt;</span>' +
                        '<span class="sv-right"><i>&#10003;</i></span>' +
                    '</span>' +
                    '<label class="sv-box-down"></label>' +
                    '<label class="sv-box-up"></label>' +
                    '<label class="sv-box-text">{{text}}</label>' +
                '</div>'
        };
    }]);
