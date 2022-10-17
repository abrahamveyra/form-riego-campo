let iduser2 = 0;
var editar = false;

obtenerciclo();
function obtenerciclo(){
console.log()
    $.get("https://api.gec.org.mx/api/riegos/getFormCiclos") //hacemos el llamado de la web api
    .done(function(response){ //cuando se ejecute va aobtener una respuesta response
   
        $.each( response[0], function( id, fila){
            console.log(fila.cultivo_revisado)
                $("#tbodyciclo").append('<tr><td style="background-color: green; text-align: center; color:white">'+
                fila.fecha+'</td><td style="background-color: green; text-align: center; color:white">'+
                fila.cultivo_revisado+'</td><td style="background-color: green; text-align: center; color:white">'+
                fila.rancho_revisado+'</td><td style="background-color: green; text-align: center; color:white">'+
                fila.n_ciclo+'</td><td style="background-color: green; text-align: center; color:white">'+
                fila.tiempo_ciclo+'</td><td style="background-color: green; text-align: center; color:white">'+
                fila.n_base+'</td><td style="background-color: green; text-align: center; color:white">'+
                fila.status_producto+'</td><td style="background-color: green; text-align: center; color:white">'+
                fila.presion_riego_valvula+'</td><td style="background-color: green; text-align: center; color:white">'+
                fila.presion_riego_cintilla_manguera+'</td><td style="background-color: green; text-align: center; color:white">'+
                fila.ph_gotero+'</td><td style="background-color: green; text-align: center; color:white">'+
                fila.ce_gotero+'</td><td style="background-color: green; text-align: center; color:white">'+
                fila.mililitros_captacion+'</td><td style="background-color: green; text-align: center; color:white">'+
                fila.ph_dren+'</td><td style="background-color: green; text-align: center; color:white">'+
                fila.ce_dren+'</td><td style="background-color: green; text-align: center; color:white">'+
                fila.mililitros_dren+'</td><td style="background-color: green; text-align: center; color:white">'+
                fila.porcentaje_humedad+'</td><td style="background-color: green; text-align: center; color:white">'+
                fila.comentario_general+'</td></tr>')
                           
            
        

        });
    });
}

$(document).on('click', '.editar', function () {
           iduser2 = $(this).data("id");  
           PintarUsuario(iduser2);
           editar = true;
        });

        function PintarUsuario(iduser2){

$.get("https://api.gec.org.mx/api/riegos/getFormCiclos" + iduser2)
.done(function( response ) {
    
    $("#txtnombres").val(response.Name),
    $("#txtdescription").val(response.Description),
    $("#txtdocument").val(response.Quantity)
  });
}
    


    document.getElementById("saveciclo").addEventListener('click', () => {
  console.log("hola")
      if (editar == false) {
        var data = {
          fecha : $("#txtfechaciclo").val(),
          cultivo_revisado : $("#txtcultivociclo_revisado").val(),
          rancho_revisado : $("#txtranchociclo_revisado").val(),
          n_ciclo : $("#txtnciclo_ciclo").val(),
          tiempo_ciclo : $("#txttiempociclo_ciclo").val(),
          n_base : $("#txtnciclo_base").val(),
          status_producto : $("#txtstatusciclo_producto").val(),
          presion_riego_valvula : $("#txtpresionciclo_riego_valvula").val(),
          presion_riego_cintilla_manguera : $("#txtpresionciclo_riego_cintilla_manguera").val(),
          ph_gotero : $("#txtphciclo_gotero").val(),
          ce_gotero : $("#txtceciclo_gotero").val(),
          mililitros_captacion : $("#txtmililitrosciclo_captacion").val(),
          ph_dren : $("#txtphciclo_dren").val(),
          ce_dren: $("#txtceciclo_dren").val(),
          mililitros_dren : $("#txtmililitrosciclo_dren").val(),
          porcentaje_humedad : $("#txtporcentajeciclo_humedad").val(),
          evapotranspiracion : $("#txtevapotranspiracionciclo").val(),
          comentario_general : $("#txtcomentariociclo").val(),
            }
          
            $.post("https://api.gec.org.mx/api/riegos/getFormCiclos", data)
            .done(function(response) {
                console.log(response);
                console.log("envio inf")
                if(response){
                    
                   
                }else{
                    alert("usuario no creado")
                }
            });
      }else{
        var data = {
                  id : iduser2,
                  fecha : $("#txtfecha").val(),
                  cultivo_revisado : $("#txtcultivo_revisado").val(),
                  n_ciclo : $("#txtn_ciclo").val(),
                  tiempo_ciclo : $("#txttiempo_ciclo").val(),
                  status_producto : $("#txtstatus_producto").val(),
                  humedad : $("#txthumedad").val(),
                  n_base : $("#n_base").val(),
                  status_producto : $("#txtstatus_producto").val(),
                  presion_riego_valvula : $("#txtpresion_riego_valvula").val(),
                  presion_riego_cintilla_manguera : $("#txtpresion_riego_cintilla_manguera").val(),
                  ph_gotero : $("#txtph_gotero").val(),
                  ce_gotero : $("#txtce_gotero").val(),
                  mililitros_captacion : $("#txtmililitros_captacion").val(),
                  ph_dren : $("#txtph_dren").val(),
                  ce_dren: $("#txtce_dren").val(),
                  mililitros_dren : $("#txtmililitros_dren").val(),
                  porcentaje_humedad : $("#txtporcentaje_humedad").val(),
                  comentario_general : $("#txtcomentario").val(),
            }

                $.ajax({
                method: "PUT",
                url: "https://api.gec.org.mx/api/riegos/getFormCiclos"+iduser2,
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
            iduser2 = $(this).data("id");

            $.ajax({
            method: "DELETE",
            url: "https://api.gec.org.mx/api/riegos/getFormCiclos" + iduser2})
            .done(function( response ) {
                console.log(iduser2);
                if(response){
                    Obtener();
                }else{
                    alert("Error al eliminar")
                }
            });
            
        });



var cultivo = "";
        //CULTIVOS

     

         document.getElementById("txtcultivociclo_revisado").addEventListener('change', () => {
  console.log("ciclos")
          $("#txtranchociclo_revisado").find('option').not(':first').remove();

          
          cultivo = document.getElementById("txtcultivociclo_revisado").value;
        
         
          fetch('https://api.gec.org.mx/api/getCecos//')
    .then(resp => resp.json())
    .then( respObj => {
     let i = 0;
      respObj.forEach(respuesta => {
      
        if (respObj[i].CULTIVO == cultivo && respObj[i].MEDIO == "SUSTRATO") {
          $("#txtranchociclo_revisado").append("<option id='prueba2' value="+respObj[i].CODIGO+">"+respObj[i].CODIGO+"-"+respObj[i].DESCRIPCION+"</option>")
        }
        
        i=i+1;
      });
      
    });

    })

          