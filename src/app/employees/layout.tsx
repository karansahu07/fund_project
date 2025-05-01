import "@/css/satoshi.css";
import "@/css/style.css";


import Sidebar from "@/components/Layouts/sidebar";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import { Header } from "@/components/Layouts/header";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s | NextAdmin - Next.js Dashboard Kit",
    default: "NextAdmin - Next.js Dashboard Kit",
  },
  description:
    "Next.js admin dashboard toolkit with 200+ templates, UI components, and integrations for fast dashboard development.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader color="#5750F1" showSpinner={false} />

          {/* <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                {children}
              </main> */}
          {/* <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden pt-4 pr-4 pl-4 md:pt-6 md:pr-6 md:pl-6 2xl:pt-10 2xl:pr-10 2xl:pl-10">
                {children}
              </main> */}

          {/* <main className="isolate mx-auto w-full max-w-screen-2xl p-4 md:p-6 2xl:p-10 overflow-y-auto h-screen">
                {children}
              </main> */}
          <main className="isolate mx-auto w-full max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
