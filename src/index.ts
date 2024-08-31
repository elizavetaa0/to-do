import { Form } from "./components/Form"
import { Item } from "./components/Item"
import { Page } from "./components/Page"
import { Popup } from "./components/Popup"
import { ToDoModel } from "./components/ToDoModel"
import { ItemPresenter } from "./components/ToDoPresenter"
import "./styles/styles.css"
import { todos } from "./utils/constants"

const contentElement = document.querySelector('.content') as HTMLElement;

const popupElement = document.querySelector('.popup') as HTMLElement;

// создаем страницу
const itemContainer = new Page(contentElement)

// создаем модель и первоначально ее наполняем
const todoArray = new ToDoModel();
todoArray.items = todos;

const modal = new Popup(popupElement);

// создаем презентер
const itemPresenter = new ItemPresenter(todoArray, Form, itemContainer, Item, modal);

itemPresenter.init();
itemPresenter.renderView();
