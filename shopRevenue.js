/**
 * Shopfiy - Shopicruit
 * File: shopRevenue.js
 * Auth: Mohamad Yassine         <mohamad.yassine@carleton.ca>
 * Date: Jan 18 2017
 * Purpose : Apparently I am a successful Shopify merchant, and therefore
 *           I was so busy I forgot to count my orders to figure out my revenue
 *           *cough* So I spent time that I never had, to make a program to get
 *           me the money. I NEED THE JOB PLS!!
 */

var request = require('request'),
    url = 'https://shopicruit.myshopify.com/admin/orders.json?page=1&access_token=c32313df0d0ef512ca64d5b336a0d7c6',
    total_rev = 0

function main() {
  request(url, function(err, res, body) {
    if(!err && res.statusCode == 200) {
      // Here we parse the json file into data
      var products = JSON.parse(body)

      /** 
       * Loop through each order, and get the total_price as seen from
       * https://help.shopify.com/api/reference/order#total-price-property
       */

      products.orders.forEach(function(product) {
        /**
         * NOTE YOU CAN NOT USE parseInt !! 
         * These are decimal values. 
         * Using an int will .. get you a lower revenue and make you depressed 
         * After that you will start question the direction of your life and
         * saying things like "What is my life?" ... Please get help or ....
         * USE parseFloat !!!!!
         */
        total_rev += parseFloat(product.total_price); 

        /* Uncomment for debugging reasons or because you are a total rebel */
        //console.log("Order ID = " +product.id + "  = $" + product.total_price);
      })

      weDoneHere()
    }
  })

  function weDoneHere() {
    console.log("Don't be greedy. Enjoy! Total Revenue = $" + total_rev.toFixed(2) + "!") // fixed 2 for $
  }
}

main()