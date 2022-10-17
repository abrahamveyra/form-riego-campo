

let iduser = 0;
var editar = false;

obtener();
function obtener(){
    $(".table tbody").html(""); //limpia la tabla

    $.get("https://api.gec.org.mx/api/riegos/getFormSuelos") //hacemos el llamado de la web api
    .done(function(response){ //cuando se ejecute va aobtener una respuesta response

        $.each( response[0], function( id, fila){
         console.log(fila.humedad)
            $("<tr id='mydiv'>").append(
        $("<td style='background-color: green; text-align: center; color:white'>").text(fila.fecha),
        $("<td style='background-color: green; text-align: center; color:white'>").text(fila.cultivo_revisado), $("<td style='background-color: green; text-align: center; color:white'>").text(fila.rancho_revisado),
        $("<td style='background-color: green; text-align: center; color:white'>").text(fila.metodo_aplicacion),
        $("<td style='background-color: green; text-align: center; color:white'>").text(fila.status_producto),
        $("<td style='background-color: green; text-align: center; color:white'>").text(fila.humedad),
        $("<td style='background-color: green; text-align: center; color:white'>").text(fila.presion_riego_valvula),
        $("<td style='background-color: green; text-align: center; color:white'>").text(fila.presion_riego_cintilla_manguera),
        $("<td style='background-color: green; text-align: center; color:white'>").text(fila.ph_gotero),
        $("<td style='background-color: green; text-align: center; color:white'>").text(fila.ph_bomba),
        $("<td style='background-color: green; text-align: center; color:white'>").text(fila.ph_tierra),
        $("<td style='background-color: green; text-align: center; color:white'>").text(fila.ce_gotero),
        $("<td style='background-color: green; text-align: center; color:white'>").text(fila.ce_bomba),  
        $("<td style='background-color: green; text-align: center; color:white'>").text(fila.ce_tierra),  
        $("<td style='background-color: green; text-align: center; color:white'>").text(fila.evapotranspiracion),  
        $("<td style='background-color: green; text-align: center;'>").text(fila.comentario_general), 
         /*        $("<td>").append(
                    $("<button data-toggle='modal' data-target='#exampleModal'>").data("id",fila.id).addClass("btn btn-primary btn-sm mr-1 editar").text("Editar").attr({"type":"button"}),
                    $("<button>").data("id",fila.id).addClass("btn btn-danger btn-sm eliminar").text("Eliminar").attr({"type":"button"})
                )*/
            ).appendTo(".table-suelo")
        });
    });
}

$(document).on('click', '.editar', function () {
           iduser = $(this).data("id");  
           PintarUsuario(iduser);
           editar = true;
        });

        function PintarUsuario(iduser){

$.get("https://api.gec.org.mx/api/riegos/getFormSuelos" + iduser)
.done(function( response ) {
    
    $("#txtnombres").val(response.Name),
    $("#txtdescription").val(response.Description),
    $("#txtdocument").val(response.Quantity)
  });
}
    


    document.getElementById("savesuelo").addEventListener('click', () => {
  console.log("hola")
      if (editar == false) {
        var data = {
          fecha : $("#txtfecha").val(),
          cultivo_revisado : $("#txtcultivo_revisado").val(),
          rancho_revisado : $("#txtrancho_revisado").val(),
          metodo_aplicacion : $("#txtmetodo_aplicacion").val(),
          status_producto : $("#txtstatus_producto").val(),
          humedad : $("#txthumedad").val(),
          presion_riego_valvula : $("#txtpresion_riego_valvula").val(),
          presion_riego_cintilla_manguera : $("#txtpresion_riego_cintilla_manguera").val(),
          ph_gotero : $("#txthp_gotero").val(),
          ph_bomba : $("#txtph_bomba").val(),
          ph_tierra : $("#txtph_tierra").val(),
          ce_gotero : $("#txtce_gotero").val(),
          ce_bomba : $("#txtce_bomba").val(),
          ce_tierra : $("#txtce_tierra").val(),
          evapotranspiracion: $("#txtevapotranspiracion").val(),
          comentario_general : $("#txtcomentario").val(),
            }
          
            $.post("https://api.gec.org.mx/api/riegos/getFormSuelos", data)
            .done(function(response) {
                console.log(response);
                console.log("envio inf")
                if(response){
                    
                    alert("alerta")
                   
                }else{
                    alert("usuario no creado")
                }
            });
      }else{
        var data = {
                  id : iduser,
                  Fecha : $("#txtfecha").val(),
          Cultivo_Revisado : $("#txtcultivo_revisado").val(),
          Rancho_revisado : $("#txtrancho_revisado").val(),
          Metodo_aplicacion : $("#txtmetodo_aplicacion").val(),
          Status_producto : $("#txtstatus_producto").val(),
          Humedad : $("#txthumedad").val(),
          Presion_riego_valvula : $("#txpresion_riego_valvula").val(),
          Presion_riego_cintilla_manguera : $("#txpresion_riego_cintilla_manguera").val(),
          Ph_gotero : $("#txthp_gotero").val(),
          ph_bomba : $("#txtph_bomba").val(),
          ph_tierra : $("#txtph_tierra").val(),
          Ce_gotero : $("#txtce_gotero").val(),
          Ce_bomba : $("#txtce_bomba").val(),
          Ce_tierra : $("#txce_tierra").val(),
          Evapotranspiracion: $("#txtevapotranspiracion").val(),
          Comentario : $("#txtcomentario").val(),
            }

                $.ajax({
                method: "PUT",
                url: "https://api.gec.org.mx/api/riegos/getFormSuelos"+iduser,
                contentType: 'application/json',
                data: JSON.stringify(data), // access in body
                })
                .done(function( response ) {
                    console.log(response);
                    if(response){
                        alert("Se guardaron los cambios");
                        window.location = "index.html";
                    }else{
                        alert("Error al Modificar")
                    }
                });
                editar = false;
      }
})

  

    $(document).on('click', '.eliminar', function () {
            iduser = $(this).data("id");

            $.ajax({
            method: "DELETE",
            url: "https://api.gec.org.mx/api/riegos/getFormSuelos" + iduser})
            .done(function( response ) {
                console.log(iduser);
                if(response){
                    Obtener();
                }else{
                    alert("Error al eliminar")
                }
            });
            
        });


             //RANCHOS-ESTACIÓN
   
            
          
        
        var cultivo_suelo = "";
        //CULTIVOS

    

        document.getElementById("txtcultivo_revisado").addEventListener('change', () => {

         
         $("#txtrancho_revisado").find('option').not(':first').remove();
      

         
         cultivo_estacion = document.getElementById("txtcultivo_revisado").value;
       
       
         fetch('https://api.gec.org.mx/api/getCecos/')
   .then(resp => resp.json())
   .then( respObj => {
    let i = 0;
     respObj.forEach(respuesta => {
       console.log(respObj[i].CULTIVO,cultivo_estacion) 
       if (respObj[i].CULTIVO == cultivo_estacion && respObj[i].MEDIO == "SUELO") {
         $("#txtrancho_revisado").append("<option id='prueba' value="+respObj[i].CODIGO+" "+respObj[i].DESCRIPCION+">"+respObj[i].CODIGO+"-"+respObj[i].DESCRIPCION+"</option>")
       }
       
       i=i+1;
     });
     
   });

   })
       
         
         

  