$(document).ready(function(){
    var path = [];
    var index=0;
    var finished=false;
    $('#numPregunta').html(`Pregunta ${index+1}`);
    path.push(new Tree_Node());
    path[path.length-1].Ask();

    $('.recargar').click(function () {
        location.reload();
    });

    $('#c_previous').click(function () {
        if(index>0){
            index--;
        }

        if((index===path.length-1)&&finished){
            $('#numPregunta').html("Recomendación");
        }else{
            $('#numPregunta').html(`Pregunta ${index*1+1}`);
        }
        console.log(index);
    });

    $('#c_next').click(function () {
        if(index<path.length-1){
            index++;
        }

        if((index===path.length-1)&&finished){
            $('#numPregunta').html("Recomendación");
        }else{
            $('#numPregunta').html(`Pregunta ${index*1+1}`);
        }
        console.log(index);
    });

    $('body').on('click','li.indicador',function (e) {
        index = (e.target.getAttribute("data-slide-to"));

        if((index==path.length-1)&&finished){
            $('#numPregunta').html("Recomendación");
        }else{
            $('#numPregunta').html(`Pregunta ${index*1+1}`);
        }
        console.log(index);
    });
    
    $('body').on('click','button.opciones',function (e) {
        finished=false;
            for(let i=index*1+1.0;i<path.length;i++){
                $('div').remove(`#item${i}`);
                $('li').remove(`#ind${i}`);
            }
            path.splice(index*1+1);
            console.log(path);

        index++;
        console.log(index);

        if(e.target.id==="third"){
            path.push(new Tree_Node(
                path[path.length-1],
                $(`.titulo_pregunta${index}`).text(),
                $(`.opcionextra`).text(),
                index)
            );
        }else{
            $('#numPregunta').html(`Pregunta ${index+1}`);
            let ind=parseInt(e.target.id);
            path.push(new Tree_Node(
                path[path.length-1],
                $(`.titulo_pregunta${index}`).text(),
                $(`.opcion${ind}`).text(),
                index)
            );
        }
        createCard(index);
        finished = path[path.length-1].Ask();
        console.log(path);
    });

});

function createCard(index){

    let card = ` <div id="item${index}" class="carousel-item w-100" >
                    <div class="mx-auto w-75 my-5">
                        <h5 class="titulo_pregunta${index+1} text-center card-title mb-4">Pregunta texto</h5>
                        <div id="options${index}" class="mx-auto text-center">
                            <button id="${index*2+1}" type="button" class="opciones opcion${index*2+1} btn-danger opcion-select">OPC1</button>
                            <button id="${index*2+2}" type="button" class="opciones opcion${index*2+2} btn-danger opcion-select">OPC2</button>
                        </div>
                    </div>
                </div>`;
    let indicator=`<li id="ind${index}" data-target="#carouselExampleIndicators" class="indicador" data-slide-to="${index}" class="active"></li>`
    $('.carousel-inner').append(card);
    $('.carousel-indicators').append(indicator);
    $('#c_next').click();
}
