const mongoose = require('mongoose');
const Beer = require('../mdoels/Beers');
const User = require('../mdoels/Users');

mongoose.connect('mongodb://localhost/beer-project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const beerData = [
    {
    "name": "Electric India",
    "tagline": "Vibrant Hoppy Saison.",
    "first_brewed": "05/2013",
    "price":2,
    "description": "Re-brewed as a spring seasonal, this beer – which appeared originally as an Equity Punk shareholder creation – retains its trademark spicy, fruity edge. A perfect blend of Belgian Saison and US IPA, crushed peppercorns and heather honey are also added to produce a genuinely unique beer.",
    "image_url": "https://images.punkapi.com/v2/6.png"
    },
    {
    "name": "Berliner Weisse With Yuzu - B-Sides",
    "tagline": "Japanese Citrus Berliner Weisse.",
    "first_brewed": "11/2015",
    "price":1,
    "description": "Japanese citrus fruit intensifies the sour nature of this German classic.",
    "image_url": "https://images.punkapi.com/v2/keg.png"
    },
    {
    "name": "Pilsen Lager",
    "tagline": "Unleash the Yeast Series.",
    "first_brewed": "09/2013",
    "price":1,
    "description": "Our Unleash the Yeast series was an epic experiment into the differences in aroma and flavour provided by switching up your yeast. We brewed up a wort with a light caramel note and some toasty biscuit flavour, and hopped it with Amarillo and Centennial for a citrusy bitterness. Everything else is down to the yeast. Pilsner yeast ferments with no fruity esters or spicy phenols, although it can add a hint of butterscotch.",
    "image_url": "https://images.punkapi.com/v2/4.png"
    },
    {
    "name": "Bramling X",
    "tagline": "Single Hop IPA Series - 2011.",
    "first_brewed": "01/2011",
    "price":0.76,
    "description": "Good old Bramling Cross is elegant, refined, assured, (boring) and understated. Understated that is unless you hop the living daylights out of a beer with it. This is Bramling Cross re-invented and re-imagined, and shows just what can be done with English hops if you use enough of them. Poor Bramling Cross normally gets lost in a woeful stream of conformist brown ales made by sleepy cask ale brewers. But not anymore. This beer shows that British hops do have some soul, and is a fruity riot of blackberries, pears, and plums. Reminds me of the bramble, apple and ginger jam my grandmother used to make.",
    "image_url": "https://images.punkapi.com/v2/10.png",
    },
    {
    "name": "Alpha Dog",
    "tagline": "Existential Red Ale.",
    "first_brewed": "02/2010",
    "price":0.88,
    "description": "A fusion of caramel malt flavours and punchy New Zealand hops. A session beer you can get your teeth into.",
    "image_url": "https://images.punkapi.com/v2/14.png"
    } 
]

Beer.insertMany(beerData)
.then((data) => console.log(data, " ADDED!!!"))
.catch(err => console.log(err))

