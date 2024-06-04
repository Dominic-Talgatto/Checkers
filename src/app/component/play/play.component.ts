import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from "../../service/auth.service";
import {HttpClient} from "@angular/common/http";

interface Position {
  row: number;
  col: number;
}

interface Piece {
  type: string;
  color: "white" | "black";
}

interface Cell {
  piece?: Piece
}

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [NgFor, NgStyle, NgIf, DragDropModule, RouterLink],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent implements OnInit{

  turn!: "white" | "black";
  multipleTakes!: boolean;
  scoreWhite = 0;
  scoreBlack = 0;
  gameOverString = "";
  gameOverBool = false;

  name: string = "";
  rating = "";

  board: Cell[][] = this.createBoard();
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
  }
  ngOnInit(): void {
    if (this.authService.isLoggedIn()){
      this.http.get('http://127.0.0.1:8000/checkers/user', {headers: {Authorization: 'Token ${token}'}})
        .subscribe(
          (response: any) =>{
            this.name = response.name
            this.http.get('http://127.0.0.1:8000/checkers/player-info', {headers: {Authorization: 'Token ${token}'}})
              .subscribe(
                (playerInfoResponse: any) =>{
                  this.rating = playerInfoResponse.rating
                }
              )
          },
          (error)=>{
            console.log(error)
          }
        )
    }
  }
  createBoard() : Cell[][] {
    const board: Cell[][] = [];
    for (let i = 0; i < 8; i++) {
      board.push([]);

      for (let j = 0; j < 8; j++) {
        const cell : Cell = {};
        if((i + j) % 2 == 1){
          if(i < 3) {
            cell.piece = this.checker(board, "black");
          } else if(i > 4){
            cell.piece = this.checker(board, "white");
          } else{
            cell.piece = undefined;
          }
        } else {
          cell.piece = undefined;
        }
        board[i].push(cell)
      }
    }
    this.turn = "white";
    this.multipleTakes = false;
    return board;
  }

  move(event : CdkDragDrop<any, Position, Position>){
    const oldPos = event.item.data;
    const newPos = event.container.data;
    const piece = this.board[oldPos.row][oldPos.col];
    if(this.turn == piece.piece?.color){
      this.multipleTakes = false;
      if(this.isValidMove(oldPos.col, oldPos.row, newPos.col, newPos.row, piece?.piece)){
        this.board[oldPos.row][oldPos.col] = {};
        this.board[newPos.row][newPos.col] = piece;
        if(!this.multipleTakes){
          if(this.turn == "white"){
            this.turn = "black";
          } else {
            this.turn = "white";
          }
        }
        if(this.scoreWhite == 12){
          this.gameOver(piece.piece.color);
        }
        if(this.scoreBlack == 12){
          this.gameOver(piece.piece.color);
        }

        if(newPos.row == 0 && piece.piece.color == "white"){
          piece.piece.type = "damka";
        } else if(newPos.row == 7 && piece.piece.color == "black"){
          piece.piece.type = "damka";
        }
      }
    }




  }

  isValidMove(oldCol: number, oldRow: number, newCol: number, newRow: number, piece?: Piece) : boolean{
    // For checkers
    if(piece?.type == "checker"){
      if(piece.color == "white"){ // For White Pieces
        if((newCol + newRow) % 2 == 1){ // Checks if cell is black
          if(oldRow - 1 == newRow && oldCol + 1 == newCol){ // right 1
            if(this.board[newRow][newCol].piece == undefined){ // Checks if there any figure
              return true;
            }
            return false;
          }
          if(oldRow - 1 == newRow && oldCol - 1 == newCol){ // left 1
            if(this.board[newRow][newCol].piece == undefined){ // Checks if cell don't have figure
              return true;
            }
            return false;
          }
          if(oldRow - 2 == newRow && oldCol + 2 == newCol){ // right 2
            if(this.board[newRow][newCol].piece == undefined){ // Checks if cell don't have figure
              if(this.board[oldRow - 1][oldCol + 1].piece != undefined
                && this.board[oldRow - 1][oldCol + 1].piece?.color == "black"){

                this.board[oldRow - 1][oldCol + 1] = {};
                if(this.hasMultipleTake(newRow, newCol, piece)){
                  this.multipleTakes = true;
                  console.log(1);
                }
                this.scoreWhite++;
                return true;
              }
            }
            return false;
          }
          if(oldRow - 2 == newRow && oldCol - 2 == newCol){ // left 2
            if(this.board[newRow][newCol].piece == undefined){ // Checks if cell don't have figure
              if(this.board[oldRow - 1][oldCol - 1].piece != undefined
                && this.board[oldRow - 1][oldCol - 1].piece?.color == "black"){

                this.board[oldRow - 1][oldCol - 1] = {};
                if(this.hasMultipleTake(newRow, newCol, piece)){
                  this.multipleTakes = true;
                  console.log(1);
                }
                this.scoreWhite++;
                return true;
              }
            }
            return false;
          }
          if(oldRow + 2 == newRow && oldCol + 2 == newCol){ // right -2
            if(this.board[newRow][newCol].piece == undefined){ // Checks if cell don't have figure
              if(this.board[oldRow + 1][oldCol + 1].piece != undefined
                && this.board[oldRow + 1][oldCol + 1].piece?.color == "black"){

                this.board[oldRow + 1][oldCol + 1] = {};
                if(this.hasMultipleTake(newRow, newCol, piece)){
                  this.multipleTakes = true;
                  console.log(1);
                }
                this.scoreWhite++;
                return true;
              }
            }
            return false;
          }
          if(oldRow + 2 == newRow && oldCol - 2 == newCol){ // left -2
            if(this.board[newRow][newCol].piece == undefined){ // Checks if cell don't have figure
              if(this.board[oldRow + 1][oldCol - 1].piece != undefined
                && this.board[oldRow + 1][oldCol - 1].piece?.color == "black"){

                this.board[oldRow + 1][oldCol - 1] = {};
                if(this.hasMultipleTake(newRow, newCol, piece)){
                  this.multipleTakes = true;
                  console.log(1);
                }
                this.scoreWhite++;
                return true;
              }
            }
            return false;
          }


        }
      } else if(piece.color == "black"){ // For black pieces
        if((newCol + newRow) % 2 == 1){ // Checks if cell is black
          if(oldRow + 1 == newRow && oldCol + 1 == newCol){ // right 1
            if(this.board[newRow][newCol].piece == undefined){ // Checks if cell don't have figure
              return true;
            }
            return false;
          }
          if(oldRow + 1 == newRow && oldCol - 1 == newCol){ // left 1
            if(this.board[newRow][newCol].piece == undefined){ // Checks if cell don't have figure
              return true;
            }
            return false;
          }
          if(oldRow + 2 == newRow && oldCol + 2 == newCol){ // right 2
            if(this.board[newRow][newCol].piece == undefined){ // Checks if cell don't have figure
              if(this.board[oldRow + 1][oldCol + 1].piece != undefined
                && this.board[oldRow + 1][oldCol + 1].piece?.color == "white"){

                this.board[oldRow + 1][oldCol + 1] = {};
                if(this.hasMultipleTake(newRow, newCol, piece)){
                  this.multipleTakes = true;
                  console.log(2);
                }
                this.scoreBlack++;
                return true;
              }
            }
            return false;
          }
          if(oldRow + 2 == newRow && oldCol - 2 == newCol){ // left 2
            if(this.board[newRow][newCol].piece == undefined){ // Checks if cell don't have figure
              if(this.board[oldRow + 1][oldCol - 1].piece != undefined
                && this.board[oldRow + 1][oldCol - 1].piece?.color == "white"){

                this.board[oldRow + 1][oldCol - 1] = {};
                if(this.hasMultipleTake(newRow, newCol, piece)){
                  this.multipleTakes = true;
                  console.log(2);
                }
                this.scoreBlack++;
                return true;
              }
            }
            return false;
          }
          if(oldRow - 2 == newRow && oldCol + 2 == newCol){ // right -2
            if(this.board[newRow][newCol].piece == undefined){ // Checks if cell don't have figure
              if(this.board[oldRow - 1][oldCol + 1].piece != undefined
                && this.board[oldRow - 1][oldCol + 1].piece?.color == "white"){

                this.board[oldRow - 1][oldCol + 1] = {};
                if(this.hasMultipleTake(newRow, newCol, piece)){
                  this.multipleTakes = true;
                  console.log(2);
                }
                this.scoreBlack++;
                return true;
              }
            }
            return false;
          }
          if(oldRow - 2 == newRow && oldCol - 2 == newCol){ // left -2
            if(this.board[newRow][newCol].piece == undefined){ // Checks if cell don't have figure
              if(this.board[oldRow - 1][oldCol - 1].piece != undefined
                && this.board[oldRow - 1][oldCol - 1].piece?.color == "white"){

                this.board[oldRow - 1][oldCol - 1] = {};
                if(this.hasMultipleTake(newRow, newCol, piece)){
                  this.multipleTakes = true;
                  console.log(2);
                }
                this.scoreBlack++;
                return true;
              }
            }
            return false;
          }

        }
      }
    } if (piece?.type == "damka") {
      // if(piece.color == "white"){
      if((newRow + newCol) % 2 == 1){
        const color = piece.color;
        let tempRow = oldRow;
        if(newRow < oldRow && newCol > oldCol){
          for (let i = oldCol; i <= newCol; i++) { // right +
            if(i == newCol && tempRow == newRow){
              if(this.board[newRow][newCol].piece != undefined){
                return false;
              }
              return true;
            }
            if(this.board[tempRow][i].piece != undefined && this.board[tempRow][i].piece?.color != color){
              if(tempRow - 1 > 0 && i + 1< 8 && this.board[tempRow - 1][i + 1].piece != undefined){
                return false;
              } else{
                if (piece.color == "white") {
                  this.scoreWhite++;
                } else {
                  this.scoreBlack++;
                }
                this.board[tempRow][i] = {};
              }
            }
            tempRow--;
          }
        }
        if(newRow > oldRow && newCol < oldCol){
          tempRow = oldRow;
          for (let i = oldCol; i >= newCol; i--) { // right -
            if(i == newCol && tempRow == newRow){
              if(this.board[newRow][newCol].piece != undefined){
                return false;
              }
              return true;
            }
            if(this.board[tempRow][i].piece != undefined && this.board[tempRow][i].piece?.color != color){
              if(tempRow + 1 < 0 && i - 1 > 0 && this.board[tempRow + 1][i - 1].piece != undefined){
                return false;
              } else{
                if (piece.color == "white") {
                  this.scoreWhite++;
                } else {
                  this.scoreBlack++;
                }
                this.board[tempRow][i] = {};
              }
            }
            tempRow++;
          }
        }

        if(newRow < oldRow && newCol < oldCol){
          tempRow = oldRow;
          for (let i = oldCol; i >= newCol; i--) { // left +
            if(i == newCol && tempRow == newRow){
              if(this.board[newRow][newCol].piece != undefined){
                return false;
              }
              return true;
            }
            if(this.board[tempRow][i].piece != undefined && this.board[tempRow][i].piece?.color != color){
              if(tempRow - 1 > 0 && i - 1 > 0 && this.board[tempRow - 1][i - 1].piece != undefined){
                return false;
              } else{
                if (piece.color == "white") {
                  this.scoreWhite++;
                } else {
                  this.scoreBlack++;
                }
                this.board[tempRow][i] = {};
              }
            }
            tempRow--;
          }
        }

        if(newRow > oldRow && newCol > oldCol){
          tempRow = oldRow;
          for (let i = oldCol; i <= newCol; i++) { // left -
            if(i == newCol && tempRow == newRow){
              if(this.board[newRow][newCol].piece != undefined){
                return false;
              }
              return true;
            }
            if(this.board[tempRow][i].piece != undefined && this.board[tempRow][i].piece?.color != color){
              if(tempRow + 1 < 8 && i + 1 < 8 && this.board[tempRow + 1][i + 1].piece != undefined){
                return false;
              } else{
                if (piece.color == "white") {
                  this.scoreWhite++;
                } else {
                  this.scoreBlack++;
                }
                this.board[tempRow][i] = {};
              }
            }
            tempRow++;
          }
        }
        return false;
      }
      // }

    }
    return false;
  }

  displayPiece(row: number, col: number): string {
    const p = this.board[row][col].piece;
    const c = this.board[row][col].piece?.color;
    const t = this.board[row][col].piece?.type;
    return p ? `assets/image/${c}-${t}Piece.png` : "";
  }

  checker(board : Cell[][], color : "white" | "black") : Piece {
    return {
      type: "checker",
      color: color
    }

  }
  damka(board : Cell[][], color : "white" | "black") : Piece {
    return {
      type: "damka",
      color: color
    }

  }

  hasMultipleTake(row: number, col: number, piece: Piece) : boolean{
    if(piece.color == "white"){
      if(row - 2 >= 0 && col + 2 <= 7 && this.board[row - 2][col + 2].piece == undefined){ // right 2
        if(this.board[row - 1][col + 1].piece != undefined){
          if(this.board[row - 1][col + 1].piece?.color == "black"){
            this.turn = "white";
            return true;
          }

        }
      }
      if(row - 2 >= 0 && col - 2 >= 0 && this.board[row - 2][col - 2].piece == undefined){ // left 2
        if(this.board[row - 1][col - 1].piece != undefined){
          if(this.board[row - 1][col - 1].piece?.color == "black"){
            this.turn = "white";
            return true;
          }
        }
      }
      if(row + 2 <= 7 && col + 2 <= 7 && this.board[row + 2][col + 2].piece == undefined){ // right -2
        if(this.board[row + 1][col + 1].piece != undefined){
          if(this.board[row + 1][col + 1].piece?.color == "black"){
            this.turn = "white";
            return true;
          }
        }
      }
      if(row + 2 <= 7 && col - 2 >= 0 && this.board[row + 2][col - 2].piece == undefined){ // left -2
        if(this.board[row + 1][col - 1].piece != undefined){
          if(this.board[row + 1][col - 1].piece?.color == "black"){
            this.turn = "white";
            return true;
          }
        }
      }
      return false;
    }
    else if(piece.color == "black"){
      if(row + 2 <= 7 && col + 2 <= 7 && this.board[row + 2][col + 2].piece == undefined){ // right 2
        if(this.board[row + 1][col + 1].piece != undefined){
          if(this.board[row + 1][col + 1].piece?.color == "white"){
            this.turn = "black";
            return true;
          }

        }
      }
      if(row + 2 <= 7 && col - 2 >= 0 && this.board[row + 2][col - 2].piece == undefined){ // left 2
        if(this.board[row + 1][col - 1].piece != undefined){
          if(this.board[row + 1][col - 1].piece?.color == "white"){
            this.turn = "black";
            return true;
          }
        }
      }
      if(row - 2 >= 0 && col + 2 <= 7 && this.board[row - 2][col + 2].piece == undefined){ // right -2
        if(this.board[row - 1][col + 1].piece != undefined){
          if(this.board[row - 1][col + 1].piece?.color == "white"){
            this.turn = "black";
            return true;
          }
        }
      }
      if(row - 2 >= 0 && col - 2 >= 0 && this.board[row - 2][col - 2].piece == undefined){ // left -2
        if(this.board[row - 1][col - 1].piece != undefined){
          if(this.board[row - 1][col - 1].piece?.color == "white"){
            this.turn = "black";
            return true;
          }
        }
      }
      return false;
    }
    return false;
  }

  gameOver(text: string){
    this.gameOverString = text.charAt(0).toUpperCase() + text.slice(1) + " won!";
    if(text != "white" && text != "black"){
      this.gameOverString = "Draw"
    }
    this.gameOverBool = true;
  }

  reloadPage() {
    window.location.reload();
  }
}


