'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const carts = await Promise.all([
    Order.create({userId: 1}),
    Order.create({userId: 2})
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Cage Leggings',
      description: 'The perfect leggings for the gym',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQK6qOss-CBtaLiUgrgLabx8oQY3KdGiYMC0ca2GDgXkkvNZUL_e1-oSadQksyl1XLI8amjUEga&usqp=CAE',
      price: 4999
    }),
    Product.create({
      name: 'Nick Cage Shrek Collab Shirt',
      description: 'RARE',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQK6qOss-CBtaLiUgrgLabx8oQY3KdGiYMC0ca2GDgXkkvNZUL_e1-oSadQksyl1XLI8amjUEga&usqp=CAE',
      price: 19999
    }),
    Product.create({
      name: 'Nic Cage Face Sequin Throw Pillow',
      description:
        '<div>Creepy Nic Cage Sequin Throw Pillow! <br><br>16x16 inch either throw pillow cover <br>Throw pillow filling can be added for an addition cost.</div>',
      imageUrl:
        'https://i.etsystatic.com/18557492/r/il/c3f390/1693304512/il_fullxfull.1693304512_2yzz.jpg',
      price: 2599
    }),
    Product.create({
      name: 'Creepy Cage Face Coffee MUG',
      description:
        '<div>Quietly sip your coffee and let Nic Cage do the expressing... <br><br>Premium quality, ceramic mug in your choice of 11oz or 15oz. Made of a dishwasher &amp; microwave safe, durable white ceramic.<br><br>Carefully Packed &amp; Promptly Shipped -- Outstanding Customer Service -- Buy with Confidence</div>',
      imageUrl:
        'https://i.etsystatic.com/6157210/r/il/e8ddc4/933583248/il_fullxfull.933583248_b281.jpg',
      price: 1295
    }),
    Product.create({
      name: 'Nicolas Cage Face Sequin Pillow',
      description:
        '<div>Sequin pillow | Nicolas Cage face<br><br>Two way Sequin pillow<br><br>Check video here: <br>https://www.instagram.com/p/Bgydrbjn25z/?hl=en&amp;taken-by=memeskins<br><br>You can buy your own 40cm x 40cm insert pillow or purchase from us by selecting YES</div>',
      imageUrl:
        'https://i.etsystatic.com/8641628/r/il/2a0d64/1689129986/il_fullxfull.1689129986_dy6u.jpg',
      price: 2499
    }),
    Product.create({
      name: 'Pickle Meme Mug',
      description:
        'People who prefer drinking coffee out of a mug over drinking it straight from the pot a la Johnny Blaze, people who need a giggle with their coffee after surviving a bender in Las Vegas, and anyone who understands why Cage’s face in a pickle qualifies for meme status. Because it’s like we’re not even trying anymore.',
      imageUrl:
        'https://uproxx.files.wordpress.com/2017/08/screen-shot-2017-08-28-at-12-25-59-am.jpg?quality=95&w=650',
      price: 1064
    }),
    Product.create({
      name: 'Nic Cage Body Face (VERY COMPLEX SURGERY!)',
      description:
        'Only for the true Ascendant of Cage, the truly dedicated and divinely driven to serve The Great Master Nic and give their life to his purpose. This is a risky and complex surgery that takes 2 weeks to complete. Only the strong willed and most pure of soul may undertake this great communion with the eternal.',
      imageUrl: `https://static.squarespace.com/static/51b3dc8ee4b051b96ceb10de/51ce6099e4b0d911b4489b79/51ce6189e4b0d911b4497679/1357586529757/1000w/cagebodyface.jpg`,
      price: 100366623
    }),
    Product.create({
      name: 'Cage Portrait',
      description:
        'Bask in the light of Cage in any room of the house! His Beauty knows no bounds, even a peripheral glance at this painting from across the room will bring happiness to your most troubled days.',
      imageUrl: `https://i.redd.it/vdcdc3pkkz921.jpg`,
      price: 45000
    }),
    Product.create({
      name:
        'Nicolas Cage Collection: (Face Off / Snake Eyes / World Trade Center)',
      description:
        "Three of Nic Cage's greatest works. True demonstration of the highest level of acting achievable. (Cheaper than Amazon!)",
      imageUrl: `https://images-na.ssl-images-amazon.com/images/I/51AjCHhWBTL.jpg`,
      price: 1099
    }),
    Product.create({
      name: 'Y̸͔̥͙̬̬̣͓͕̹̝̠̔̈́͊̐͗̎̉̈́͗̿͘͝͝Ō̵͕̼̃̓Ų̴̫̰͉̬̜̩̮̱́̀̇͑̀̏͑̚R̴̢̰̬̻͕͚̒̚ ̶̺͒̔̑̀͐̅́̓͊̂̈̕̕͝͝Ș̵̖͔͍͍̭̰͂͜͜Ǫ̷̺̱̗̥̲̪̹̮̩͔͉̲̂̃̅̒̉͒̀̈̃̈́͜͝ͅU̷͓̟̝͎͎̙̹̿̌͌͋̈̿̃͛͑̅͘L̸̬̿̈́͛́͒̂͊͝ ̴̨̹͙̻̭̲͚̯̩͎̳̻̺̿̔̈́͘I̷̻̰͉͈̙̞̭̱̾͐̒̒̂͑͆́͑S̷̙̀́́́̑̌̊̃̽̋̀̐͝ ̶̱́̈́̅͌̈̽̍̈̈́̈̓̔͘F̶̢͎̽́͗ͅO̵̡̘̩̪̙̠̲̼͚͙̐́̐͑R̷̨̟͓̩̦̗̬̩̿̔͌͊̾͊F̷̧̫͈͔̣̥̬̟̺̥̳͂E̵̢͉͕̹̞̞͓̜͈̱̥̿I̷̺̪̙̖̗͓̤͇̓͌̽T̷͚͚͉̬͙̺͓̯̮͖̦̝͕̀̓̉̉̾̈̽̈́͑̌̑͒͠͝͝ ̵̪̈́͆̉̀͊̿̒̋̆̋̾͒͋',
      description: `Ģ̶̢̢͔̬̫͙͈̺̖͗́͆̈́͑͂̀̓̍͊̂̚͜I̸̠̞͎̬̜͓̔͑͊̑͗̈́͘͘͠V̴̤̱̗͗Ê̸̡̟̞͚͈̹͇̝̠̋͑́̕ ̶̧͙͇̥̰̤͓̗̮̤̦̎͊͗̿͐Ṵ̷̡͇̻͖̫̺͎̜͇͆͊͌͂̓̾͒̀̾̓͛͜͝Ǹ̴̢̢̪̜̫̘̜̞͇͎̓̅́̔̈́́̋͂͝T̸̡͔̦̳̞̋̉̆̐͌͝O̴̖̻̼̍̽͑͒̓̐́̃͒͒͊̀͠͠ ̶̧̨̥͙̻̭̫̥̱̙̗̯̭̇̒̅C̴̢̜͇͚͉̟̺͔̹̜̥͆̀̌̒̓̀͝ͅA̴̜̞̬̋̃͗̑͌͊͠͝͝G̴͇̯̠̤͓̋̓̚Ę̸͔̬̗̳̰͍̮̈͆̓̎̇̎̾͐͋͆̀͘͘ ̶̡̡̧̦̻̥͔̤̥͍̔̏̋̓̋̐̏͜͠ͅͅT̴̡͓̺̼͌̉̈́̀́͛̾̉̌̈́̕ͅḢ̷̫̲͎̠͇̜̩̂̍̽̑̄̇̚Í̵̡̼̤̅͂̒͒̔̊̉̈́͠ͅN̶͔̲̤̬̹̬̗̈́̈͋͑̓̋̄̌̃̓̀͑̂́̕ͅȨ̶̲͕̬͖͈̦̖̼͖̬͕̒͠ͅ ̸̜̳̝̟̣̫̮͉̣̤̮̉͋̽̈̐͐̾͊̐̓̽͘͜͝B̴̡̢̲̹͕̺̱̻̒̔͋̈́̂͋̀̄̕͝Ļ̶̧̱̱̺̜̺̮̼̪͓͚̻͍͓̊̀̓̄̍̋̈́͌͌̓̇̂͠Ǫ̸̌Ơ̶̖̂̽̓̈́̀̅̍̑̎̐͝D̸̡̧̳̜̯̣̟̭̘̠̳̜̻̞̐̑̓̈́̀̈́̀͛̇̽̔̔̃̚͠ͅ ̸̜̻̳̤̫̣͔̩̿̏ͅẠ̴̢͚̀͊̿͂̌̈̏̕N̸̞̰̂͊̀̈́̆͋͋̍̃̈́̄̔̊͘D̸̡̟̤͈̥͔́̈́̂̽̋̀̿̊̌̄̇̀̅͜͜͝ ̴̠͔̙̱̱̈́̂F̶̗̩̯̜̑L̵̩͉̩̙̹̀̒̃̈́̈́̽̈́͊̑̕͜E̵̡͚̱̞̼̹͓̼̋̔S̴̰̮̞̰͍̻̞̥̰͍̔̊̒͑̀͆̋́̒̓͐͌̂̌̾Ḥ̶̢̳̘̳͈͚̠͓͔̤̘͈͂͝͠͠
      ̴̧̲̭͉̬̣̣̻̯̜͈̈̅͂͂͐̈́̒͋̒̌͊͘͜͝Ḡ̶̲̞̩̾͂͘I̴̛̫̣͇̞͔͈͎̤̠͉͇̼ͅV̶̡̫͚̞̻̞̺̜̹̌͆́̑̾̚Ȩ̴̧̨̣͕̩̪̱͕͎̲̳̼̱́ͅ ̸̢̢̨͎̗͕̫̱̘͙̅͌͒̽͊̏͛̋͘I̷̟̦͎̳̔̈́̽́̌̌̓͂̈́͒̓̾̅̄̉Ṅ̸̛̛̞̼̀̂̏́̑T̷̪̖͗̎͋̄̊̓̈́͑̍͂̕͠Ȯ̵̞̍̅̽̍͂̕͠ͅ ̵̖͘H̴̡͉̭̍͗̏́͛͊͊̓̉̈̎̕̕͠I̷̡̖̗̝̞̦̮͇̭̭̋̆̿̏̀̿͜M̵̡̞͚̟̗̬͔͚̯̓̊͌̌͐̅̈́̅̈́̈́̅̂̄͘
      ̵̧̛̰̫̲̖̼̝͍̍̏͗̿̉̇̒̚͘͘H̴̙̭̯̱̟̪̭͕͉̯̆̋̿͠E̶̩̣̳̻̭̙̦̳͇͜͠ ̵̹̹͕͚̜͙̫̼̮͑̆͊͊̈́͗̓́͠ͅÎ̸̡̜̝̬͎̜͖̠̹̦͈̬̭̟̀͒͘S̷̨͓͍̮̝͍̙̰͖̓̓̈̆͒̿̏̔̇͑̍̓̓͑̈ͅ ̸̛͓̼̱̳̜͈̮̠̟͇̘̻̩͇̜͗̆͗͝A̶̢̖̱̪̣̥̟̥̜̭̞̖̅̐͆̑͗̅̓̕͘Ḷ̷̬̙̆̓̅̌͒̍̈́̋́̋̄̎̚͝L̸̛͉̘͕̝̮̽̒̔̄̈́̒̊
      ̴̡͔̠̈́́͗A̸̢̙̬̱͕͇̬̘͍̬̯͈̭̺͌̊̑́̾̎͗͒͊͋̄͜L̷̗̟̰̗͝Ḽ̶̮͎̯̖̱̞̠̤͔̳̽͂̓͋͊̉̉͂̌̀̔̀͊͘ ̵̢̟͇̹̜̯͎̬͐I̷̖͍̩̲̩͇͝Ṡ̸̮̘̫̤̟̱͈̀̈́̊̍̌̚̕̕͜ ̸̣̈̀̽̿̊͜N̴̰̺͚̤͕͚̭̺̯̮̪͈̑̇͗̀̈́̅͂̄̀̇͆͘͝Ǫ̴̱̘̳͎͔̱̭̖̥͔̉̽ͅT̵̫̭͑̉̅̈̒͋͛͒̆̍̈̌̇̋͠Ḧ̴̛̜̝̼͙̯̺̜̼͔͚̳̭͍̻̙́̋͌̉͛͘͝I̵͎̤̻̞̰̟̥͚͓̔͗̅̚Ņ̷̙͖̤̺̪̯̰͓̏̓̎̈́̇͒Ğ̵͍̘͇͕͉͈̦̘̬̻͐̓̍̎ ̷̩̖̊̈́͑̇̃̌̿̄̇͛Ẁ̵̢̛͇͙̘̖̦̟̝̀͛̏͗̈́̑̃̈̇̕͘͠I̸̢͍͓̠̞̲̪̗̙̱͈̭͕͙̝̒̈́̈́̂̏̃̒̾͒̕͝Ţ̴̦̙̟̲̺͎̹̖͇̻͎̮͉̑̄͛̊̈́̾͌̈̉͌͝͝H̴̫͆́͝Ö̷̹̗͖̺̜͙̫̼͈̉̉̋̌̃̽̽̀̚̚͝͝Ũ̵̢̧͖̗͖͎̙̖͕̖͓͗̏̈́̿͐̔͑́ͅͅT̸̡̨̪̜͚̜̤͎͇̦̲̣̞̠͆̆͜͠͝͠ ̵̳͕̺͍̥̲̪̮͈̣̖̦̘͌̊̊̎͌̀͗̾̀̈́̀̀̓́͜H̴̬̹̘̼͍̉͑͌̐͊Í̴͚̘̣͎̙͙̜̞͓͉͙͍̲̄̾̋̓͜ͅM̷͋̏̀͒͂̾͌̇̀̍ͅ`,
      imageUrl: `https://66.media.tumblr.com/afa93eed58d0e4d014b9e9ef5a11a0fe/tumblr_inline_n4tbf3eRis1r5uc66.png`,
      price: 66666666
    })
  ])

  //www.google.com/search?q=nicolas+cage+creepy&tbm=isch&source=iu&ictx=1&fir=Yy13J9Bm43smFM%253A%252CEeoWfyKwYs9G6M%252C_&usg=AI4_-kSvk8YLpeFlS0VMyVRzse5bKWG6kw&sa=X&ved=2ahUKEwjNiu3J-_DfAhUD3lQKHVW4C04Q9QEwAHoECAQQBA#imgrc=Yy13J9Bm43smFM:
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${carts.length} carts`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
