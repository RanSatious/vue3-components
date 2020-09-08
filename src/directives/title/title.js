import Component from './Index.vue';
import Vue from 'vue';
import debounce from 'lodash/debounce';
import isObject from 'lodash/isObject';
import isNil from 'lodash/isNil';

const TitleComponent = Vue.extend(Component);
const MODES = ['always', 'overflow'];
const POSITIONS = ['top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'mouse'];
const EFFECTS = ['dark', 'light'];

function Title(container) {
    let instance;
    let data = Vue.observable({
        timer: {
            show: null,
            hide: null,
        },
        text: '',
        // 展示延迟
        delay: 0,
        mode: 'always',
        position: 'bottom',
        mouse: {
            x: 0,
            y: 0,
        },
        // position为mouse时，title位置的更新延迟
        updateDelay: 400,
        // 鼠标是否处于title内部
        inside: false,
        gap: 10,
        // 主题
        effect: 'dark',
    });

    const updateMousePos = debounce(e => {
        if (!data.inside) {
            data.mouse = {
                x: e.clientX,
                y: e.clientY,
            };
        }
    }, data.updateDelay);

    function onOver(e) {
        clearTimeout(data.timer.hide);

        mount();
        updateMousePos(e);
    }

    function onLeave() {
        clearTimeout(data.timer.show);
        data.timer.show = null;
        data.timer.hide = setTimeout(destroyInstance, 100);
    }

    function destroyInstance() {
        if (instance) {
            instance.show = false;
            setTimeout(() => {
                instance.$off('leave', onLeave);
                instance.$destroy();
                instance.$el.remove();
                instance = null;
            }, 0);
        }
    }

    function onDown() {
        if (instance) {
            instance.show = false;
        }
    }

    function mount() {
        if (instance || data.timer.show) {
            return;
        }
        data.timer.show = setTimeout(() => {
            instance = new TitleComponent({
                data,
            });
            instance.$container = container;
            instance.$on('leave', onLeave);
            instance.$mount();
            document.body.appendChild(instance.$el);
        }, data.delay);
    }

    return {
        init(value) {
            this.setOption(value);
            container.addEventListener('mousemove', onOver);
            container.addEventListener('mousedown', onDown);
            container.addEventListener('mouseleave', onLeave);
        },
        destroy() {
            container.removeEventListener('mousemove', onOver);
            container.removeEventListener('mousedown', onDown);
            container.removeEventListener('mouseleave', onLeave);
            destroyInstance();
        },
        setOption(value) {
            if (!value) {
                data.text = '';
            } else if (isObject(value)) {
                let { text, mode, position, delay, gap, effect } = value;
                if (!isNil(text)) {
                    data.text = text.toString();
                }

                if (MODES.includes(mode)) {
                    data.mode = mode;
                }

                if (!isNil(delay) && !isNaN(delay)) {
                    data.delay = Number(delay);
                }

                if (!isNil(gap) && !isNaN(gap)) {
                    data.gap = Number(gap);
                }

                if (POSITIONS.includes(position)) {
                    data.position = position;
                    if (position === 'mouse') {
                        data.delay = Math.max(500, data.delay);
                    }
                }
                if (EFFECTS.includes(effect)) {
                    data.effect = effect;
                }
            } else {
                data.text = value.toString();
            }
        },
    };
}

const directive = {
    bind(el, { value }) {
        let title = Title(el);
        title.init(value);

        el.vTitle = title;
    },
    componentUpdated(el, { value }) {
        el.vTitle.setOption(value);
    },
    unbind(el) {
        el.vTitle.destroy();
        delete el.vTitle;
    },
};

export default {
    // 文字提示
    name: 'title',
    directive,
    install(Vue) {
        Vue.directive('title', directive);
    },
};
