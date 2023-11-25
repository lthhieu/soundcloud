'use client'
import { Scrollbars } from 'react-custom-scrollbars-2'
const ScrollbarProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>{typeof window !== 'undefined' &&
            <Scrollbars suppressHydrationWarning autoHide style={{ height: window.innerHeight }}>
                {children}
            </Scrollbars>
        }</>
    );
}
export default ScrollbarProvider
