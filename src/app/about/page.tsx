
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MapPin, Target, Coffee } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-12 text-center motion-safe:animate-fade-in-down">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
          Sobre Sporflix
        </h1>
        <p className="mt-4 text-xl text-foreground/80">
          Conoce nuestra historia, misión y el equipo detrás de tu ropa deportiva favorita.
        </p>
      </header>

      <section className="mb-16">
        <Card className="overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-64 md:h-full min-h-[300px] motion-safe:animate-fade-in">
              <Image
                src="https://picsum.photos/seed/aboutus/800/600"
                alt="Equipo de Sporflix trabajando"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 hover:scale-105"
                data-ai-hint="team working"
              />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center motion-safe:animate-fade-in-up">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-3xl font-semibold text-primary">Nuestra Pasión por el Deporte</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4 text-foreground/90">
                <p>
                  En Sporflix, nacimos de una pasión compartida por el deporte y el bienestar. Creemos que la ropa adecuada no solo mejora el rendimiento, sino que también inspira confianza y motivación.
                </p>
                <p>
                  Desde nuestros humildes comienzos, nos hemos dedicado a seleccionar y crear prendas que combinan funcionalidad, estilo y comodidad, para que puedas enfocarte en alcanzar tus metas.
                </p>
                <p>
                  Nuestro equipo está compuesto por atletas, diseñadores y entusiastas del deporte que entienden tus necesidades y trabajan incansablemente para ofrecerte lo mejor.
                </p>
              </CardContent>
            </div>
          </div>
        </Card>
      </section>

      <section className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 motion-safe:animate-fade-in-up">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Target className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-semibold text-primary">Nuestra Misión</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80">
              Empoderar a cada atleta, desde el principiante hasta el profesional, con ropa deportiva de alta calidad que inspire movimiento, rendimiento y confianza.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 motion-safe:animate-fade-in-up [animation-delay:0.1s]">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Users className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-semibold text-primary">Nuestro Equipo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80">
              Somos un grupo diverso de apasionados por el deporte, dedicados a la innovación y la satisfacción del cliente. ¡Nos encanta lo que hacemos!
            </p>
          </CardContent>
        </Card>

        <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 motion-safe:animate-fade-in-up [animation-delay:0.2s]">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
              <MapPin className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-semibold text-primary">Encuéntranos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80">
              Nuestra sede principal está en el corazón de la ciudad, pero llegamos a todos los rincones del país a través de nuestra tienda online.
            </p>
            <p className="mt-2 text-sm text-foreground/70">Calle Ficticia 123, Sportcity, Colombia</p>
          </CardContent>
        </Card>
      </section>
      
      <section className="text-center py-10 bg-muted/50 rounded-lg shadow-md motion-safe:animate-fade-in-up">
        <Coffee className="mx-auto h-12 w-12 text-primary mb-4" />
        <h2 className="text-3xl font-semibold text-primary mb-3">¿Quieres unirte a nuestra comunidad?</h2>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Síguenos en nuestras redes sociales para estar al día de novedades, consejos y promociones exclusivas.
        </p>
      </section>
    </div>
  );
}
