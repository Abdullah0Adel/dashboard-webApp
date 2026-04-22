import Providers from "../components/providers";

// app/[locale]/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
    <body>
 
    <Providers>
      {children}
    </Providers>
    
    </body>
    </html>
  );
}