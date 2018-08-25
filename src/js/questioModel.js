
const answers = [
    "SQL",          //0
    "SQL In Memory",//1
    "NoSQL Document",//2
    "NoSQL Column",//3
    "NoSQL Column In Memory",//4
    "NoSQL Column Store",//5
    "NoSQL GraphDB",//6
    "NoSQL Key Value"//7
];


const questions={
    "Caso de Uso":{
        "Transaccional":"Las Transacciones deben mantener las propiedades ACID?",
        "Analitico":"Encontrar patrones o relaciones de comportamiento?",
        "Manejo de Sesiones":"",
    },
    "Las Transacciones deben mantener las propiedades ACID?":{
        "Si":"Manejaras mas del millon de registros?",
        "No":"Manejaras mas del millon de registros?",
    },
    "Encontrar patrones o relaciones de comportamiento?":{
        "Si":"",
        "No":"Que tipo de consulta se realizara mas?",
    },
    "Manejaras mas del millon de registros?":{
        "Si":"",
        "No":"",
    },
    "Que tipo de consulta se realizara mas?":{
        "Usaré todos los campos":"Necesidad de manejar informacion en tiempo real?",
        "Usaré campos especificos":"Necesidad de manejar informacion en tiempo real?",
    },
    "Necesidad de manejar informacion en tiempo real?":{
        "Si":"",
        "No":"",
    },
};

class Tree_Node{
    constructor(prev_node=null,question="none",answer="none",index=0){
        this._prev_node=prev_node;
        this._question=question;
        this._answer=answer;
        this._index=index;
        if(this._prev_node==null){
            this._next_question="Caso de Uso";
            this._answer_options=Object.keys(questions[this._next_question]);
        }else{
            this._next_question=questions[this._question][this._answer];
            if(this._next_question!=="")
                this._answer_options=Object.keys(questions[this._next_question]);
        }
    }

    Ask(){
        if (!this.Answer()){
            $(`.titulo_pregunta${this._index+1}`).html(this._next_question);
            $(`.opcion${this._index*2+1}`).html(this._answer_options[0]);
            $(`.opcion${this._index*2+2}`).html(this._answer_options[1]);
            if(this._prev_node==null){
                $('.opcionextra').html(this._answer_options[2]);
            }/*else{
                $('.opcionextra').hide();
            }*/
            return false;
        }
        return true;
    }

    Answer(){
        if(this._next_question===""){
            $(`#options${this._index}`).hide();
            $('#numPregunta').html("Recomendación");
            let final_answer="";
            switch (this._prev_node._question){
                case "none":
                    final_answer=answers[7];
                    break;
                case "Caso de Uso":
                    final_answer=answers[6];
                    break;
                case "Las Transacciones deben mantener las propiedades ACID?":
                    if(this._prev_node._answer==="Si"){
                        if(this._answer==="Si"){
                            this._final_options=[answers[1], answers[0]];
                            final_answer=`${answers[1]}, ${answers[0]}`;
                        }else{
                            this._final_options=[answers[0]];
                            final_answer=`${answers[0]}`;
                        }
                    }else{
                        if(this._answer==="Si"){
                            this._final_options=[answers[2]];
                            final_answer=`${answers[2]}`;
                        }else{
                            this._final_options=[answers[0], answers[2]];
                            final_answer=`${answers[0]}, ${answers[2]}`;
                        }
                    }
                    break;
                case "Que tipo de consulta se realizara mas?":
                    if(this._prev_node._answer==="Usaré todos los campos"){
                        if(this._answer==="Si"){
                            this._final_options=[answers[1], answers[4]];
                            final_answer=`${answers[1]}, ${answers[4]}`;
                        }else{
                            this._final_options=[answers[2], answers[5]];
                            final_answer=`${answers[2]}, ${answers[5]}`;
                        }
                    }else{
                        if(this._answer==="Si"){
                            this._final_options=[answers[4], answers[2]];
                            final_answer=`${answers[4]}, ${answers[2]}`;
                        }else{
                            this._final_options=[answers[3], answers[2]];
                            final_answer=`${answers[3]}, ${answers[2]}`;
                        }
                    }
                    break;

            }

            $(`#options${this._index}`).after(this.WritePrices());
            $(`.titulo_pregunta${this._index+1}`).html(final_answer);
            return true;
        }
        return false;
    }
    WritePrices(){
        let tables = `<div class="row mx-auto">`;
        for(let i=0;i<this._final_options.length;i++){
            tables+=`<div class="mx-auto text-center d-inline-block"><table class="table">`;
            let t_header=`<th colspan="2">${this._final_options[i]}</th>`;
            let t_body=``;
            let option=prices[this._final_options[i]];
            for(let j=0;j<Object.keys(option).length;j++){
                let opt_key=Object.keys(option)[j];
                t_body+=`<tr><td>${opt_key}</td><td>${option[opt_key]}</td></tr>`
            }
            tables+=t_header+t_body+`</table></div>`;
        }
        tables+=`</div>`;
        return tables;
    }
}
