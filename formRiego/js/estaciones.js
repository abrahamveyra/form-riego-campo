let iduser3 = 0;
var editar = false;

obtenerciclo();
function obtenerciclo(){
console.log()
    $.get("https://api.gec.org.mx/api/riegos/getFormEstaciones") //hacemos el llamado de la web api
    .done(function(response){ //cuando se ejecute va aobtener una respuesta response
 
        $.each( response[0], function( id, fila){
      
                $("#tbodyestaciones").append("<tr><td style='background-color: green; text-align: center; color:white'>"+
                fila.fecha+"</td><td style='background-color: green; text-align: center; color:white'>"+
                fila.cultivo_revisado+"</td><td style='background-color: green; text-align: center; color:white'>"+
               (fila.rancho_revisado)+"</td><td style='background-color: green; text-align: center; color:white'>"+
               (fila.n_estacion)+"</td></td><td style='background-color: green; text-align: center; color:white'>"+
               (fila.mililitros_captacion)+"</td></td><td style='background-color: green; text-align: center; color:white'>"+
               (fila.ph_entrada)+"</td><td style='background-color: green; text-align: center; color:white'>"+
               (fila.ce_entrada)+"</td><td style='background-color: green; text-align: center; color:white'>"+
               (fila.mililitros_dren)+"</td></td><td style='background-color: green; text-align: center; color:white'>"+
               (fila.ph_dren)+"</td><td style='background-color: green; text-align: center; color:white'>"+
               (fila.ce_dren)+"</td><td style='background-color: green; text-align: center; color:white'>"+
               (fila.variedad)+"</td><td style='background-color: green; text-align: center; color:white'>"+
               (fila.comentario_general)+"</td></tr>")
            
          
        });
    });
}

$(document).on('click', '.editar', function () {
           iduser3 = $(this).data("id");  
           PintarUsuario(iduser3);
           editar = true;
        });

        function PintarUsuario(iduser3){

$.get("https://api.gec.org.mx/api/riegos/getFormEstaciones" + iduser3)
.done(function( response ) {
    
    $("#txtnombres").val(response.Name),
    $("#txtdescription").val(response.Description),
    $("#txtdocument").val(response.Quantity)
  });
}
    


    document.getElementById("saveestacion").addEventListener('click', () => {
  console.log("hola")
      if (editar == false) {
        var data = {
          fecha : $("#txtfechaestacion").val(),
          cultivo_revisado : $("#txtcultivoestacion_revisado").val(),
          rancho_revisado : $("#txtranchoestacion_revisado").val(),
          n_estacion : $("#txtnestacion_estacion").val(),
          mililitros_captacion : $("#txtmililitroscicloestacion_captacion").val(),
          ph_entrada : $("#txtphestacion_entrada").val(),
          ce_entrada : $("#txtceestacion_entrada").val(),
          mililitros_dren : $("#txtmililitrosestacion_dren").val(),
          ph_dren : $("#txtphestacion_dren").val(),
          ce_dren : $("#txtceestacion_dren").val(),
          variedad : $("#txtvariedadestacion").val(),
          comentario_general : $("#txtcomentarioestacion").val(),
            }
          
            $.post("https://api.gec.org.mx/api/riegos/getFormEstaciones", data)
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
                  id : iduser3,
                  fecha : $("#txtfechaestacion").val(),
                  cultivo_revisado : $("#txtcultivoestacion_revisado").val(),
                  rancho_revisado : $("#txtranchoestacion_revisado").val(),
                  n_estacion : $("#txtnestacion_estacion").val(),
                  mililitros_captacion : $("#txtmililitroscicloestacion_captacion").val(),
                  ph_entrada : $("#txtphestacion_entrada").val(),
                  ce_entrada : $("#txtceestacion_entrada").val(),
                  mililitros_dren : $("#txtmililitrosestacion_dren").val(),
                  ph_dren : $("#txtphestacion_dren").val(),
                  ce_dren : $("#txtceestacion_dren").val(),
                  variedad : $("#txtvariedadestacion").val(),
                  comentario_general : $("#txtcomentarioestacion").val(),
            }

                $.ajax({
                method: "PUT",
                url: "https://api.gec.org.mx/api/riegos/getFormEstaciones"+iduser3,
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
            iduser3 = $(this).data("id");

            $.ajax({
            method: "DELETE",
            url: "https://api.gec.org.mx/api/riegos/getFormEstaciones" + iduser3})
            .done(function( response ) {
                console.log(iduser3);
                if(response){
                    Obtener();
                }else{
                    alert("Error al eliminar")
                }
            });
            
        });



var cultivo = "";
        //CULTIVOS

     

         document.getElementById("txtcultivoestacion_revisado").addEventListener('change', () => {
  console.log("ciclos")
          $("#txtranchoestacion_revisado").find('option').not(':first').remove();

          
          cultivo = document.getElementById("txtcultivoestacion_revisado").value;
        
         
          fetch('https://api.gec.org.mx/api/getCecos//')
    .then(resp => resp.json())
    .then( respObj => {
     let i = 0;
      respObj.forEach(respuesta => {
      
        if (respObj[i].CULTIVO == cultivo && respObj[i].MEDIO == "SUSTRATO") {
          $("#txtranchoestacion_revisado").append("<option id='prueba2' value="+respObj[i].CODIGO+">"+respObj[i].CODIGO+"-"+respObj[i].DESCRIPCION+"</option>")
        }
        
        i=i+1;
      });
      
    });

    })

          