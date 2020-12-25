import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Team } from '../interfaces/team';
export const TeamsTableHeaders = ['name', 'country', 'players'];

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private teamsDb: AngularFireList<Team>;
  constructor(private db: AngularFireDatabase) {
    this.teamsDb = this.db.list('/teams', (ref) => ref.orderByChild('name'));
  }

  getTeams() {
    return this.teamsDb.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => ({
          $key: c.key,
          ...c.payload.val(),
        }));
      })
    );
  }

  addTeam(team: Team) {
    return this.teamsDb.push(team);
  }

  deleteTeam(id: string) {
    this.db.list('/teams').remove(id);
  }

  editTeam(newTeamData: Team) {
    const $key = newTeamData.$key;
    delete newTeamData.$key;
    this.db.list('/teams').update($key, newTeamData);
  }
}