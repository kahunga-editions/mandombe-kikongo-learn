import Navbar from "@/components/Navbar";
import CrosswordPuzzle from "@/components/exercises/CrosswordPuzzle";
import { mc01Bakala } from "@/data/crosswords/mc-01-bakala";

const MotsCroisesPilote = () => {
  return (
    <div className="min-h-screen bg-earth-deep text-cream">
      <Navbar />
      <main className="px-4 pb-12 pt-24">
        <div className="mx-auto max-w-3xl rounded-xl border border-border/40 bg-card p-6 text-card-foreground shadow-sm">
          <CrosswordPuzzle pilot={mc01Bakala} />
        </div>
      </main>
    </div>
  );
};

export default MotsCroisesPilote;
