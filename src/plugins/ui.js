import { Button, Modal, Layout } from 'ant-design-vue';
import '../assets/css/page.less';

export default app => {
    app.use(Button);
    app.use(Modal);
    app.use(Layout);
};
