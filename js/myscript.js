// JavaScript Document

$(document).ready( function() {
    $("#total").val("3126.33");
    $("#amount").val("Brutto1");
    $("#amountb").val("Netto");
    $("#razred1").val("WTF");
    $("#razred2").val("WTF");
    $("#razred3").val("WTF");
    $("#prirez").val("WTF");
    $("#mirovinsko").val("WTF");

    // Globalne varijable
    // koeficijenti
	mirovinskoPrviStup = 0.15;
    mirovinskoDrugiStup = 0.05;
    zdravstvenoOsiguranje = 0.15;
    ozljedaNaRadu = 0.005;
    zaposljavanje = 0.017;
	prviRazred = 0.12;
    drugiRazred = 0.25;
    treciRazred = 0.40;
    prirezZagreb = 0.18;

	// iznosi i raspon poreznih razreda
	odbitak = 2600;
    prviRazredRaspon = 2200;
    drugiRazredRaspon = 11000;
    treciRazredGranica = prviRazredRaspon + drugiRazredRaspon


	// izracunaj neto iz bruto
	function brutto2Netto(brutto,izbor){
		// izbor je = 0 vrati netto, 1 vrati porez1, 2 vrati porez2, 3 vrati porez3
		// deklaracija varijabli
		var iznosPorez1 = 0;
		var iznosPorez2 = 0;
		var iznosPorez3 = 0;
		
		// deklaracija izracuna
		var iznosMirovinsko = brutto * (mirovinskoPrviStup + mirovinskoDrugiStup);
		var poreznaOsnovica = brutto - iznosMirovinsko - odbitak
	
		if (poreznaOsnovica <= prviRazredRaspon) {
			if (poreznaOsnovica > 0) {
				iznosPorez1 = poreznaOsnovica * prviRazred;
			}
        	}
		else if (poreznaOsnovica <= treciRazredGranica) {
			iznosPorez1 = prviRazredRaspon * prviRazred;
			iznosPorez2 = (poreznaOsnovica - prviRazredRaspon) * drugiRazred;
		}
		else {
			iznosPorez1 = prviRazredRaspon * prviRazred;
			iznosPorez2 = drugiRazredRaspon * drugiRazred;
			iznosPorez3 = (poreznaOsnovica - treciRazredGranica) * treciRazred;
		}
		var iznosPorez = iznosPorez1 + iznosPorez2 + iznosPorez3;
		var iznosPrirez = iznosPorez * prirezZagreb;
		var netto = brutto - iznosMirovinsko - iznosPorez - iznosPrirez;
		switch (izbor){
			case 0:
				return netto;
			case 1:
				return iznosPorez1;
			case 2:
				return iznosPorez2;
			case 3:
				return iznosPorez3;
			case 4:
				return iznosPrirez;
			case 5:
				return iznosMirovinsko;
			default:
				return netto;
		}
	}

	// izracun bruto u bruto2
    function brutto2Brutto2(brutto){

		var iznosZdravstveno = brutto * zdravstvenoOsiguranje;
		var iznosOzljeda = brutto * ozljedaNaRadu;
		var iznosZaposljavanje = brutto * zaposljavanje;

		var bruttoDva = +brutto + iznosZdravstveno + iznosOzljeda + iznosZaposljavanje;
		return bruttoDva;
    }

	// izracun neto u bruto
    function netto2Brutto(netto){
         if (netto <= 4488.48) {

               var brutto = (netto - prviRazred*odbitak - prviRazred*odbitak*prirezZagreb)/((1 - mirovinskoPrviStup - mirovinskoDrugiStup) - prviRazred * (1 - mirovinskoPrviStup - mirovinskoDrugiStup) - prviRazred*prirezZagreb*(1 - mirovinskoPrviStup - mirovinskoDrugiStup))
         }

         else if (netto <= 12243.48){
               var brutto = (netto - drugiRazred*(odbitak + prviRazredRaspon) + prviRazred*prviRazredRaspon - prirezZagreb* drugiRazred*(odbitak + prviRazredRaspon) + prirezZagreb*prviRazred*prviRazredRaspon)/((1 - mirovinskoPrviStup - mirovinskoDrugiStup) - drugiRazred* (1 - mirovinskoPrviStup - mirovinskoDrugiStup ) - prirezZagreb*drugiRazred* (1 - mirovinskoPrviStup - mirovinskoDrugiStup ))
         	}
         else {

               var brutto = (netto - treciRazred*(odbitak + prviRazredRaspon + drugiRazredRaspon) + prviRazred*prviRazredRaspon + drugiRazred*drugiRazredRaspon - prirezZagreb*treciRazred*(odbitak + prviRazredRaspon + drugiRazredRaspon) + prirezZagreb*prviRazred*prviRazredRaspon + prirezZagreb*drugiRazred*drugiRazredRaspon)/((1 - mirovinskoPrviStup - mirovinskoDrugiStup) - treciRazred*(1 - mirovinskoPrviStup - mirovinskoDrugiStup ) - prirezZagreb*treciRazred*(1 - mirovinskoPrviStup - mirovinskoDrugiStup ))
         }
	return brutto;
    }

    $( function() {

        $("#slider").slider({

	   min: 2670,
	   max: 38110,
	   step: 10,
	   value: 2670,
            slide: function(event, ui) {

                $("#price").val(ui.value);
            	var brutto = $("#price").val();
		var netto = brutto2Netto(brutto,0);
		var bruttoDva = brutto2Brutto2(brutto);
		var iznosporez1 = brutto2Netto(brutto,1);
		var iznosporez2 = brutto2Netto(brutto,2);
		var iznosporez3 = brutto2Netto(brutto,3);
		var iznosprirez = brutto2Netto(brutto,4);
		var iznosmirovinsko = brutto2Netto(brutto,5);

                $("#total").val(bruttoDva.toFixed(2));
		$("#sliderb").slider('value', netto);
		$("#priceb").val(netto);
		$("#razred1").val(iznosporez1.toFixed(2));	
		$("#razred2").val(iznosporez2.toFixed(2));	
		$("#razred3").val(iznosporez3.toFixed(2));	
		$("#prirez").val(iznosprirez.toFixed(2));	
		$("#mirovinsko").val(iznosmirovinsko.toFixed(2));	
            }
        });

        $("#sliderb").slider({
            value: 2200,
            min: 2200,
            max: 20000,
            step: 10,
            slide: function(event, ui) {
		 $("#priceb").val(ui.value); 
		  var netto = $("#priceb").val();
		  var brutto = netto2Brutto(netto);
                  var bruttoDva = brutto2Brutto2(brutto)

		  $("#total").val(bruttoDva.toFixed(2));
		  $("#slider").slider('value', brutto);
                  $("#price").val(brutto);
            }
        });
	// KEYPRESS ACTIONS
        $("#price").keyup(function () {
        	$("#slider").slider("value", this.value);
	        var brutto = this.value;
                var netto = brutto2Netto(brutto);
                var bruttoDva = brutto2Brutto2(brutto)

                $("#total").val(bruttoDva.toFixed(2));
                $("#sliderb").slider('value', netto);
                $("#priceb").val(netto);	
        });

        $("#priceb").keyup(function () {
        	$("#sliderb").slider("value", this.value);
                  var netto = this.value;
                  var brutto = netto2Brutto(netto);
                  var bruttoDva = brutto2Brutto2(brutto)

                  $("#total").val(bruttoDva.toFixed(2));
                  $("#slider").slider('value', brutto);
                  $("#price").val(brutto);
        });

	// DEFAULT VALUES
        $("#price").val('$' + $("#slider").slider("value"));
        $("#priceb").val('$' + $("#sliderb").slider("value"));

        $("#price").val("2667.52");
        $("#priceb").val("2200");

    }
    );

});

