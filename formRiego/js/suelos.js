

let iduser = 0;
var editar = false;

obtener();
function obtener(){
    $(".table tbody").html(""); //limpia la tabla

    let i=0;
fetch('https://api.gec.org.mx/api/riegos/getFormSuelos')
.then(resp => resp.json())
.then(resp => {
    resp[0].forEach(element => {
     
        console.log(i, resp[0][i].humedad)
        $("#tbodysuelo").append('<tr><td style="background-color: green; text-align: center; color:white">'+
        resp[0][i].pk_wap_rsuelo_pro_01+'</td><td style="background-color: green; text-align: center; color:white">'+
        resp[0][i].fecha+'</td><td style="background-color: green; text-align: center; color:white">'+
        resp[0][i].cultivo_revisado+'</td><td style="background-color: green; text-align: center; color:white">'+
        resp[0][i].rancho_revisado+'</td><td style="background-color: green; text-align: center; color:white">'+
        resp[0][i].metodo_aplicacion+'</td><td style="background-color: green; text-align: center; color:white">'+
        resp[0][i].status_producto+'</td><td style="background-color: green; text-align: center; color:white">'+
        resp[0][i].humedad+'</td><td style="background-color: green; text-align: center; color:white">'+
        resp[0][i].presion_riego_valvula+'</td><td style="background-color: green; text-align: center; color:white">'+
        resp[0][i].presion_riego_cintilla_manguera+'</td><td style="background-color: green; text-align: center; color:white">'+
        resp[0][i].ph_gotero+'</td><td style="background-color: green; text-align: center; color:white">'+
        resp[0][i].ph_bomba+'</td><td style="background-color: green; text-align: center; color:white">'+
        resp[0][i].ph_tierra+'</td><td style="background-color: green; text-align: center; color:white">'+
        resp[0][i].ce_gotero+'</td><td style="background-color: green; text-align: center; color:white">'+
        resp[0][i].ce_bomba+'</td><td style="background-color: green; text-align: center; color:white">'+
        resp[0][i].ce_tierra+'</td><td style="background-color: green; text-align: center; color:white">'+
        resp[0][i].evapotranspiracion+'</td><td style="background-color: green; text-align: center; color:white">'+
        resp[0][i].comentario_general+'</td></tr>')
        i=i+1;
    });
})


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

            fetch('https://api.gec.org.mx/api/riegos/getFormSuelos', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
})
.then( resp => resp.json())
.then( console.log)
.catch(error => {
    console.log("error de peticion")
    console.log(error)
})
          
       
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
          ph_tierra : $("#txtph_tierra txtph_tierra").val(),
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
       
         
         

  