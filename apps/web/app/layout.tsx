import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "WorkZeno | Milestone escrow for freelance work",
  description: "Testnet-ready milestone collaboration and Soroban escrow.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
