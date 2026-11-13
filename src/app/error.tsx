'use client';
import './error.css';
export default function ErrorPage({reset}:{error:Error;reset:()=>void}){return <div className="container section"><h1>Die Seite konnte nicht geladen werden.</h1><p>Bitte versuche es erneut. Über die Navigation erreichst du die anderen Bereiche.</p><button className="button" onClick={()=>reset()}>Erneut versuchen</button></div>}
