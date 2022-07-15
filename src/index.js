import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
// const Test = () => {
//     const [state, setState] = useState(true);
//     useEffect(() => {
//         setInterval(() => setState(x => !x), 5000);
//     }, []);
//     return state ? <App/> : null;
// }
root.render(
    <App/>
    // <Test/>
);
