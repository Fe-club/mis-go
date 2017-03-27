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
    .directive('copy', function(){
        return {
          restrict: 'A',
          link: function(scope, element, attrs){
              element.on('click', function(){
                  var text = attrs.copy || '复制内容有误，请尝试选中需要复制的内容并右键选择复制';
                  var element = document.createElement('input');
                  element.type = 'text';
                  element.value = text;
                  document.body.appendChild(element);
                  element.select();
                  document.execCommand('copy');
                  document.body.removeChild(element);
                  alert('复制成功！');
              });
          }
        };
    })
    .directive('enter', function(){
        return function(scope, element, attrs){
            element.bind('keydown keypress', function(event){
                if(event.which === 13){
                    scope.$apply(function(){
                        scope.$eval(attrs.enter);
                    });
                    event.preventDefault();
                }
            });
        };
    })
    /**
     * [分页器]
     * init: {
     *   page: {[Number]}      (选填)  当前页
     *   pageCount: {Number}   (必填)  总页数
     *   callback: {Function}  (必填)  回调执行  传递当前页
     * }
     */
    .directive('pager', function(){
        return {
            restrict: 'E',
            scope: {
                init: '=',
            },
            link: function(scope, element, attrs){
                var omit = '…';
                scope.data = [];
                scope.currentPage = 1;
                scope.clickAction = function(event){
                    var target = event.target;
                    var tag = target.getAttribute('data-tag');
                    if(tag && tag !== omit && target.className !== 'disabled'){
                        if(tag === 'prev'){
                            scope.currentPage--;
                        }else if(tag === 'next'){
                            scope.currentPage++;
                        }else {
                            scope.currentPage = tag;
                        }
                        action(scope.currentPage);
                    }
                };

                scope.enterAction = function(jumpPage){
                    var count = scope.init.pageCount;
                    if(jumpPage && jumpPage > count){
                        action(count);
                        scope.currentPage = count;
                    }else if(jumpPage && jumpPage < 1){
                        action(1);
                        scope.currentPage = 1;
                    }else if(jumpPage){
                        action(jumpPage);
                        scope.currentPage = jumpPage;
                    }
                };

                if(scope.init.page){
                    action(scope.init.page);
                    scope.currentPage = scope.init.page;
                }

                if(scope.init.pageCount){
                    initPage(scope.init.pageCount);
                }else {
                    var wather = scope.$watch('init.pageCount', function(n, o){
                        if(n != o){
                            initPage(scope.init.pageCount);
                            wather();
                        }
                    });
                }

                function action(currentPage){
                    typeof scope.init.callback && scope.init.callback(currentPage);
                    buildPage(currentPage);
                }

                function buildPage(currentPage){
                    var count = scope.init.pageCount;
                    var data3 = scope.data[3];
                    var data5 = scope.data[5];
                    currentPage = window.parseInt(currentPage);
                    // 当前页为中间页 不变
                    if(currentPage != scope.data[4]){
                        scope.data.forEach(function(val, i){
                            // 总数 >= 10 并且 两端的两个数始终不变
                            if(count >= 10 && i > 2 && i < 8){
                                // 当前页为 1 / 2 / 3 / 4 / 5
                                if(currentPage <= 5){
                                    if(i === 7){
                                        scope.data[6] = omit;
                                    }else {
                                        scope.data[i - 1] = i;
                                    }
                                // 当前页为 n - 4 / n - 3 / n - 2 / n - 1 / n
                                }else if(currentPage >= count - 4){
                                    if(i === 3){
                                        scope.data[2] = omit;
                                    }else {
                                        scope.data[i - 1] = count + i - 9;
                                    }
                                // 上一页
                                }else if(currentPage == data3){
                                    if(i === 7 || i === 3){
                                        scope.data[i - 1] = omit;
                                    }else {
                                        scope.data[i - 1] -= 1;
                                    }
                                // 下一页
                                }else if(currentPage == data5){
                                    if(i === 7 || i === 3){
                                        scope.data[i - 1] = omit;
                                    }else {
                                        scope.data[i - 1] += 1;
                                    }
                                // 中间部分
                                }else {
                                    if(i === 7 || i === 3){
                                        scope.data[i - 1] = omit;
                                    }else {
                                        scope.data[i - 1] = currentPage + i - 5;
                                    }
                                }
                            }
                        });
                    }
                }

                function initPage(pageCount){
                    var i = 1;
                    if(pageCount < 10){
                        for(; i <= pageCount; i++){
                            scope.data.push(i);
                        }
                    // pageCount 可能会是个字符串类型
                    }else if(pageCount == 10){
                        for(; i <= 9; i++){
                            if(i <= 6){
                                scope.data.push(i);
                            }else if(i === 7){
                                scope.data.push(omit);
                            }else {
                                scope.data.push(i + 1);
                            }
                        }
                    }else if(pageCount > 10){
                        for(; i <= 9; i++){
                            if(i <= 2){
                                scope.data.push(i);
                            }else if(i === 3 || i === 7){
                                scope.data.push(omit);
                            }else if(i > 3 && i < 7){
                                scope.data.push(i + 1);
                            }else {
                                scope.data.push(pageCount - 9 + i);
                            }
                        }
                    }
                }
            },
            template:
                '<div class="pager" ng-click="clickAction($event)" enter="enterAction(jumpPage)" ng-if="init.pageCount > 1">' +
                    '<p ng-class="{disabled: (currentPage == 1)}" data-tag="1">首页</p>' +
                    '<p ng-class="{disabled: (currentPage == 1)}" data-tag="prev">&lt;</p>' +
                    '<span ng-repeat="item in data track by $index" data-tag="{{item}}" ng-class="{current: (currentPage == item)}">{{item}}</span>' +
                    '<p ng-class="{disabled: (currentPage == init.pageCount)}" data-tag="next">&gt;</p>' +
                    '<p ng-class="{disabled: (currentPage == init.pageCount)}" data-tag="{{init.pageCount}}">尾页</p>' +
                    '<input type="text" ng-model="jumpPage">' +
                    '<p data-tag="{{jumpPage}}">跳转</p>' +
                '</div>'
        };
    })
    /**
     * [description]
     * arges: {
     *     reset: {Function} 不用传递此参数 直接调用即可
     *
     * }
     */
    .directive('slidingValid', ['$timeout', function($timeout){
        return {
            restrict: 'E',
            scope: {
                arges: '='
            },
            replace: true,
            link: function(scope, element, attrs){
                // 不知道为什么这个版本的 angular find 查不到，可能是没引用 jquery
                // var $slider = element.find('.sv-slider');
                var childs = element.find('*');
                console.log(childs);
                var sliderDom = childs[0];
                // var $boxUp = element.find('.sv-box-up');
                var boxUpDom = childs[5];
                // var $boxText = element.find('.sv-box-text');
                var boxTextDom = childs[6];
                var isSlider = false;
                var isVaild = false;
                var oX = 0;
                // var w = window.parseInt($boxText.css('width')) - 50;
                var w = boxTextDom.offsetWidth - 50;
                var body = document.body;

                scope.text = attrs.text || '请按住滑块，拖动到最右边';
                scope.textSuccess = attrs.textSuccess || '验证通过';

                sliderDom.addEventListener('mousedown', function(event){
                    isSlider = true;
                    oX = event.pageX;
                });
                sliderDom.addEventListener('mouseup', function(event){
                    isSlider && gradual(event.pageX, oX, 0.015);
                    isSlider = false;
                });

                // $slider.on('mousedown', function(event){
                //     isSlider = true;
                //     oX = event.pageX;
                // }).on('mouseup', function(event){
                //     isSlider && gradual(event.pageX, oX, 0.015);
                //     isSlider = false;
                // });


                if(scope.arges && !scope.arges.reset){
                    scope.arges.reset = function(){
                        isSlider = false;
                        isVaild = false;
                        moveSlider(0);
                        // $slider.removeClass('success');
                        sliderDom.className = sliderDom.className.replace('success', '');
                        // $boxText.html(scope.text);
                        boxTextDom.innerHTML = scope.text;
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
                            // $boxText.html(scope.textSuccess);
                            boxTextDom.innerHTML = scope.textSuccess;
                            // $slider.addClass('success');
                            sliderDom.className += ' success';
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
                        // $slider.css('left', w);
                        sliderDom.style.left = w + 'px';
                        // $boxUp.css('width', w);
                        boxUpDom.style.width = w + 'px';
                        isVaild = true;
                        return true;
                    }

                    if(!isVaild && x >= 0){
                        // $slider.css('left', x);
                        sliderDom.style.left = x + 'px';
                        // $boxUp.css('width', x);
                        boxUpDom.style.width = x + 'px';
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
