export const getBaseProps = () => ({
    top: {
        type: Number,
        default: 0,
    },
    left: {
        type: Number,
        default: 0,
    },
});

export const getRectProps = () => ({
    ...getBaseProps(),
    width: {
        type: Number,
        default: 200,
    },
    height: {
        type: Number,
        default: 200,
    },
});
