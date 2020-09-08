import loading from './loading';

export default app => {
    [loading].forEach(item => {
        app.use(item);
    });
};
