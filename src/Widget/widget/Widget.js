import declare from 'dojoBaseDeclare';
import widgetBase from 'widgetBase';

import { log } from '@/helpers';
const { packageName, version, widgetFolder } = config;

export default declare(`${packageName}.${widgetFolder}.Widget`, [widgetBase], {

    _WIDGET_VERSION: version,
    _obj: null,

    postCreate() {
        log.call(this, 'postCreate', this._WIDGET_VERSION);
    },
});
