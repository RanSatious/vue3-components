import IconFont from './icon-font';
import ProgressBar from './progress-bar';

export default app => {
    [IconFont, ProgressBar].forEach(component => {
        app.use(component);
    });
};
