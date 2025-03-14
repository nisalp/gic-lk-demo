import React from "react";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

export const metadata = {
  description: "A blank template using Payload in a Next.js app.",
  title: "Sri Lankan Government Information Center",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <body>
        <header className="bg-primary center-children-horizontally sticky top-0">
          <div className="container py-2 flex flex-row justify-between items-center">
            <div>
              <h5 className="mb-0 pb-0 text-white">
                Call{" "}
                <a href="tel:1919" className="text-secondary font-bold">
                  1919
                </a>{" "}
                for further assistance
              </h5>
            </div>
            <select className="px-2 py-1 text-lg rounded-sm input bg-white outline">
              <option>English</option>
              <option>සිංහල</option>
              <option>தமிழ்</option>
            </select>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-graybase text-white h-[100px]"></footer>
        <Analytics />
      </body>
    </html>
  );
}
