'use client'
import { useHasMounted } from '@/utils/customHook';
import { Scrollbars } from 'react-custom-scrollbars-2'
const ScrollbarProvider = ({ children }: { children: React.ReactNode }) => {
    const hasMounted = useHasMounted()
    if (!hasMounted) {
        return (<></>)
    }
    return (
        <Scrollbars autoHide style={{ height: window.innerHeight }}>
            {children}
        </Scrollbars>
    );
}
export default ScrollbarProvider
