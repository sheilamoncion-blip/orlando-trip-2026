import { PartyPopper } from 'lucide-react';
import type { BirthdayPerson } from '../types';

export default function BirthdayBanner({ person }: { person: BirthdayPerson }) {
  return (
    <div className="relative overflow-hidden rounded-2xl p-4 sm:p-5 text-white shadow-lg birthday-confetti-bg">
      <div className="relative z-10 flex items-start gap-3">
        <div className="bg-white/20 rounded-full p-2 shrink-0">
          <PartyPopper size={24} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider opacity-90">¡Hoy es un día especial!</p>
          <h3 className="text-lg sm:text-xl font-extrabold leading-tight mt-0.5">
            🎂 {person.name.toUpperCase()} CUMPLE {person.age} AÑOS HOY!
          </h3>
          <p className="text-sm opacity-90 mt-1">Perks especiales desbloqueados para hoy — revisa la sección de cumpleaños.</p>
        </div>
      </div>
    </div>
  );
}
