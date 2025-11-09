// app/layout.tsx
import "../globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
   // Global navbar
import Footer from "@/components/Footer";    // Global footer
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Inspired Vision Academy",
  description: "Luxury e-commerce platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
  
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar/>
          {children}
          <Footer />
        </ThemeProvider>
 
  );
}





