import { IItem, IToDoModel } from "../types";
import { EventEmitter } from "./EventEmitter";

// класс имплементирует(реализует) интерфейс IToDoModel. здесь не предоставляется прямой доступ к данным
export class ToDoModel extends EventEmitter implements IToDoModel {
  protected _items: IItem[]; //доступ на прямую получать нельзя, поэтому protected. любой доступ только через сеттер или геттер. подстрочник добавляется, чтобы была возможность создать сеттер и геттер с именем items. подстрочник также это защищенное поле класса (также можно использовать #)

  // определяет пустой массив
  constructor() {
    super();
    this._items = [];
  }

  // сохраняет массив данных в items (как правило, для начальных данных)
  set items(data: IItem[]) {
    this._items = data;
    this.emit('changed');
  }

  // возвращает массив данных, хранящихся в item
  get items() {
    return this._items;
  }

  // получает данные в виде строки для записи
  addItem(data: string) {
    const uniqueId: number = Math.max(... this._items.map(item => Number(item.id))) + 1; // берем максимальное значение id, которое уже есть, и добавляем к нему 1
    const newItem: IItem = {id: String(uniqueId), name: data}; // создаем новый объект
    this._items.push(newItem); // добавили в массив
    this.emit('changed');
    return newItem; // вернули созданный объект
  };

  removeItem(id: string) {
    this._items = this._items.filter(item => item.id !== id);
    this.emit('changed');
  }

  getItem(id: string) {
    return this._items.find(item => item.id === id)
  }

  editItem (id: string, name: string) {
    const editedItem = this._items.find(item => item.id === id);
    editedItem.name = name;
    this.emit('changed');
  }

}