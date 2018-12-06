const {Shop, Item} = require("../src/gilded_rose.js");

describe("Gilded Rose", () => {
  it("should degrade the quality twice as fast, after sell by date", () => {
    const shop = new Shop([new Item("Normal Item", 0, 5)]);
    const items = shop.updateQuality();
    expect(items[0]).toEqual(new Item("Normal Item", -1, 3));
  });

  it("should not decrease an item's quality below zero", () => {
    const shop = new Shop([new Item("normal item", 0, 0)]);
    const item = shop.updateQuality();
    expect(item[0]).toEqual(new Item("normal item", -1, 0));
  });

  it("should increase the quality of 'Aged Brie' the older it gets", () => {
    const shop = new Shop([new Item("Aged Brie", 1, 0)]);
    const item = shop.updateQuality();
    expect(item[0]).toEqual(new Item("Aged Brie", 0, 1));
  });

  it("should not increase an item's quality above 50", () => {
    const shop = new Shop([new Item("Aged Brie", 1, 50)]);
    const item = shop.updateQuality();
    expect(item[0]).toEqual(new Item("Aged Brie", 0, 50));
  });

  it("should not decrease or increase the sell in or quality of Sulfuras a legendary item with quality < 50 ", () => {
    const shop = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 49)]);
    const item = shop.updateQuality();
    expect(item[0]).toEqual(new Item("Sulfuras, Hand of Ragnaros", 10, 49));
  });

  it("should not decrease or increase the sell in or quality of Sulfuras a legendary item with quality > 50", () => {
    const shop = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 66)]);
    const item = shop.updateQuality();
    expect(item[0]).toEqual(new Item("Sulfuras, Hand of Ragnaros", 10, 66));
  });

  it("should increase the quality of 'Backstage passes' by 2, 10 - 6 days before the concert", () => {
    const shop = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 8, 30)
    ]);
    const item = shop.updateQuality();
    expect(item[0]).toEqual(
      new Item("Backstage passes to a TAFKAL80ETC concert", 7, 32)
    );
  });

  it("should increase the quality of 'Backstage passes' by 2, 9  days before the concert", () => {
    const shop = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 30)
    ]);
    const item = shop.updateQuality();
    expect(item[0]).toEqual(
      new Item("Backstage passes to a TAFKAL80ETC concert", 8, 32)
    );
  });

  it("should increase the quality of 'Backstage passes' by 3, 5 days before the concert", () => {
    const shop = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 30)
    ]);
    const item = shop.updateQuality();
    expect(item[0]).toEqual(
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 33)
    );
  });

  it("should increase the quality of 'Backstage passes' by 3, 5 - 1 day before the concert", () => {
    const shop = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 30)
    ]);
    const item = shop.updateQuality();
    expect(item[0]).toEqual(
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 33)
    );
  });

  it("should decrease the quality of 'Backstage passes' to 0, after the concert", () => {
    const shop = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 30)
    ]);
    const item = shop.updateQuality();
    expect(item[0]).toEqual(
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0)
    );
  });

  it("should decrease the quality of 'conjured' twice as fast as normal items before expiry", () => {
    const shop = new Shop([new Item("Conjured Item", 8, 30)]);
    const item = shop.updateQuality();
    expect(item[0]).toEqual(new Item("Conjured Item", 7, 28));
  });

  it("should decrease the quality of 'conjured' twice as fast as normal items after expiry", () => {
    const shop = new Shop([new Item("Conjured Item", 0, 30)]);
    const item = shop.updateQuality();
    expect(item[0]).toEqual(new Item("Conjured Item", -1, 26));
  });
});
