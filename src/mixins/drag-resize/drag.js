import { getBaseProps } from './prop';
import { reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import { useElement } from './element';

export const getDragProps = () => ({
    ...getBaseProps(),
    // 移动单位
    step: {
        type: Number,
        default: 1,
    },
    // 自动吸附容器边界
    // 只在 overflow = false 时生效
    gap: {
        type: Number,
        default: 10,
    },
    // 是否可以溢出容器
    overflow: {
        type: Boolean,
        default: false,
    },
    group: {
        type: String,
        default: '',
    },
});

export const useDrag = (props, context, { self }) => {
    const { element } = useElement(props, context);

    const data = reactive({
        dragging: false,
        start: {
            x: 0,
            y: 0,
        },
        offset: {
            x: 0,
            y: 0,
        },
        // 是否取消 mouseup 事件
        cancel: false,
    });

    const id = computed(() => {
        return `${props.group || 'default'}-${Date.now()}`;
    });

    const position = computed(() => {
        let pos = {
            top: props.top + data.offset.y,
            left: props.left + data.offset.x,
        };

        if (props.overflow) {
            return pos;
        }

        let parent;
        if (self.value && (parent = self.value.parentElement) && parent.offsetWidth && parent.offsetHeight) {
            if (pos.top > parent.offsetHeight - self.value.offsetHeight - props.gap) {
                pos.top = parent.offsetHeight - self.value.offsetHeight;
            }
            if (pos.left > parent.offsetWidth - self.value.offsetWidth - props.gap) {
                pos.left = parent.offsetWidth - self.value.offsetWidth;
            }
        }

        if (pos.top < props.gap) {
            pos.top = 0;
        }
        if (pos.left < props.gap) {
            pos.left = 0;
        }

        return pos;
    });

    const dragStyle = computed(() => {
        return {
            top: `${position.value.top}px`,
            left: `${position.value.left}px`,
        };
    });

    const onStart = e => {
        if (element.action) {
            return;
        }
        if (e.button !== 0) {
            return;
        }
        data.dragging = true;
        data.start = {
            x: e.clientX,
            y: e.clientY,
        };
        e.stopPropagation();
        element.action = 'drag';
    };
    const onEnd = e => {
        if (e.button === 0 || e.type === 'blur') {
            data.dragging = false;
            context.emit('update:top', position.value.top);
            context.emit('update:left', position.value.left);
            data.offset.x = 0;
            data.offset.y = 0;
            element.action = '';
        }
    };
    const onMove = e => {
        if (!data.dragging) {
            return;
        }
        let step = Math.max(1, props.step);
        let offsetX = (e.clientX - data.start.x) / step;
        let offsetY = (e.clientY - data.start.y) / step;
        data.offset.x = (offsetX > 0 ? Math.floor(offsetX) : Math.ceil(offsetX)) * step;
        data.offset.y = (offsetY > 0 ? Math.floor(offsetY) : Math.ceil(offsetY)) * step;
        data.cancel = true;
        e.stopPropagation();
    };
    const onClick = e => {
        if (e.button === 0 && data.cancel) {
            e.stopPropagation();
            data.cancel = false;
        }
    };

    onMounted(() => {
        self.value.addEventListener('mousedown', onStart);
        window.addEventListener('mouseup', onEnd);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('blur', onEnd);
        window.addEventListener('click', onClick, true);
    });

    onBeforeUnmount(() => {
        self.value.removeEventListener('mousedown', onStart);
        window.removeEventListener('mouseup', onEnd);
        window.addEventListener('mousemove', onMove);
        window.removeEventListener('blur', onEnd);
        window.removeEventListener('click', onClick);
    });

    return {
        dragStyle,
    };
};
