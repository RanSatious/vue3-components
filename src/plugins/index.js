import ui from './ui';

export default app => {
    [ui].forEach(plugin => {
        app.use(plugin);
    });
};
