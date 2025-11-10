// setup base layout here 
// this is layout.tsx in /home, childer layout of home page 
import type { ReactNode } from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div >
      {children}
    </div>
  );
}