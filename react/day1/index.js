const h1= React.createElement('h1', null, 'Hello World');
// React.createElement('what you wanna create',{properties of element}, content of element);
const root = ReactDOM.createRoot(document.getElementById('root'));

react.createElement("div",{classmate:"div-2"},[React.createElement("span",{},"1"),React.createElement("span",{},"2")]);
root.render(h1);