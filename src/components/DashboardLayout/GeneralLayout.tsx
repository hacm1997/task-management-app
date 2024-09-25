import { Toaster } from "sonner"
import { Navbar } from "./Navbar"

export const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={{ backgroundColor: '#f7f9fd', minHeight: '100vh' }}>
            <Navbar />
            <main>
                {children}
            </main>
            <Toaster richColors position="bottom-right" />
            {/* <Footer/> */}
        </div>
    )
}
