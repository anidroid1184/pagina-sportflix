
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
    { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
    { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
  ];

  return (
    <footer className="border-t py-8 bg-background">
      <div className="container text-center text-muted-foreground">
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-semibold text-foreground">Síguenos en nuestras redes sociales</h3>
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label={social.label}
              >
                <social.icon className="h-6 w-6" />
              </Link>
            ))}
          </div>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Sporflix Inc. Todos los derechos reservados.</p>
        <p className="mt-1 text-sm">Tu comodidad, tu deporte, tu estilo.</p>
      </div>
    </footer>
  );
}
