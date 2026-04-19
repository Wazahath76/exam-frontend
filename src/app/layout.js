import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Exam Hub",
  description: "Find best exams",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}