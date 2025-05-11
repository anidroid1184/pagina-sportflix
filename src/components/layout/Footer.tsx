export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} FitStyle Inc. All rights reserved.</p>
        <p className="mt-1">Elevate Your Performance.</p>
      </div>
    </footer>
  );
}
