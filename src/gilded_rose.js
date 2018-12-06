class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  isAgedBrie(item) {
    return item.name === "Aged Brie";
  }

  isBackstagePass(item) {
    return item.name === "Backstage passes to a TAFKAL80ETC concert";
  }

  isNormalItem(item) {
    return (
      !this.isAgedBrie(item) &&
      !this.isBackstagePass(item) &&
      !this.isConjuredItem(item)
    );
  }

  isConjuredItem(item) {
    return item.name === "Conjured Item";
  }

  removeSulfuras() {
    return this.items.filter(
      item => item.name !== "Sulfuras, Hand of Ragnaros"
    );
  }

  updateQuality() {
    let items = this.removeSulfuras();

    for (let item of items) {
      if (this.isAgedBrie(item)) {
        item.quality < 50 ? item.quality++ : null;
      } else if (this.isBackstagePass(item)) {
        item.quality < 50 ? item.quality++ : null;
        item.sellIn < 11 ? item.quality++ : null;
        item.sellIn < 6 ? item.quality++ : null;
      } else if (this.isConjuredItem(item)) {
        item.quality -= 2;
      } else {
        item.quality--;
      }

      item.sellIn--;

      if (item.sellIn < 0) {
        this.isAgedBrie(item) ? item.quality++ : null;
        this.isBackstagePass(item) ? (item.quality = 0) : null;
        this.isNormalItem(item) && item.quality > 0 ? item.quality-- : null;
        this.isConjuredItem(item) && item.quality > 0
          ? (item.quality -= 2)
          : null;
        item.quality < 0 ? (item.quality = 0) : null;
      }
    }
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
};
