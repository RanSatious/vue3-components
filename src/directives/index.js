import loading from './loading';
import title from './title';

export default app => {
    [loading, title].forEach(item => {
        app.use(item);
    });
};
