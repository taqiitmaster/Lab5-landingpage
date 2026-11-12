import { createRoot } from 'react-dom/client'
// Fonts are bundled locally — the page makes no third-party requests at all.
import '@fontsource-variable/inter-tight'
import '@fontsource-variable/archivo'
import '@fontsource-variable/jetbrains-mono'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(<App />)
