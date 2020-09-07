import ProgressBar from './Index.vue';

ProgressBar.install = app => {
    app.component(ProgressBar.name, ProgressBar);
};

export default ProgressBar;
