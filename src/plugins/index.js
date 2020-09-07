import ui from './ui';
import component from '../components';

export default app => {
    [ui, component].forEach(plugin => {
        app.use(plugin);
    });
};
