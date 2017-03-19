import Vue from './Vue';
let demo = new Vue({
    data: {
        'a': {
            'ab': {
                'c': 'C'
            }
        },
        'b': [
            {'bb': 'BB'},
            {'bbb': 'BBB'}
        ],
        'c': 'C'
    }
});
demo.$watch('c', () => console.log('c is changed'));
// get value
demo.$watch('a.ab', () => console.log('a.ab is changed'));
demo.$watch('b', () => console.log('b is changed'));
// get value
demo.c = 'CCC';
// new value setted
// get value
// c is changed
demo.a.ab = 'AB';
// get value
// new value setted
demo.b.push({'bbbb': 'BBBB'});
// get value
