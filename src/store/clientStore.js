import { makeAutoObservable, toJS } from "mobx"
class ClientStore {
    constructor() {
        makeAutoObservable(this)
    }

    // по дефолту англійська
    currentLang = localStorage.getItem("i18nextLng") || "en"

    formatPrice(price) {
        // Отримуємо цілу та дробову частини
        let integerPart = Math.floor(price);
        let decimalPart = price - integerPart;

        // Форматуємо цілу частину з вставкою коми
        let formattedIntegerPart = integerPart.toLocaleString('en-US');

        // Складаємо цілу та дробову частини разом, зі знаком долара на початку
        let formattedPrice = '$' + formattedIntegerPart;

        if (decimalPart !== 0) {
            // Форматуємо дробову частину з двома знаками після коми
            let formattedDecimalPart = decimalPart.toFixed(2).slice(2);

            // Додаємо дробову частину до ціни
            formattedPrice += '.' + formattedDecimalPart;
        }

        return formattedPrice;
    }

    


}

export default new ClientStore()