import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Player } from '../interfaces/player';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private playersDb: AngularFireList<Player>;

  constructor(private db: AngularFireDatabase) {
    this.playersDb = this.db.list('/players', (ref) =>
      ref.orderByChild('name')
    );
  }

  getPlayers(): Observable<Player[]> {
    return this.playersDb.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => ({
          $key: c.key!,
          ...c.payload.val()!,
        }));
      })
    );
  }

  addPlayer(player: Player) {
    return this.playersDb.push(player);
  }

  deletePlayer(id: string) {
    this.db.list('/players').remove(id);
  }

  /*editPlayer(newPlayerData: Player) {
    const $key = newPlayerData.$key;
    delete newPlayerData.$key;
    this.db.list('/players').update($key, newPlayerData);
  }*/

  editPlayer(newPlayerData: Player) {
    const $key = newPlayerData.$key;
    if ($key) {
      delete newPlayerData.$key;
      this.db.list('/players').update($key, newPlayerData);
    }
  }
}
