import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

const imageUrl = '/images/unnamed.png';

export const metadata = {
  title: {
    default: 'Adi-gitx.ai| Transform Your Ideas into Action',
    template: '%s | Adi-gitX.ai'
  },
  description: 'Transform Your Ideas Into Connect With People, Make Things Happen! anonymous.dev',
  keywords: 'prompt generation, AI, software development, digital innovation',
  openGraph: {
    title: 'Adi-gitX.ai | Transform Your Ideas into Action',
    description: 'Transform Your Ideas Into Connect With People, Make Things Happen! anonymous.dev',
    url: 'https://adigitx-ai-tlpy.vercel.app/',  
    type: 'website',
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: 'Adi-gitX.ai - Transform Your Ideas into Action'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adi-gitX.ai | Transform Your Ideas into Action',
    description: 'Transform Your Ideas Into Connect With People, Make Things Happen! anonymous.dev',
    images: [imageUrl]
  }
};
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}