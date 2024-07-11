//bibliotecas e códigos de terceiros
const formatador = (data) => {
    return{
        dia: {
            numerico: dayjs(data).format('DD'),
            semana: {
                curto: dayjs(data).format('ddd'),
                longo: dayjs(data).format('dddd'),
            }
        },
        mes: dayjs(data).format('MMMM'),
        hora: dayjs(data).format('HH:mm')
    }  
}

//object {}
const atividade = {
    nome: "Almoço",
    data: new Date("2024-07-08 10:00"),
    finalizada: true
}

//lista, array, vetor[]
let atividades = [
    atividade, 
    {
        nome: 'Academia em grupo',
        data: new Date("2024-07-09 12:00"),
        finalizada: true
    },
    {
        nome: 'Gamming Session',
        data: new Date("2024-07-09 16:00"),
        finalizada: false
    }
]

//atividades = []

//arrow function
const criarItemDeAtividade = (atividade) => {

    let input = `
    <input 
    onchange="concliuirAtividade(event)"
    value="$(atividade.data)"
    type="checkbox"
    `

        if(atividade.finalizada) {
            input += 'checked'
        }

    input += '>'

    const formatar = formatador(atividade.data)        

    return `
        <div class="card-bg">
            ${input}

            <div>
                <svg class="active" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.50008 8.99999L8.16675 10.6667L11.5001 7.33332M17.3334 8.99999C17.3334 13.6024 13.6025 17.3333 9.00008 17.3333C4.39771 17.3333 0.666748 13.6024 0.666748 8.99999C0.666748 4.39762 4.39771 0.666656 9.00008 0.666656C13.6025 0.666656 17.3334 4.39762 17.3334 8.99999Z" stroke="#BEF264" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <svg class="inactive" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.41664 0.818334C8.46249 0.615935 9.53745 0.615935 10.5833 0.818334M10.5833 17.1817C9.53745 17.3841 8.46249 17.3841 7.41664 17.1817M13.6741 2.10083C14.5587 2.70019 15.3197 3.46406 15.9158 4.35083M0.818303 10.5833C0.615904 9.53748 0.615904 8.46252 0.818303 7.41667M15.8991 13.6742C15.2998 14.5587 14.5359 15.3198 13.6491 15.9158M17.1816 7.41667C17.384 8.46252 17.384 9.53748 17.1816 10.5833M2.1008 4.32583C2.70016 3.44128 3.46403 2.68023 4.3508 2.08417M4.3258 15.8992C3.44124 15.2998 2.6802 14.5359 2.08414 13.6492" stroke="#A1A1AA" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>


                <span>${atividade.nome}</span>
            </div>

            <time class="short">
                ${formatar.dia.semana.curto}.
                ${formatar.dia.numerico} <br>
                ${formatar.hora}
            </time>
            <time class="full">
                ${formatar.dia.semana.longo}, 
            dia ${formatar.dia.numerico} 
            de  ${formatar.mes}
            às  ${formatar.hora}h</time>
        </div>
        `
    //colocamos uma "crase" no começo e no fim, o que possibilita usar o html aqui e permite a quebra de linhas 
}

const atualizarListaDeAtividades =  () => {
    const section = document.querySelector('section')
    section.innerHTML = ''
    // Verificar se a lista esta vazia
    if(atividades.length == 0){
        section.innerHTML = '<p>nenhuma atividade cadastrada.</p>'
        return
    }

    for(let atividade of atividades) {
        section.innerHTML += criarItemDeAtividade(atividade)
}
}

atualizarListaDeAtividades()

const salvarAtividade = (event) => {
    event.preventDefault()
    const dadosDoFormulario = new FormData(event.target)

    const nome = dadosDoFormulario.get('atividade')
    const dia = dadosDoFormulario.get('dia')
    const hora = dadosDoFormulario.get('hora')
    const data = `${dia} ${hora}`

    const novaAtividade = {
        nome,
        data,
        finalizada: false
    }
    //Se uma propriedade em JavaScript tiver o mesmo nome, exemplo: nome: nome, podemos encurtar isso somente para "nome"

    const atividadeExiste = atividades.find((atividade) => {
        return atividade.data == novaAtividade.data
    })

    if(atividadeExiste){
        return alert('Dia/hora não disponivel')
    }

    atividades = [novaAtividade, ...atividades] //pega todas as atividades antigas em coloque-as na lista de novaAtividade, por isso os ... é usado para esse fim
    atualizarListaDeAtividades()
}

const criarDiasSelecao = () => {
    const dias = [
        "2024-02-28",
        "2024-02-29",
        "2024-03-01",
        "2024-03-02",
        "2024-03-03"
    ]

    let diasSelecao = ''

    for(let dia of dias) {
        const formatar = formatador(dia)
        const diaFormatado = `
            ${formatar.dia.numerico} de
            ${formatar.mes}
        `
        diasSelecao += `
            <option value="${dia}">${diaFormatado}</option>
        `
    }

    document
        .querySelector('select[name="dia"]')
        .innerHTML = diasSelecao

}
criarDiasSelecao()

const criarHorasSelecao = () => {
    let horasDisponiveis = ''

    for(let i = 6; i < 23; i++) {
        const hora = String(i).padStart(2, '0') //padStart(2, '0'):
                                                //formato de 2 algarimos para hora, 
                                                //caso seja um numero de 1 algarismo, 
                                                //exemplo: 6, o zero vem antes, e 
                                                //fica 06, caso seja de 2 algarismo, 
                                                //exemplo: 10, essa regra não é aplicada
        horasDisponiveis += `<option valeu="${hora}:00">${hora}:00</option>`
        horasDisponiveis += `<option valeu="${hora}:30">${hora}:30</option>`
    }

    document
        .querySelector('select[name="hora"]')
        .innerHTML = horasDisponiveis
}
 
criarHorasSelecao()

const concluirAtividade = (event) => {
    const input = event.target
    const dataDesteInput = input.value

    const atividade = atividades.find((atividades) => {
        return atividade.data == dataDesteInput
    })

    if(!atividade){
        return
    }

    atividade.finalizada = !atividade.finalizada
}