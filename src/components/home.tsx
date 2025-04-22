import { Dashboard } from "./Dashboard";

function Home() {
  return (
    <div
      className="w-screen h-screen overflow-auto bg-background"
      dir="rtl"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Dashboard />
    </div>
  );
}

export default Home;
