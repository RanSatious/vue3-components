import ui from './ui';
import components from '../components';
import directives from '../directives';

export default app => {
    [ui, components, directives].forEach(plugin => {
        app.use(plugin);
    });
};
