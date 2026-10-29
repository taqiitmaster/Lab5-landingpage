import { ChevronUp } from "lucide-react"
import { profile } from "../data/portfolioData"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-name">{profile.name}</p>
          <p className="footer-sub">{profile.tagline}</p>
        </div>
        <div className="footer-right">
          <p className="footer-sub">© {new Date().getFullYear()} {profile.name}</p>
          <a href="#home" className="text-link"><ChevronUp size={15} aria-hidden="true" /> Back to Top</a>
        </div>
      </div>
    </footer>
  )
}
