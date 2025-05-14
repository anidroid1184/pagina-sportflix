
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Instagram, Facebook, Twitter, Youtube, Linkedin, Users, MessageSquare, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com', color: 'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500', handle: '@SporflixOficial' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com', color: 'bg-blue-600', handle: '/Sporflix' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', color: 'bg-sky-500', handle: '@SporflixCol' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com', color: 'bg-red-600', handle: 'Canal SPORFLIX' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', color: 'bg-sky-700', handle: 'SPORFLIX Colombia' },
];

export default function SocialPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-12 text-center motion-safe:animate-fade-in-down">
        <Users className="mx-auto h-16 w-16 text-accent mb-4" />
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
          Conéctate con la Comunidad SPORFLIX
        </h1>
        <p className="mt-4 text-xl text-foreground/80 max-w-2xl mx-auto">
          Síguenos en nuestras redes sociales para ser parte de nuestra comunidad, enterarte de novedades, promociones y contenido exclusivo.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <Card 
              key={social.name} 
              className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center group motion-safe:animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className={`w-full p-6 ${social.color} text-white flex flex-col items-center`}>
                <Icon className="h-12 w-12 mb-3" />
                <CardTitle className="text-2xl font-semibold">{social.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-grow flex flex-col items-center justify-center">
                <p className="text-muted-foreground mb-1 text-sm">Encuéntranos como:</p>
                <p className="text-lg font-medium text-primary mb-4">{social.handle}</p>
                <Button asChild variant="outline" className="mt-auto border-primary text-primary hover:bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    Visitar <Share2 className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </section>
      
      <section className="mb-16 motion-safe:animate-fade-in-up">
        <Card className="shadow-xl bg-gradient-to-r from-primary/10 via-background to-accent/10">
            <CardHeader className="text-center pb-4">
                <MessageSquare className="mx-auto h-12 w-12 text-primary mb-3" />
                <CardTitle className="text-3xl font-bold text-primary">¡Únete a la Conversación!</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <p className="text-lg text-foreground/80 mb-6 max-w-xl mx-auto">
                    Comparte tus logros, tus looks deportivos favoritos y conecta con otros apasionados del deporte usando el hashtag <strong className="text-accent">#SPORFLIXStyle</strong>.
                </p>
                <div className="relative h-64 w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-md">
                    <Image 
                        src="https://picsum.photos/seed/socialcommunity/1000/400" 
                        alt="Comunidad deportiva SPORFLIX" 
                        layout="fill" 
                        objectFit="cover"
                        data-ai-hint="sports community"
                    />
                     <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <p className="text-4xl font-bold text-white p-4 bg-black/50 rounded-md">#SPORFLIXStyle</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </section>

      <section className="text-center py-10 motion-safe:animate-fade-in-up">
        <h2 className="text-3xl font-semibold text-primary mb-3">¿Listo para explorar más?</h2>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-6">
          Vuelve a nuestro catálogo y encuentra las prendas perfectas para tu estilo de vida activo.
        </p>
        <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/catalog">Ir al Catálogo</Link>
        </Button>
      </section>
    </div>
  );
}
