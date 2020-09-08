import debounce from 'lodash/debounce';
import isNil from 'lodash/isNil';
import { reactive, watch, nextTick, createApp, h, Transition } from 'vue';
import Component from './Index.vue';
import './index.less';

const MODES = ['always', 'overflow'];
const POSITIONS = ['top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'mouse'];
const EFFECTS = ['dark', 'light'];

const defaultOption = {
    text: '',
    delay: 0,
    mode: 'always',
    position: 'bottom',
    updateDelay: 400,
    gap: 10,
    effect: 'dark',
};
const normalizeOption = value => {
    if (isNil(value)) {
        return {
            ...defaultOption,
            text: '',
        };
    }

    if (value && typeof value === 'object') {
        let data = {};
        let { text, mode, position, effect } = value;

        if (!isNil(text)) {
            data.text = String(text);
        }

        const normalizeNumber = (key, value, option) => {
            if (!isNil(value) && !isNaN(value)) {
                option[key] = Math.max(0, Number(value));
            }
        };

        ['delay', 'updateDelay', 'gap'].forEach(key => {
            normalizeNumber(key, value[key], data);
        });

        if (MODES.includes(mode)) {
            data.mode = mode;
        }

        if (POSITIONS.includes(position)) {
            data.position = position;
        }

        if (EFFECTS.includes(effect)) {
            data.effect = effect;
        }

        return {
            ...defaultOption,
            ...data,
        };
    }

    return {
        ...defaultOption,
        text: String(value),
    };
};

function Title(container, options) {
    let instance;
    let host = document.createElement('div');
    host.className = 'segma-title-wrapper';

    let props = reactive(options);
    let data = reactive({
        timer: {
            show: null,
            hide: null,
        },
        mouse: {
            x: 0,
            y: 0,
        },
        inside: false,
        show: false,
    });

    watch(
        () => data.show,
        async val => {
            await nextTick();
            console.log(data.show);

            if (val) {
                document.body.appendChild(host);
            } else {
                if (instance) {
                    instance.unmount();
                    instance = null;
                }
                host.remove();
            }
        },
        {
            immediate: true,
        }
    );

    const updateMousePos = debounce(e => {
        if (!data.inside) {
            data.mouse = {
                x: e.clientX,
                y: e.clientY,
            };
        }
    }, props.updateDelay);

    function onOver(e) {
        clearTimeout(data.timer.hide);

        mount();
        updateMousePos(e);
    }

    function onLeave() {
        clearTimeout(data.timer.show);
        data.timer.show = null;
        data.timer.hide = setTimeout(() => {
            data.show = false;
        }, 100);
    }

    function onDown() {
        data.show = false;
    }

    function mount() {
        if (instance || data.timer.show) {
            return;
        }
        data.timer.show = setTimeout(() => {
            instance = createApp({
                setup() {
                    return () => h(Component, props);
                },
            });
            instance.provide('data', data);
            instance.provide('container', container);
            instance.provide('host', host);
            instance.provide('leave', onLeave);
            instance.mount(host);
        }, data.delay);
    }

    container.addEventListener('mousemove', onOver);
    container.addEventListener('mousedown', onDown);
    container.addEventListener('mouseleave', onLeave);
    // mount();

    return {
        props,
        data,
    };
}

export default app => {
    app.directive('title', {
        mounted(el, { value }) {
            el.vTitle = Title(el, normalizeOption(value));
        },
        updated(el, { value }) {
            const options = normalizeOption(value);
            Object.keys(options).forEach(key => {
                el.vTitle.props[key] = options[key];
            });
        },
    });
};
