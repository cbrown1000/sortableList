export class ListItem {
  constructor(public id: number, public sortNum: number, public name: string) { }

  public static sortCompare(a: ListItem, b: ListItem) {
  if (a.sortNum < b.sortNum) {
    return -1;
  } else if (a.sortNum > b.sortNum) {
    return 1;
  } else {
    return 0;
  }

}
}
