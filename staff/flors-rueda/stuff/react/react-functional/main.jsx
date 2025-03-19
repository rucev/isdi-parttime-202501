const reactElement = React.createElement;
if (!localStorage.record) localStorage.record = JSON.stringify([])

const mainContainer = document.getElementById('app');
const root = ReactDOM.createRoot(mainContainer);

root.render(reactElement(App));