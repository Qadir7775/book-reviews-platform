import React from 'react'
import ReduxProvider from './ReduxProvider';
import { ToastProvider } from '../ui/ToastContext';
import GlobalToaster from '../ui/GlobalToaster';
import Navigation from '../modules/layout/Navigation';

const MainProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ReduxProvider>
            <ToastProvider>
                <Navigation />
                {children}
                <GlobalToaster />
            </ToastProvider>
        </ReduxProvider>
    )
}

export default MainProvider;
