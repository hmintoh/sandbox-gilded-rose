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

  isAgedBrie(i) {
    return this.items[i].name === "Aged Brie";
  }

  isBackstagePass(i) {
    return this.items[i].name === "Backstage passes to a TAFKAL80ETC concert";
  }

  isSulfuras(i) {
    return this.items[i].name === "Sulfuras, Hand of Ragnaros";
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (!this.isAgedBrie(i) && !this.isBackstagePass(i)) {
        if (this.items[i].quality > 0) {
          if (!this.isSulfuras(i)) {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.isBackstagePass(i)) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (!this.isSulfuras(i)) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (!this.isAgedBrie(i)) {
          if (!this.isBackstagePass(i)) {
            if (this.items[i].quality > 0) {
              if (!this.isSulfuras(i)) {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
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
