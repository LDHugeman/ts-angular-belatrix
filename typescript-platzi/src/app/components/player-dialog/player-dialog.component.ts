import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Country } from 'src/app/enums/country';
import { SquadNumber } from 'src/app/enums/squad-number';
import { Player } from 'src/app/interfaces/player';
import { Team } from 'src/app/interfaces/team';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-player-dialog',
  templateUrl: './player-dialog.component.html',
  styleUrls: ['./player-dialog.component.scss'],
})
export class PlayerDialogComponent implements OnInit {
  private team;
  player: Player;
  public countries = Object.keys(Country).map((key) => ({
    label: key,
    key: Country[key],
  }));
  public squadNumber = Object.keys(SquadNumber)
    .slice(Object.keys(SquadNumber).length / 2)
    .map((key) => ({
      label: key,
      key: SquadNumber[key],
    }));
  constructor(
    private playerService: PlayerService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe((teams) => {
        if (teams.length > 0) {
          this.team = teams[0];
        }
      });
  }

  private newPlayer(playerFromValue: Player) {
    const key = this.playerService.addPlayer(playerFromValue).key;
    const playerFromValueKey: Player = {
      ...playerFromValue,
      $key: key,
    };
    const formattedTeam: Team = {
      ...this.team,
      players: [
        ...(this.team.players ? this.team.players : []),
        playerFromValueKey,
      ],
    };
    this.teamService.editTeam(formattedTeam);
  }

  onSubmit(playerForm: NgForm) {
    const playerFormValue = {
      ...playerForm.value,
    };
    if (playerForm.valid) {
      playerFormValue.leftFooted =
        playerFormValue.leftFooted === '' ? false : playerFormValue.leftFooted;
    }
    this.newPlayer(playerFormValue);
    window.location.replace('#');
  }
}
