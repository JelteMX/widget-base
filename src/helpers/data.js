import Promise from 'dojo/promise/Promise';

export const getData = params => new Promise((resolve, reject) => {
    mx.data.get({
        params,
        callback: resolve,
        error: reject,
    });
});
