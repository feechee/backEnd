import { faker } from '@faker-js/faker';
faker.locale = 'es';

function generarProducto() {
    return {
        title: faker.commerce.productName(),
        price: faker.finance.amount(), 
        thumbnail: faker.image.cats(100, 100, true)
    }
}

export { generarProducto };