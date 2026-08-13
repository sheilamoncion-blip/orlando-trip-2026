import { NavLink } from 'react-router-dom';
import { Home, CalendarDays, MapPin, Utensils, Sparkles, Bell } from 'lucide-react';

const links = [
  { to: '/', icon: Home, label: 'Hoy', end: true },
  { to: '/itinerario', icon: CalendarDays, label: 'Itinerario' },
  { to: '/mapa', icon: MapPin, label: 'Mapa' },
  { to: '/epcot', icon: Utensils, label: 'Epcot' },
  { to: '/mas', icon: Sparkles, label: 'Más' },
  { to: '/alertas', icon: Bell, label: 'Alertas' },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 flex pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
      {links.map(({ to, icon: Icon, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-colors min-h-[56px] ${
              isActive ? 'text-sky-600' : 'text-slate-400'
            }`
          }
        >
          <Icon size={20} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
