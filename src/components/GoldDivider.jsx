// Kolam/Rangoli-inspired section divider
export default function GoldDivider({ className = '' }) {
  return (
    <div className={`flex items-center gap-0 ${className}`} aria-hidden="true">
      <div className="flex-1 h-px bg-art-border" />
      {/* Kolam motif: dot — diamond — dot — diamond — dot */}
      <div className="flex items-center gap-2 px-4">
        <span className="w-1 h-1 rounded-full bg-art-gold/50 block" />
        <span className="w-1.5 h-1.5 bg-art-gold/70 block rotate-45" />
        <span className="w-1 h-1 rounded-full bg-art-gold/50 block" />
        <span className="w-2.5 h-2.5 bg-art-gold/60 block rotate-45" />
        <span className="w-1 h-1 rounded-full bg-art-gold/50 block" />
        <span className="w-1.5 h-1.5 bg-art-gold/70 block rotate-45" />
        <span className="w-1 h-1 rounded-full bg-art-gold/50 block" />
      </div>
      <div className="flex-1 h-px bg-art-border" />
    </div>
  )
}
