import { createApp, h, reactive, watch, nextTick } from 'vue';
import { Spin } from 'ant-design-vue';
import isNil from 'lodash/isNil';
import './index.less';

const SIZES = ['small', 'default', 'large'];

const defaultOption = {
    loading: false,
    size: 'large',
    tip: '',
    delay: 0,
};

const normalizeOption = option => {
    if (isNil(option)) {
        return {
            ...defaultOption,
            loading: true,
        };
    }

    if (typeof option === 'boolean') {
        return {
            ...defaultOption,
            loading: option,
        };
    }

    if (option && typeof option === 'object') {
        let data = {};
        let { loading, tip, size, delay } = option;

        data.loading = !!loading;

        if (!isNil(tip)) {
            data.tip = String(tip);
        }

        if (SIZES.includes(size)) {
            data.size = size;
        }

        if (!isNil(delay) && !isNaN(delay)) {
            data.delay = Math.max(0, Number(delay));
        }

        return {
            ...defaultOption,
            ...data,
        };
    }

    return defaultOption;
};

export default app => {
    app.directive('segma-loading', {
        mounted(el, { value }) {
            const data = reactive(normalizeOption(value));

            let positonChanged = false;
            watch(
                () => data.loading,
                async val => {
                    await nextTick();
                    if (val) {
                        let { position } = getComputedStyle(el);
                        if (position === 'static') {
                            el.style.position = 'relative';
                            positonChanged = true;
                        }
                        el.appendChild(container);
                    } else {
                        if (positonChanged) {
                            el.style.position = '';
                        }
                        container.remove();
                    }
                },
                {
                    immediate: true,
                }
            );

            let container = document.createElement('div');
            container.className = 'segma-loading-wrapper';

            createApp({
                setup() {
                    return () =>
                        h(Spin, {
                            spinning: data.loading,
                            tip: data.tip,
                            size: data.size,
                            delay: data.delay,
                        });
                },
            }).mount(container);
            el.vLoading = data;
        },
        updated(el, { value }) {
            let { loading, tip, size, delay } = normalizeOption(value);
            el.vLoading.loading = loading;
            el.vLoading.tip = tip;
            el.vLoading.size = size;
            el.vLoading.delay = delay;
        },
    });
};
