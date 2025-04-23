'use client';
import TranslatorWrapper from "@/modules/common/components/TranslatorWrapper";

interface ClientOnlyLayoutProps {
    children: React.ReactNode;
}

const ClientOnlyLayout: React.FC<ClientOnlyLayoutProps> = ({ children }) => {
    return (
        <>
            <TranslatorWrapper />
            {children}
        </>
    );
};

export default ClientOnlyLayout;
