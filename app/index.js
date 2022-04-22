import document from 'document'
import './widgets/my-widget-type'

const myWidgetInstance2 = document.getElementById('my-widget-instance-2');
myWidgetInstance2.text = 'Software';
myWidgetInstance2.main.style.fill = 'green';
const bbox = myWidgetInstance2.main.getBBox();
myWidgetInstance2.shadow.style.fill = 'blue';

// TODO 3.5 create host project and widget project
// TODO 3.4 remove all but minimal code from host project js and .view and .css