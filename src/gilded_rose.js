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

  isSulfuras(item) {
    return item.name === "Sulfuras, Hand of Ragnaros";
  }

  updateQuality() {
    for (let item of this.items) {
      if (!this.isAgedBrie(item) && !this.isBackstagePass(item)) {
        if (item.quality > 0) {
          if (!this.isSulfuras(item)) {
            item.quality--;
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality += 1;
          if (this.isBackstagePass(item)) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality++;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality++;
              }
            }
          }
        }
      }
      if (!this.isSulfuras(item)) {
        item.sellIn--;
      }
      if (item.sellIn < 0) {
        if (!this.isAgedBrie(item)) {
          if (!this.isBackstagePass(item)) {
            if (item.quality > 0) {
              if (!this.isSulfuras(item)) {
                item.quality--;
              }
            }
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