/* matematika
                // x = (brutto (1 - mirovinskoPrviStup - mirovinskoDrugiStup ) - odbitak)
                // var netto = brutto * (1 - mirovinskoPrviStup - mirovinskoDrugiStup) - prviRazred*(brutto (1 - mirovinskoPrviStup - mirovinskoDrugiStup ) - odbitak) - prviRazred*(brutto (1 - mirovinskoPrviStup - mirovinskoDrugiStup ) - odbitak)*prirezZagreb
/*porez2*/      // var netto = brutto * (1 - mirovinskoPrviStup - mirovinskoDrugiStup) - drugiRazred*((brutto (1 - mirovinskoPrviStup - mirovinskoDrugiStup ) - odbitak)-prviRazredRaspon) - prviRazred*prviRazredRaspon
/*porez3*/      // var netto = brutto * (1 - mirovinskoPrviStup - mirovinskoDrugiStup) - treciRazred*((brutto (1 - mirovinskoPrviStup - mirovinskoDrugiStup ) - odbitak)-prviRazredRaspon-drugiRazredRaspon) - prviRazred*prviRazredRaspon - drugiRazred*drugiRazredRaspon


                // var netto = brutto * (1 - mirovinskoPrviStup - mirovinskoDrugiStup) - prviRazred* brutto * (1 - mirovinskoPrviStup - mirovinskoDrugiStup) + prviRazred*odbitak - prviRazred* brutto*prirezZagreb * (1 - mirovinskoPrviStup - mirovinskoDrugiStup) + prviRazred*odbitak*prirezZagreb
                // var netto = brutto * ((1 - mirovinskoPrviStup - mirovinskoDrugiStup) - prviRazred* brutto * (1 - mirovinskoPrviStup - mirovinskoDrugiStup) - prviRazred* brutto*prirezZagreb * (1 - mirovinskoPrviStup - mirovinskoDrugiStup)) + prviRazred*odbitak + prviRazred*odbitak*prirezZagreb

                // bez prireza var netto = brutto * (1 - mirovinskoPrviStup - mirovinskoDrugiStup) - drugiRazred*((brutto (1 - mirovinskoPrviStup - mirovinskoDrugiStup ) + drugiRazred*odbitak + drugiRazred*prviRazredRaspon  - prviRazred*prviRazredRaspon

                // skraceno porez2   var netto = brutto * (1 - mirovinskoPrviStup - mirovinskoDrugiStup) - drugiRazred*brutto* (1 - mirovinskoPrviStup - mirovinskoDrugiStup ) + drugiRazred*(odbitak + prviRazredRaspon) - prviRazred*prviRazredRaspon

                // bez prireza p3 var netto = brutto * (1 - mirovinskoPrviStup - mirovinskoDrugiStup) - treciRazred*brutto*(1 - mirovinskoPrviStup - mirovinskoDrugiStup ) + treciRazred*(odbitak + prviRazredRaspon + drugiRazredRaspon) - prviRazred*prviRazredRaspon - drugiRazred*drugiRazredRaspon




                // porez2 s prirez var netto - drugiRazred*(odbitak + prviRazredRaspon) + prviRazred*prviRazredRaspon - prirezZagreb* drugiRazred*(odbitak + prviRazredRaspon) + prirezZagreb*prviRazred*prviRazredRaspon = brutto * ((1 - mirovinskoPrviStup - mirovinskoDrugiStup) - drugiRazred* (1 - mirovinskoPrviStup - mirovinskoDrugiStup ) - prirezZagreb*drugiRazred* (1 - mirovinskoPrviStup - mirovinskoDrugiStup ))

                // porez3 s prirez var netto - treciRazred*(odbitak + prviRazredRaspon + drugiRazredRaspon) + prviRazred*prviRazredRaspon + drugiRazred*drugiRazredRaspon - prirezZagreb*treciRazred*(odbitak + prviRazredRaspon + drugiRazredRaspon) + prirezZagreb*prviRazred*prviRazredRaspon + prirezZagreb*drugiRazred*drugiRazredRaspon = brutto* ((1 - mirovinskoPrviStup - mirovinskoDrugiStup) - treciRazred*(1 - mirovinskoPrviStup - mirovinskoDrugiStup ) - prirezZagreb*treciRazred*(1 - mirovinskoPrviStup - mirovinskoDrugiStup ))

