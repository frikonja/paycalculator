// JavaScript Document

$(document).ready( function() {
    $("#total").val("3223.00");
    $("#amount").val("Brutto1");
    $("#amountb").val("Netto");
    
    function brutto2Netto(brutto){
         var prviStupPerc = 0.15;
         var drugiStupPerc = 0.05;
         var izBrutaPerc = 0.20;
         var prirezPerc = 0.18;
         var olaksica = 2200;
         var porezJedan = 0;
         var porezDva = 0;
         var porezTri = 0;
         var prviStup = brutto*prviStupPerc;
         var drugiStup = brutto*drugiStupPerc;
         var mirovinsko = brutto * (prviStupPerc + drugiStupPerc)
         var dohodak = brutto - mirovinsko - olaksica;
         if (dohodak <= 2200) {
                 porezJedan = dohodak * 0.12;
         }
         else if (dohodak <= 8800) {
                 porezJedan = 2200 * 0.12;
                 porezDva = (dohodak - 2200) * 0.25;
         }
         else {
                 porezJedan = 2200 * 0.12;
                 porezDva = 6600 * 0.25;
                 porezTri = (dohodak - 8800) * 0.4;
         }
         var porez = porezJedan + porezDva + porezTri;
         var prirez = porez * prirezPerc;
         var netto = brutto - mirovinsko - porez - prirez;
	return netto;
    }

    function brutto2Brutto2(brutto){
         var zdravstvenoPerc = 0.15;
         var ozljedaPerc = 0.005;
         var zaposljavanjePerc = 0.017;

         var zdravstveno = brutto * zdravstvenoPerc;
         var ozljeda = brutto * ozljedaPerc;
         var zaposljavanje = brutto * zaposljavanjePerc;

         var bruttoDva = +brutto + zdravstveno + ozljeda + zaposljavanje;
	return bruttoDva;
    }

    function netto2Brutto(netto){
         if (netto <=4088) {
               var brutto = (netto - 264 - 47.52) / 0.68672;
         }
         else if (netto <= 8741){
               var brutto = (+netto + 2200*0.12 - 4400*0.25 + 2200*0.12*0.18 - 4400*0.25 *0.18) / 0.564 ;
         }
         else {
               var brutto = ( +netto + 2200*0.12 + 6600*0.25 - 11000*0.4 + 2200*0.12*0.18 + 6600 *0.25 *0.18 - 11000 *0.4*0.18) / 0.4224;
         }
	return brutto;
    }

    $( function() {

        $("#slider").slider({

	   min: 2750,
	   max: 20000,
	   step: 10,
	   value: 2750,
            slide: function(event, ui) {

                $("#price").val(ui.value);
            	var brutto = $("#price").val();
		var netto = brutto2Netto(brutto);
		var bruttoDva = brutto2Brutto2(brutto)

                $("#total").val(bruttoDva.toFixed(2));
		$("#sliderb").slider('value', netto);
		$("#priceb").val(netto);
		
            }
        });

        $("#sliderb").slider({
            value: 2200,
            min: 2200,
            max: 10000,
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

        $("#price").val("2750");
        $("#priceb").val("2200");

    }
    );

});

