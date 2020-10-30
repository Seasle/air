import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@material-ui/core';
import { store, persistor } from './redux/store';
import theme from './theme';
import 'fontsource-roboto/cyrillic-ext.css';
import './index.css';
import App from './App';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </ThemeProvider>,
    document.getElementById('root')
);
