import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from "./provider/AuthProvider";
import reportWebVitals from "./reportWebVitals";
// import UserStore from "./store/UserStore";
// import DeviceStore from "./store/DeviceStore";

// export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <Context.Provider value={{
//         user: new UserStore(),
//         device: new DeviceStore()
//     }}>
//     <App />
//      </Context.Provider>
// );
root.render(
    // <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    // </React.StrictMode>,
);

reportWebVitals();