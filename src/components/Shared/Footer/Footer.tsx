export default function Footer() {
  return (
    <footer className="border-t bg-background/60 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-foreground">Klimate</span>
        </p>
        <p>Made with ❤️ by Ahmed Sami</p>
      </div>
    </footer>
  );
}
