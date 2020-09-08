<template>
    <transition name="fade">
        <div v-if="data.show"
             class="se-title"
             :class="effect"
             @click.stop
             @mousedown.stop
             @dragstart.stop
             @mousemove.stop="onOver"
             @mouseleave="onLeave">
            {{text}}
            <div class="caret"
                 :class="position"></div>
        </div>
    </transition>
</template>
<script>
import { computed, inject, nextTick, onMounted, ref, watch } from 'vue';
import Placer from './placer';

export default {
    // 文字提示
    name: 'TitleDirective',
    props: {
        text: {
            type: String,
            default: '',
        },
        // 展示延迟
        delay: {
            type: Number,
            default: 0,
        },
        mode: {
            type: String,
            default: 'always',
        },
        position: {
            type: String,
            default: 'bottom',
        },
        // position为mouse时，title位置的更新延迟
        updateDelay: {
            type: Number,
            default: 400,
        },
        gap: {
            type: Number,
            default: 10,
        },
        // 主题
        effect: {
            type: String,
            default: 'dark',
        },
    },
    setup(props, context) {
        const container = inject('container');
        const host = inject('host');
        const data = inject('data');
        const leave = inject('leave');

        const top = ref(0);
        const left = ref(0);
        const placer = new Placer(props.gap);

        const check = async () => {
            await nextTick();

            let isOverflow = container.scrollWidth > container.offsetWidth || container.scrollHeight > container.offsetHeight;
            data.show = props.text && (props.mode === 'always' || isOverflow);

            setTimeout(() => {
                if (data.show) {
                    let rect = container.getBoundingClientRect();

                    if (props.position === 'mouse') {
                        top.value = data.mouse.y + props.gap.value;
                        left.value = data.mouse.x + props.gap.value;
                    } else {
                        let pos = placer[props.position](rect, host);
                        top.value = pos.top;
                        left.value = pos.left;
                    }
                }
            }, 0);
        };

        watch(() => props.text, check);
        watch(
            () => props.gap,
            val => {
                placer.gap = val;
            }
        );
        watch(
            () => [top.value, left.value],
            ([top, left]) => {
                host.style.top = `${top}px`;
                host.style.left = `${left}px`;
            },
            {
                deep: true,
            }
        );
        // mouse

        const onOver = () => {
            clearTimeout(data.timer.hide);
            data.inside = true;
        };
        const onLeave = () => {
            leave();
            data.inside = false;
        };

        onMounted(check);

        return {
            top,
            left,
            placer,
            onOver,
            onLeave,
            data,
        };
    },
};
</script>
<style lang="less"
       scoped>
.se-title {
    box-sizing: border-box;
    border-radius: 4px;
    padding: 8px;
    font-size: 14px;
    line-height: 14px;
    white-space: nowrap;
    color: white;
    background-color: rgba(0, 0, 0, 0.75);
    box-shadow: 0 4px 12px rgba(82, 92, 108, 0.16);
    cursor: text;
    user-select: text;

    .caret-style(@color : rgba(0, 0, 0, 0.75)) {
        .caret[class*='top'] {
            border-top-color: @color;
        }

        .caret[class*='right'] {
            border-right-color: @color;
        }

        .caret[class*='bottom'] {
            border-bottom-color: @color;
        }

        .caret[class*='left'] {
            border-left-color: @color;
        }
    }

    &.light {
        color: rgba(93, 100, 112, 1);
        background: rgba(255, 255, 255, 1);
        .caret-style(rgba(255, 255, 255, 1));
    }

    .caret {
        position: absolute;
        border: 5px solid transparent;
        width: 0;
        height: 0;

        &.mouse {
            display: none;
        }

        &.top {
            bottom: -10px;
            left: 50%;
            margin-left: -5px;
        }

        &.top-start {
            bottom: -10px;
            left: 10px;
        }

        &.top-end {
            right: 10px;
            bottom: -10px;
        }

        &.right {
            top: 50%;
            left: -10px;
            margin-top: -5px;
        }

        &.right-start {
            top: 10px;
            left: -10px;
        }

        &.right-end {
            bottom: 10px;
            left: -10px;
        }

        &.bottom {
            top: -10px;
            left: 50%;
            margin-left: -5px;
        }

        &.bottom-start {
            top: -10px;
            left: 10px;
        }

        &.bottom-end {
            top: -10px;
            right: 10px;
        }

        &.left {
            top: 50%;
            right: -10px;
            margin-top: -5px;
        }

        &.left-start {
            top: 10px;
            right: -10px;
        }

        &.left-end {
            right: -10px;
            bottom: 10px;
        }
    }

    .caret-style();
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
