angular.module('config')
    .constant('Mapping', {
        gender: {
            1: {
                en: 'Man',
                zh: '男',
                key: 'man'
            },
            2: {
                en: 'Woman',
                zh: '女',
                key: 'woman'
            },
            3: {
                en: 'Man',
                zh: '男1',
                key: 'man1'
            },
            4: {
                en: 'Woman',
                zh: '女1',
                key: 'woman1'
            }
        },
        init: function(){
            var that = this;
            Object.keys(that).forEach(function(k, i){
                var tempV = that[k];
                if(typeof tempV === 'object'){
                    that[k] = [];
                    if(tempV['0'] === undefined){
                        that[k]['0'] = {
                            en: '---',
                            zh: '---',
                            value: '0'
                        };
                    }
                    Object.keys(tempV).forEach(function(k1, i1){
                        tempV[k1].value = k1;
                        that[k][k1] = tempV[k1];
                        tempV[k1].key && (that[k][tempV[k1].key] = tempV[k1]);
                    });
                }
            });
            delete that.init;
            return that;
        }
    }.init());
