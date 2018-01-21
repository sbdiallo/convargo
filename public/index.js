'use strict';

//list of truckers
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL steps
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

//console.log(truckers);
//console.log(deliveries);
//console.log(actors);


////////////////////////////////////////////////////////////////////////////////******** Step 1 *****/////////////////////////////////////////////////////////////////////////////////////////////

for (var j = 0, l = deliveries.length; j < l; j++) {   
        var truck = truckers.find(function(component) {return component.id == deliveries[j].truckerId ;});
	deliveries[j].price= truck.pricePerKm * deliveries[j].distance + truck.pricePerVolume * deliveries[j].volume; 
}
//console.log(deliveries);

////////////////////////////////////////////////////////////////////////////////******* Step 2 ******/////////////////////////////////////////////////////////////////////////////////////
for (var j = 0, l = deliveries.length; j < l; j++) { 
  
        var truck = truckers.find(function(component) {return component.id == deliveries[j].truckerId ;});
	deliveries[j].price= truck.pricePerKm * deliveries[j].distance + truck.pricePerVolume * deliveries[j].volume;	

	if ( deliveries[j].volume > 5){
		
		deliveries[j].price = 0.9 * deliveries[j].price;
	
	}
	
	if ( deliveries[j].volume > 10){
		
		deliveries[j].price = 0.7 * deliveries[j].price;
	
	}

	
	if ( deliveries[j].volume > 25){
		
		deliveries[j].price = 0.5 * deliveries[j].price;
	
	}
}
//console.log(deliveries);


//////////////////////////////////////////////////////////////////////////////***step 3****///////////////////////////////////////////////////////////////////////////

for (var j = 0, l = deliveries.length; j < l; j++) { 
  
       
	var com = 0.3 * deliveries[j].price;	
	var reste = com * 0.5 ;

	deliveries[j].commission.insurance = com * 0.5;
	deliveries[j].commission.treasury = deliveries[j].distance / 500;
	deliveries[j].commission.convargo = reste - deliveries[j].commission.treasury;

	
}

console.log(deliveries);


//////////////////////////////////////////////////////////////////////////////***step 4 ****///////////////////////////////////////////////////////////////////////////

/*
for (var j = 0, l = deliveries.length; j < l; j++) { 

	
	deliveries[j].options.deductile_reduction = 0;

	if ( deliveries[j].options.deductibleReduction == true){
	
		 deliveries[j].options.deductile_reduction =  deliveries[j].volume;
		 deliveries[j].price =  deliveries[j].price +  deliveries[j].options.deductile_reduction;

	}

      
}	
console.log(deliveries);

*/
//////////////////////////////////////////////////////////////////////////////*** step 5 ****///////////////////////////////////////////////////////////////////////////

/*
for (var j = 0, l = actors.length; j < l; j++) {   
	
       //var truck = truckers.find(function(component) {return component.id == deliveries[j].truckerId ;});
       //deliveries[j].price= truck.pricePerKm * deliveries[j].distance + truck.pricePerVolume * deliveries[j].volume; 

       var delivery = deliveries.find(function(component) {return component.id == actors[j].deliveryId ;});

       var len = actors[j].payment.length;

       for ( var i = 0; i < len; i++){
		
		
		if ( actors[j].payment[i].who == 'shipper' ) {

			 actors[j].payment[i].amount = delivery.price;

		}


		if ( actors[j].payment[i].who == 'trucker' ) {
			
			 var variable =  delivery.options.deductile_reduction;

			 actors[j].payment[i].amount = (delivery.price - variable ) * 0.7;
 
		}

		
		if ( actors[j].payment[i].who == 'insurance' ) {

			 actors[j].payment[i].amount = delivery.commission.insurance;

		}

		
		if ( actors[j].payment[i].who == 'treasury' ) {

			 actors[j].payment[i].amount = delivery.commission.treasury;

		}


		
		if ( actors[j].payment[i].who == 'convargo' ) {

		         var variable =  delivery.options.deductile_reduction;

			 actors[j].payment[i].amount = delivery.commission.convargo + variable;

		}
		

       }
   
}	
console.log(actors);
*/

////////////////////////////////////////////////////////////////// *** FIN  ***///////////////////////////////////////////////////////////////////////////////////////






















