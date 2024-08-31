import { IItem } from '../types/index';
import { EventEmitter, IEvents } from './EventEmitter';

export interface IViewItem extends IEvents{
  id: string;
  name: string;
  render(item: IItem): HTMLElement;
}

export interface IViewItemConstructor {
  new (template: HTMLTemplateElement): IViewItem
}

export class Item extends EventEmitter implements IViewItem {

  protected itemElement: HTMLElement; // св-во элемента разметки, который будет создаваться с помощью класса
  protected title: HTMLElement; // св-во элемента с названием карточки
  protected deleteButton: HTMLButtonElement;
  protected copyButton: HTMLButtonElement;
  protected editButton: HTMLButtonElement;
  protected _id: string; // название с подстрочником, т.к будут создаваться сеттер и геттер

  // запускается функция constructor как только записали new Item и перечислили аргументы, предназначена для начального создания
  constructor (template: HTMLTemplateElement) {
    super();
    this.itemElement = template.content.querySelector('.todo-item').cloneNode(true) as HTMLElement;
    this.title = this.itemElement.querySelector('.todo-item__text');
    this.deleteButton = this.itemElement.querySelector('.todo-item__del');
    this.copyButton = this.itemElement.querySelector('.todo-item__copy');
    this.editButton = this.itemElement.querySelector('.todo-item__edit');

    this.deleteButton.addEventListener('click', () => this.emit('delete', {id: this._id}));
    this.copyButton.addEventListener('click', () => this.emit('copy', {id: this._id}));
    this.editButton.addEventListener('click', () => this.emit('edit', {id: this._id}));
  }

  set id(value: string) {
    this._id = value;
}

get id(): string {
    return this._id || '';
}

set name(value: string) {
    this.title.textContent = value;
}

get name(): string {
    return this.title.textContent || '';
}

  // метод, возвращающий разметку карточки
  render(item: IItem) {
    this.name = item.name;
    this.id = item.id;
    return this.itemElement;
  }
}