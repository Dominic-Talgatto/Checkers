import {Component, OnInit} from '@angular/core';
import {Magazine} from "../../models";
import {MagazineService} from "../../service/magazine.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.component.html',
  styleUrl: './magazine.component.css',
  standalone: true,
  imports: [CommonModule],
  providers: [MagazineService]
})
export class MagazineComponent implements OnInit{
  magazine!: Magazine[];
  loaded: boolean;
  filteredMagazines: Magazine[] = [];
  constructor(private magazineService: MagazineService) {
    this.magazine = [];
    this.loaded = true;
  }
  ngOnInit(): void {
    this.getMagazine();
  }
  getMagazine(){
    this.magazineService.getMagazine().subscribe( (magazine) => {
      this.magazine = magazine;
      this.filteredMagazines = [...this.magazine];
      this.loaded = true;

    })
  }
  setType(type: string): void{
    this.filteredMagazines = this.magazine.filter(mag=>mag.type==type);
  }
}
