<template>
    <div class="progress-bar-wrapper"
         :class="{ 'show-text': showText }">
        <div class="progress-bar"
             :style="style"
             :title="percentText">
            <div :class="['progress', animation ? 'animation running' : status]"
                 :style="progressStyle"></div>
        </div>
        <div v-if="showText"
             class="progress-text">
            <!-- 自定义进度文本 -->
            <slot>
                {{percentText}}
            </slot>
        </div>
    </div>
</template>
<script>
import { computed } from 'vue';
export default {
    // 进度条组件
    // 基于el-progress-bar
    name: 'SeProgressBar',
    props: {
        // 百分比
        percent: {
            type: Number,
            default: 0,
        },
        // 起始位置偏移
        offset: {
            type: Number,
            default: 0,
        },
        // 进度条状态
        // normal/success/error/running
        status: {
            type: String,
            default: 'normal',
        },
        // 进度条宽度
        strokeHeight: {
            type: Number,
            default: 6,
        },
        // 是否开启动画
        // 开启动画时，status固定为running
        animation: {
            type: Boolean,
            default: false,
        },
        // 是否显示文本
        showText: {
            type: Boolean,
            default: true,
        },
    },
    setup(props, context) {
        const style = computed(() => {
            return {
                width: props.showText ? 'calc(100% - 40px)' : '100%',
                height: `${props.strokeHeight}px`,
            };
        });
        const percentText = computed(() => {
            return `${Math.max(0, Math.min(100, props.percent)) || 0}%`;
        });
        const progressStyle = computed(() => {
            if (props.animation) return {};
            return {
                left: `${props.offset}%`,
                width: `${props.percent}%`,
            };
        });

        return {
            style,
            percentText,
            progressStyle,
        };
    },
};
</script>
<style lang="less" scoped>
// 颜色--状态
@success-color: #1ea660;
@failed-color: #df3a25;
@run-color: #fba13b; //运行中
@normal-color: #3a70df;
@waiting-color: #a6a6a6; // 未开始

.progress-bar-wrapper {
    font-size: 0;

    &.show-text {
        line-height: 14px;
    }
}

.progress-bar {
    display: inline-block;
    overflow: hidden;
    position: relative;
    border-radius: 100px;
    vertical-align: middle;
    background-color: #eeeeee;

    .progress {
        position: absolute;
        top: 0;
        border-radius: 100px;
        height: 100%;
        transition: all 0.3s ease;

        &.normal {
            background: @normal-color;
        }

        &.success {
            background: @success-color;
        }

        &.error {
            background: @failed-color;
        }

        &.running {
            background: @run-color;
        }

        &.waiting {
            background: @waiting-color;
        }

        &.animation {
            width: 50%;
            animation: running 1s linear infinite;
        }

        @keyframes running {
            0% {
                left: -50%;
            }

            100% {
                left: 150%;
            }
        }
    }
}

.progress-text {
    display: inline-block;
    font-size: 14px;
    vertical-align: middle;
    text-align: center;
    width: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>