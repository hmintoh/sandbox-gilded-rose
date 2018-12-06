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
      !this.isSulfuras(item)
    );
  }

  removeSulfuras() {
    return this.items.filter(
      item => item.name !== "Sulfuras, Hand of Ragnaros"
    );
  }

  updateQuality() {
    let items = this.removeSulfuras();

    for (let item of items) {
      if (!this.isAgedBrie(item) && !this.isBackstagePass(item)) {
        if (item.quality > 0) {
          item.quality--;
        }
      } else {
        if (item.quality < 50) {
          item.quality += 1;
          if (this.isBackstagePass(item)) {
            if (item.sellIn < 11 && item.quality < 50) {
              item.quality++;
            }
            if (item.sellIn < 6 && item.quality < 50) {
              item.quality++;
            }
          }
        }
      }
      item.sellIn--;

      if (item.sellIn < 0) {
        if (!this.isAgedBrie(item)) {
          if (!this.isBackstagePass(item) && item.quality > 0) {
            item.quality--;
          } else {
            item.quality = 0;
          }
        } else {
          if (item.quality < 50) {
            item.quality++;
          }
        }
      }
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
};
