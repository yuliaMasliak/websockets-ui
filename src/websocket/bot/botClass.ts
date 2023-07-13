class Bot {
  isSingleGame: boolean = false;
  id: number = 0;
  ships: any = [
    { position: { x: 0, y: 4 }, direction: true, type: 'huge', length: 4 },
    { position: { x: 3, y: 2 }, direction: true, type: 'large', length: 3 },
    { position: { x: 8, y: 4 }, direction: true, type: 'large', length: 3 },
    { position: { x: 9, y: 0 }, direction: true, type: 'medium', length: 2 },
    { position: { x: 5, y: 3 }, direction: false, type: 'medium', length: 2 },
    { position: { x: 5, y: 5 }, direction: false, type: 'medium', length: 2 },
    { position: { x: 7, y: 0 }, direction: true, type: 'small', length: 1 },
    { position: { x: 2, y: 8 }, direction: true, type: 'small', length: 1 },
    { position: { x: 7, y: 8 }, direction: true, type: 'small', length: 1 },
    { position: { x: 9, y: 8 }, direction: false, type: 'small', length: 1 }
  ];
  shoots: any = [];
  setIsSingleGame(value: boolean) {
    this.isSingleGame = value;
  }
  gettIsSingleGame() {
    return this.isSingleGame;
  }
  setID(value: number) {
    this.id = value;
  }
}
export const isSingleGame = new Bot();
