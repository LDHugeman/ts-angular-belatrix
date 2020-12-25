import { Country } from '../enums/country';
import { SquadNumber } from '../enums/squad-number';

export interface Player {
  $key?: string;
  name: string;
  lastName: string;
  position: SquadNumber;
  weight: number;
  height: number;
  nationality: Country;
  leftFooted: boolean;
}
