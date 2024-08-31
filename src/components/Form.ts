import { EventEmitter, IEvents } from "./EventEmitter";

export interface IForm extends IEvents {
	buttonText: string;
	placeholder: string;
	render(): HTMLFormElement;
	setValue(data: string): void;
	getValue(): string;
	clearValue(): void;
}

export interface IFormConstructor {
    new (formTemplate: HTMLTemplateElement): IForm;
}

export class Form extends EventEmitter implements IForm{
	protected formElement: HTMLFormElement;
	protected inputField: HTMLInputElement;
	protected handleFormSubmit: Function;
	protected submitButton: HTMLButtonElement;
	
	// конструктор принимает саму форму - та, которая есть в разметке - это дает возможность использовать другую форму
	constructor(formTemplate: HTMLTemplateElement) {
		super();
		this.formElement = formTemplate.content
			.querySelector('.todos__form')
			.cloneNode(true) as HTMLFormElement;
		this.inputField = this.formElement.querySelector('.todo-form__input');
		this.submitButton = this.formElement.querySelector(
			'.todo-form__submit-btn'
		);
		this.formElement.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this.emit('submit', {value: this.inputField.value});
		});
	}

	// выводит разметку на страницу
	render() {
		return this.formElement;
	}

	// записывает данные(в виде строки) в поля ввода формы
	setValue(data: string) {
		this.inputField.value = data;
	}

	// получает данные из полей ввода формы
	getValue() {
		return this.inputField.value;
	}

	// очищает форму от данных
	clearValue() {
		this.formElement.reset();
	}

  //  устанавливает текст кнопки
	set buttonText(data: string) {
		this.submitButton.textContent = data;
	}

	set placeholder(data: string) {
		this.inputField.placeholder = data;
	}
}
