export default function PanelLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
    //  layout dla całego panelu
   <>
   {children}
   </>
  )}