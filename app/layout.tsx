import type { Metadata } from "next";
import "./globals.css";
import AppQuery from "./frontend/src/providers/AppQuery";
import AppContextUser from "./frontend/src/providers/AppContextUser";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "dotenv/config";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
          <AppContextUser>
            <AppQuery>{children}</AppQuery>
          </AppContextUser>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
