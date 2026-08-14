import type { FamilyGroup, FamilyMember } from '../types';

// Roster por defecto de la familia que va al viaje — viene del grupo de WhatsApp.
// Se usa como valor inicial la primera vez que alguien abre la app en un dispositivo nuevo
// (ver db.getFamilyGroups/getFamilyMembers), para que todos vean la misma lista sin tener
// que armarla a mano cada uno. Los avatares/edad/teléfono se siguen agregando por dispositivo.
// Se dejaron fuera del grupo de WhatsApp los contactos sin nombre real (solo número o @usuario).

export const DEFAULT_FAMILY_GROUPS: FamilyGroup[] = [
  { id: 'familia-lorenzo', label: 'Familia Lorenzo' },
];

const NAMES = [
  'Sheila Moncion',
  'Carlos Manuel Lorenzo',
  'Giselle Lorenzo',
  'Aydita Lorenzo',
  'Carlos Alberto Coss',
  'Chantall Peña',
  'Nancy Lorenzo',
  'Tio Dago',
  'Yairy Lorenzo Castillo',
  'Yari Lorenzo',
  'Yomeiry Lorenzo',
  'Christopher Medina Payano',
  'Damarys Florentino',
  'Sanya',
  'Jovanel Benzan',
];

export const DEFAULT_FAMILY_MEMBERS: FamilyMember[] = NAMES.map(name => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  name,
  groupLabel: 'Familia Lorenzo',
}));
