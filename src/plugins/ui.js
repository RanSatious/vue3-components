import { Button, Form, Modal, Input, Layout, Radio, Spin } from 'ant-design-vue';
import '../assets/css/page.less';

export default app => {
    app.use(Button);
    app.use(Form);
    app.use(Input);
    app.use(Modal);
    app.use(Layout);
    app.use(Radio);
    app.use(Spin);
};
