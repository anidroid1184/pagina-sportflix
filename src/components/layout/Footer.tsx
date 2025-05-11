export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Sporflix Inc. Todos los derechos reservados.</p>
        <p className="mt-1">Tu comodidad, tu deporte, tu estilo.</p>
      </div>
    </footer>
  );
}
