import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";


export const metadata = {
  title: "SchoolOS",
  description: "The Cognitive Operating System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
            {children}
        </MantineProvider>
      </body>
    </html>
  );
}