import { getRectProps } from './prop';
import { useElement } from './element';
import { reactive, computed, toRefs, onMounted, onBeforeUnmount } from 'vue';

export const getResizeProps = () => ({
    ...getRectProps(),
    // x/y/all
    mode: {
        type: String,
        default: 'all',
    },
    border: {
        type: Number,
        default: 10,
    },
});

export const useResize = (props, context, { self, element = useElement(props, context) }) => {
    const data = reactive({
        cursor: [],
        resizing: false,
        start: {
            x: 0,
            y: 0,
        },
        offset: {
            x: 0,
            y: 0,
        },
    });

    const rect = computed(() => {
        let rect = {
            top: props.top,
            left: props.left,
            width: props.width,
            height: props.height,
        };
        const { offset, cursor } = toRefs(data);

        if (cursor.value.includes('n')) {
            rect.top += offset.value.y;
            rect.top = Math.min(rect.top, props.top + props.height);
            rect.height -= offset.value.y;
        }
        if (cursor.value.includes('s')) {
            rect.height += offset.value.y;
        }
        if (cursor.value.includes('w')) {
            rect.left += offset.value.x;
            rect.left = Math.min(rect.left, props.left + props.width);
            rect.width -= offset.value.x;
        }
        if (cursor.value.includes('e')) {
            rect.width += offset.value.x;
        }

        rect.width = Math.max(0, rect.width);
        rect.height = Math.max(0, rect.height);

        return rect;
    });
    const resizeStyle = computed(() => {
        return {
            cursor: cursorStyle.value,
            top: `${rect.value.top}px`,
            left: `${rect.value.left}px`,
            width: `${rect.value.width}px`,
            height: `${rect.value.height}px`,
            'box-sizing': 'border-box',
        };
    });
    const cursorStyle = computed(() => {
        const { cursor } = toRefs(data);
        return cursor.value.length > 0 ? `${cursor.value.join('')}-resize` : '';
    });

    const onMove = e => {
        if (data.resizing) {
            return;
        }
        if (element.action) {
            return;
        }

        const { clientX, clientY } = e;
        const rect = self.value.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        const offsetY = clientY - rect.top;
        let cursor = [];
        if (offsetY <= props.border) {
            cursor.push('n');
        }
        if (offsetY + props.border >= props.height) {
            cursor.push('s');
        }
        if (offsetX + props.border >= props.width) {
            cursor.push('e');
        }
        if (offsetX <= props.border) {
            cursor.push('w');
        }

        if (props.mode === 'x') {
            cursor = cursor.filter(d => ['w', 'e'].includes(d));
        }
        if (props.mode === 'y') {
            cursor = cursor.filter(d => ['n', 's'].includes(d));
        }

        // 使子元素不能成为鼠标事件的target
        self.value.children.forEach(el => {
            el.style['pointer-events'] = cursor.length > 0 ? 'none' : 'auto';
        });

        data.cursor = cursor;
    };
    const onResize = e => {
        if (!data.resizing) {
            return;
        }
        data.offset = {
            x: e.clientX - data.start.x,
            y: e.clientY - data.start.y,
        };
        document.body.style.cursor = cursorStyle.value;
    };
    const onStart = e => {
        if (element.action) {
            return;
        }
        if (e.button !== 0) {
            return;
        }
        if (!data.cursor.length) {
            return;
        }
        data.resizing = true;
        data.start = {
            x: e.clientX,
            y: e.clientY,
        };
        element.action = 'resize';
        e.stopPropagation();
    };
    const onEnd = e => {
        if (e.button === 0 || e.type === 'blur') {
            data.resizing = false;
            context.emit('update:top', rect.value.top);
            context.emit('update:left', rect.value.left);
            context.emit('update:width', rect.value.width);
            context.emit('update:height', rect.value.height);
            data.offset = {
                x: 0,
                y: 0,
            };
            document.body.style.cursor = '';
            element.action = '';
        }
    };

    onMounted(() => {
        self.value.addEventListener('mousedown', onStart);
        self.value.addEventListener('mousemove', onMove);
        window.addEventListener('mousemove', onResize);
        window.addEventListener('mouseup', onEnd);
        window.addEventListener('blur', onEnd);
    });
    onBeforeUnmount(() => {
        self.value.removeEventListener('mousedown', onStart);
        self.value.removeEventListener('mousemove', onMove);
        window.removeEventListener('mousemove', onResize);
        window.removeEventListener('mouseup', onEnd);
        window.removeEventListener('blur', onEnd);
    });

    return {
        resizeStyle,
    };
};
