import type { Metadata } from 'next';
import '@fontsource/open-sans/latin-400.css';
import '@fontsource/open-sans/latin-600.css';
import '@fontsource/open-sans/latin-700.css';
import '@fontsource/open-sans/latin-800.css';
import '@/styles/globals.css';
import '@/styles/pages.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
export const metadata:Metadata={title:{default:'SPD Büdingen | Politik vor Ort',template:'%s | SPD Büdingen'},description:'Kommunalpolitik, politische Bildung und die Geschichte der Sozialdemokratie in Büdingen. Eigenständiger Website-Entwurf.',robots:{index:false,follow:false}};
const hallmarkMetadata='/* Hallmark · theme: brand (SPD CD by request) · genre: editorial · shape: local political magazine · hero: poster · nav: editorial masthead · footer: civic directory · signature: Büdingen since 1893 · job: join · posture: drenched · surface: absolute · v2.0.0 */';
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="de"><head><style id="hallmark-metadata">{hallmarkMetadata}</style></head><body><Header/><main id="main">{children}</main><Footer/></body></html>}
