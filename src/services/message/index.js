import { reactive, createApp, h } from 'vue';
import Component from './Index.vue';
import { Button, Modal } from 'ant-design-vue';

function Message(options) {
    let { onClose, onOpen, ...rest } = options;
    const data = reactive(rest);
    return new Promise((resolve, reject) => {
        const host = document.createElement('div');
        host.className = 'segma-message-wrapper';

        const instance = createApp({
            setup() {
                return () =>
                    h(Component, {
                        onOpen: () => {
                            onOpen && onOpen();
                        },
                        onClose: confirm => {
                            onClose && onClose(confirm);
                            if (confirm) {
                                resolve();
                            } else {
                                // eslint-disable-next-line prefer-promise-reject-errors
                                reject('cancel');
                            }
                            instance.unmount();
                            host.remove();
                        },
                    });
            },
        });
        instance.use(Button);
        instance.use(Modal);
        instance.provide('data', data);
        instance.mount(host);
        data.visible = true;

        document.body.appendChild(host);
    });
}

function normalizeArgs(args) {
    let [message = '', title = '', options = {}] = args;
    if (message && typeof message === 'object') {
        return message;
    }

    if (title && typeof title === 'object') {
        title.message = message;
        return title;
    }

    if (message) {
        options.message = message;
    }
    if (title) {
        options.title = title;
    }

    return options;
}

const getDefaultOption = type => {
    let base = {
        visible: false,
        width: 300,
        message: '',
        confirm: false,
        className: '',
        loading: false,
        callback: {},
    };
    if (type === 'alert') {
        return {
            ...base,
            title: '提示',
            buttons: [
                {
                    type: 'primary',
                    text: '确定',
                    action: 'confirm',
                },
            ],
            align: 'center',
        };
    }
    if (type === 'confirm') {
        return {
            ...base,
            title: '确认',
            buttons: [
                {
                    type: 'info',
                    text: '取消',
                    action: 'cancel',
                },
                {
                    type: 'primary',
                    text: '确定',
                    action: 'confirm',
                },
            ],
            align: 'right',
        };
    }
};

// 基于 el-dialog 的消息对话框服务
export default {
    /**
     * 警告对话框
     * @param {string} message 消息
     * @param {string} title 标题
     * @param {IMessageOption} options 其他参数
     * @returns {Promise}
     */
    alert(...args) {
        return Message({
            ...getDefaultOption('alert'),
            ...normalizeArgs(args),
        });
    },
    /**
     * 确认对话框
     * @param {string} message 消息
     * @param {string} title 标题
     * @param {IMessageOption} options 其他参数
     * @returns {Promise}
     */
    confirm(...args) {
        return Message({
            ...getDefaultOption('confirm'),
            ...normalizeArgs(args),
        });
    },
};
