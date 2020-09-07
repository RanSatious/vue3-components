import IconFont from './icon-font';

export default app => {
    [IconFont].forEach(component => {
        app.use(component);
    });
};
