import {
    defineWidget,
    log,
    runCallback,
} from 'widget-base-helpers';

export default defineWidget('Widget', false, {

    _obj: null,

    constructor() {
        this.log = log.bind(this);
        this.runCallback = runCallback.bind(this);
    },

    postCreate() {
        log.call(this, 'postCreate', this._WIDGET_VERSION);
    },
});
