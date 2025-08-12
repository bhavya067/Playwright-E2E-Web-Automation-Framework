export const mobileLocators = {
  phonesTab: "//a[text() ='Phones']",
  phoneModels: '//div[@id="tbodyid"]//div//h4/a',
  addToCartBtn: "//a[normalize-space()='Add to cart']",
  cartLinkOnPageTop: "//a[text()='Cart']"
};

export function getProductLocator(productName) {
    return `//a[normalize-space()='${productName}']`;
}

export function getProductLocatorInCart(productName) {
    return `//td[normalize-space()='${productName}']`;
}