<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-constant-condition -->
<script setup lang="ts">
  import emailjs from 'emailjs-com';
  import MoleculeForm from '../molecules/MoleculeForm.vue';
  import {ref as refVue} from 'vue'
  import { useForm } from 'vee-validate';
  import { db, auth } from '@/firebase';
  import { addDoc, collection } from 'firebase/firestore';
  import { signInAnonymously } from 'firebase/auth';
  import {State} from '@/store/state'
  import axios from "axios";
  //@ts-ignore
  import querystring from "querystring-browser";
 
  type dataFormProps = {
    id?: any,
    name: string,
    question: string,
    typeOfResponse: string,
    isRequired: boolean,
    section: 
      'Identificacao' | 'Foto Geral' | 'Micro e String' | 
      'String' | 'Entradas MPPT' | 'Micro' | 'Conexoes' | 
      'Seguranca' | 'Monitoramento' | 'Nota Fiscal' | 'Pagamento' | 'Finalizacao',
    photosExamples?: string,
  }

  const dataArray: dataFormProps[] = [
    /* Indentificação */
    /* { name: 'emailInstaller', question: 'Informe seu e-mail', typeOfResponse: 'email', isRequired: true, section: 'Identificacao'}, */
    { id:1, name: 'enterpriseName', question: 'Qual o nome da sua empresa?', typeOfResponse: 'text', isRequired: true, section: 'Identificacao'},
    { id:2, name: 'responsibleTech', question: 'Qual o nome do responsável técnico?', typeOfResponse: 'text', isRequired: true, section: 'Identificacao'},
    { id:3, name: 'projectId', question: 'Código ID do projeto', typeOfResponse: 'number', isRequired: true, section: 'Identificacao'},
    { id:4, name: 'customerName', question: 'Nome do cliente?', typeOfResponse: 'text', isRequired: true, section: 'Identificacao'},
    { id:5, name: 'installationStartDate', question: 'Data de início da instalação', typeOfResponse: 'date', isRequired: true, section: 'Identificacao'},
    { id:6, name: 'installationFinalDate', question: 'Data de término da instalação', typeOfResponse: 'date', isRequired: true, section: 'Identificacao'},
    /* Foto Geral */
    { id:7,  name: 'photoFixingStructure', question: 'Foto da estrutura de fixação antes da instalação dos painéis', typeOfResponse: 'file', isRequired: true, section: 'Foto Geral'},
    { id:8,  name: 'photoGroundingModules', question: 'Foto do aterramento dos módulos', typeOfResponse: 'file', isRequired: true, section: 'Foto Geral'},
    { id:9,  name: 'photoInstalledPanels', question: 'Foto geral de todos os painéis instalados', typeOfResponse: 'file', isRequired: true, section: 'Foto Geral'},
    { id:10,  name: 'photoConnectionsEletric', question: 'Foto detalhada das conexões elétricas da(s) caixa(s) de proteção CA', typeOfResponse: 'file', isRequired: true, section: 'Foto Geral'},
    { id:11, name: 'photoInverterConnectionPoint', question: 'Foto do ponto de conexão do inversor com a rede', typeOfResponse: 'file', isRequired: true, section: 'Foto Geral'},
    { id:12, name: 'photoFaceGroundingInverter', question: 'Foto do aterramento da carcaça do inversor', typeOfResponse: 'file', isRequired: true, section: 'Foto Geral'},
    { id:13, name: 'photoGroundingAttachmentPoint', question: 'Foto do ponto de fixação do aterramento do sistema', typeOfResponse: 'file', isRequired: true, section: 'Foto Geral'},
    { id:14, name: 'photoForVisualInspection', question: 'Fotos para inspeção visual do telhado após a obra (condições das telhas, calhas e limpeza do local)', typeOfResponse: 'file', isRequired: true, section: 'Foto Geral'},
    { id:15, name: 'photoCAPhaseAndNeutral', question: 'Fotos da tensão(s) CA medida(s) entre fase e neutro', typeOfResponse: 'file', isRequired: true, section: 'Foto Geral'},
    { id:16, name: 'photoCAPhaseAndPhase', question: 'Foto da(s) tensão(ões) CA medida(s) entre fase e fase', typeOfResponse: 'file', isRequired: true, section: 'Foto Geral'},
    { id:17, name: 'photoTagModules', question: 'Foto da etiqueta de um dos módulos', typeOfResponse: 'file', isRequired: true, section: 'Foto Geral'},
    { id:18, name: 'photoIfProjectsWithBlocker', question: 'Em caso de projetos com bloqueador (desligamento remoto), envie uma foto', typeOfResponse: 'file', isRequired: true, section: 'Foto Geral'},
    { id:19, name: 'photoSNIfProjectsWithBlocker', question: 'Em caso de projetos com bloqueador (desligamento remoto), envie uma foto do SN (ID)', typeOfResponse: 'file', isRequired: true, section: 'Foto Geral'},
    { id:20, name: 'photoInputPattern', question: 'Foto do padrão de entrada completo com placa(s) de sinalização', typeOfResponse: 'file', isRequired: true, section: 'Foto Geral'},
    { id:21, name: 'photoBannerOfTheResidence', question: 'Foto da fachada da residência com número.', typeOfResponse: 'file', isRequired: true, section: 'Foto Geral'},
    { id:22, name: 'photoCircuitBreaker', question: 'Foto do disjuntor do padrão de entrada adequado e DPS instalado', typeOfResponse: 'file', isRequired: true, section: 'Foto Geral'},
    /* ponto de descisão */
    {id:23, name: 'inverterTypeInstalled', question: 'Qual tipo de inversor instalado?', typeOfResponse: 'lista', isRequired: true, section: 'Micro e String'},
    /* string  */
    {id:24, name: 'quantityInvertersInstalled', question: 'Quantos inversores foram instalados?', typeOfResponse: 'number', isRequired: true, section:'String'},
    {id:25, name: 'photoSNInverterString', question: 'Foto SN do inversor', typeOfResponse: 'file', isRequired: true, section:'String'},
    {id:26, name: 'photoSNAntennaInverterString', question: 'Foto SN da antena do inversor', typeOfResponse: 'file', isRequired: true, section:'String'},
    {id:27, name: 'photoDetailedConnectionEletric', question: 'Foto detalhada das conexões elétricas da(s) stringbox CC', typeOfResponse: 'file', isRequired: true,  section:'String'},
    {id:28, name: 'photoInstallationOfInvertersCCAndCA', question: 'Foto ampla do local de instalação do(s) inversor(es), stringbox CC e caixa(s) de proteção CA', typeOfResponse: 'file', isRequired: true,  section:'String'},
    {id:29, name: 'locationInverterInstalled', question: 'Qual o local em que o inversor foi instalado?', typeOfResponse: 'text', isRequired: true,  section:'String'},
    {id:30, name: 'heightBetweenInverterDisplayAndFloor', question: 'Qual a altura entre o visor do inversor e piso acabado?', typeOfResponse: 'number', isRequired: true, section:'String'},
    /*  string - lógica MPPT */
    {id:31, name: 'inverterStringUsed',question: 'Qual o "n" inversor string utilizado?', typeOfResponse: 'lista', isRequired: true,  section:'Entradas MPPT'},
    {id:32, name: 'qtdPanelsConnectedSingleInputOfTheSingle', question: 'Quantos painéis foram conectados a entrada única do único MPPT deste inversor?',typeOfResponse: 'number', isRequired: true,  section:'Entradas MPPT',},
    {id:33, name: 'photoVoltInverterInput', question: 'Envie uma foto da tensão dessa entrada do inversor', typeOfResponse: 'file', isRequired: true,  section:'Entradas MPPT'},
    {id:34, name: 'photoChainInverterInput', question: 'Envie uma foto da corrente dessa entrada do inversor', typeOfResponse: 'file', isRequired: true,  section:'Entradas MPPT'  },

    /* micro */
    {id: 35, name: 'microInverterInstalled', question: 'Qual micro inversor foi instalado?', typeOfResponse: 'lista', isRequired: true, section: 'Micro'},
    {id:36, name: 'quantityMicroInvertersInstalled', question: 'Quantos micros foram instalados?', typeOfResponse: 'number', isRequired: true, section:'Micro'},
    {id:37, name: 'howManyInvertersNotCompletelyFull', question: 'Quantos desses micros NÃO estão completamente cheios?', typeOfResponse: 'number', isRequired: true, section:'Micro'},
    {id:38, name: 'sketchModulesOnTheRoof', question: 'Envie o croqui dos módulos no telhado separados por micro inversor.', typeOfResponse: 'file', isRequired: true, section:'Micro'},
    {id:39, name: 'photoSNOfAllMicroInverters', question: 'Foto SN de TODOS os micro inversores', typeOfResponse: 'file', isRequired: true, section:'Micro' },
    {id:40, name: 'photoSNOfAntennaMicroInverters', question: 'Foto SN da antena dos micros inversores', typeOfResponse: 'file', isRequired: true,section:'Micro'},
    
    /* conexão */
    {id:41, name: 'thePanelsGroundedTogether', question: 'Os painéis foram aterrados entre si e conectados ao aterramento conforme a Normativa?', typeOfResponse: 'lista', isRequired: true, section: 'Conexoes'},
    {id:42, name: 'allRightCrimpagesConnectorsMC4', question: 'As crimpagens dos conectores MC4 foram realizadas com o alicate correto e suas conexões foram devidamente conferidas?', typeOfResponse: 'lista', isRequired: true, section: 'Conexoes'},
    {id:43, name: 'doubleIsulationCablesWereUsed', question: 'Foram utilizados cabos de dupla isolação (solar), enviados no kit, para realizar as ligações das partes de corrente contínua (CC) do sistema?', typeOfResponse: 'lista', isRequired: true, section: 'Conexoes'},
    {id:44, name: 'typeOfPipingUsedAtInstall', question: 'Qual tipo de tubulação utilizado na instalação elétrica do sistema?', typeOfResponse: 'lista', isRequired: true, section: 'Conexoes'},
    {id:45, name: 'stringBInvertersAndQBInstallInCoveredPlace', question: 'As Stringbox, inversores e o quadro de distribuição foram instaladas em local coberto, livre de intempéries como incidência de sol e chuva?', typeOfResponse: 'lista', isRequired: true, section: 'Conexoes'},
    {id:46, name: 'whyNotStringBInvertersAndQBInstallInCoveredPlace', question: 'Por qual motivo não?', typeOfResponse: 'text', isRequired: true, section: 'Conexoes'},
    {id:47, name: 'installAccordingSinglelineDiagram', question: 'A instalação foi executada conforme diagrama unifilar elaborado?', typeOfResponse: 'lista', isRequired: true, section: 'Conexoes'},
    {id:48, name: 'whyNotInstallAccordingSinglelineDiagram', question: 'Por qual motivo não?', typeOfResponse: 'text', isRequired: true, section: 'Conexoes'},
    {id:49, name: 'singlelineProjectDiagram', question: 'Envie o diagrama unifilar do projeto.', typeOfResponse: 'file', isRequired: true, section: 'Conexoes'},
    {id:50, name: 'respectedMinimunSoacingInverters', question: 'Foi respeitado o espaçamento livre mínimo dos inversores, conforme orientado no Manual de Instalação?', typeOfResponse: 'lista', isRequired: true, section: 'Conexoes'},
    {id:51, name: 'whyNotRespectedMinimunSoacingInverters', question: 'Por qual motivo não?', typeOfResponse: 'text', isRequired: true, section: 'Conexoes'},
    {id:52, name: 'allStringChecked', question: 'No ensaio de polaridade, todas as strings foram verificadas?', typeOfResponse: 'lista', isRequired: true, section: 'Conexoes'},
    {id:53, name: 'whyNotAllStringChecked', question: 'Por qual motivo não?', typeOfResponse: 'text', isRequired: true, section: 'Conexoes'},
    {id:54, name: 'heldInspectionLocationAfterInstall', question: 'Foi realizada inspeção no local após a instalação?', typeOfResponse: 'lista', isRequired: true, section: 'Conexoes'},
    /* Segurança */
    {id:55, name: 'allEPIsAndEPCsWereUsed', question: 'Foram utilizados todos os EPIs e EPCs necessários durante a instalação?', typeOfResponse: 'lista', isRequired: true, section: 'Seguranca'},
    {id:56, name: 'photoUseEPIsAndEPCsNecessary', question: 'Envie uma foto ou vídeo demonstrando a utilização de EPIs e EPCs necessários durante a instalação', typeOfResponse: 'file', isRequired: true, section: 'Seguranca'},
    /* Monitoramento */
    {id:57, name: 'monitoringConnectedToHOLUAccount', question: 'O monitoramento foi realizado e está conectado a conta da Holu?', typeOfResponse: 'lista', isRequired: true, section: 'Monitoramento'},
    {id:58, name: 'whyNotMonitoringConnectedToHOLUAccount', question: 'Por qual motivo não?', typeOfResponse: 'text', isRequired: true, section: 'Monitoramento'},
    {id:59, name: 'monitoringLogin', question: 'Qual login do monitoramento do cliente?', typeOfResponse: 'text', isRequired: true, section: 'Monitoramento'},
    {id:60, name: 'monitoringPassword', question: 'Qual senha do monitoramento do cliente?', typeOfResponse: 'text', isRequired: true, section: 'Monitoramento'},
    {id:61, name: 'photoAppmonitoringCustomer', question: 'Foto do aplicativo de monitoramento do cliente', typeOfResponse: 'file', isRequired: true, section: 'Monitoramento'},
    /* Nota Fiscal */
    {id:62, name: "sendNFsForPaymentNow", question: "Deseja enviar suas NF's para pagamento agora?", typeOfResponse: 'lista', isRequired: true, section: 'Nota Fiscal'},
    {id:63, name: "uploadNFInPDFReferentSecondInstallment", question: "Faça upload da nota fiscal em PDF referente a segunda parcela do pagamento acordado", typeOfResponse: 'file', isRequired: true, section: 'Nota Fiscal'},
    {id:64, name: "valueNFReferentSecontInstallment", question: "Informe o valor da nota fiscal referente a segunda parcela do pagamento acordado", typeOfResponse: 'number', isRequired: true, section: 'Nota Fiscal'},
    {id:65, name: "uploadNFReferentExtraCosts", question: "Caso exista, faça upload da nota fiscal referente aos custos extras", typeOfResponse: 'file', isRequired: true, section: 'Nota Fiscal'},
    {id:66, name: "valueNFReferentExtraCosts", question: "Informe o valor da nota fiscal referente aos custos extras.", typeOfResponse: 'number', isRequired: true, section: 'Nota Fiscal'},
    {id:67, name: "CNPJ", question: "Informe seu CNPJ", typeOfResponse: 'text', isRequired: true, section: 'Nota Fiscal'},

    /* Pagamento */
    {id:68, name: "wayOfReceivePayment", question: "Como deseja receber o pagamento?", typeOfResponse: 'lista', isRequired: true, section: 'Pagamento'},
    {id:69, name: "typeKeyPIX", question: "Qual é o tipo da sua chave PIX?", typeOfResponse: 'lista', isRequired: true, section: 'Pagamento'},
    {id:70, name: "PIX", question: "Qual é o seu PIX?", typeOfResponse: 'text', isRequired: true, section: 'Pagamento'},
    {id:71, name: "bank", question: "Qual o seu banco?", typeOfResponse: 'text', isRequired: true, section: 'Pagamento'},
    {id:72, name: "bankAgency", question: "Qual a sua Agência?", typeOfResponse: 'string', isRequired: true, section: 'Pagamento'},
    {id:73, name: "currentAccount", question: "Qual a sua Conta Corrente?", typeOfResponse: 'text', isRequired: true, section: 'Pagamento'},
    /* Finalização  */
    {id:74, name: "pointsOfAttentionCustomerResidence", question: "Deseja relatar pontos de atenção da residência do cliente?", typeOfResponse: 'text', isRequired: true, section: 'Finalizacao'},
  ]

  const { handleSubmit } = useForm();
   
  async function sendEmail(emailContent: string, email:string) {
    emailjs.init('FU2ubEa1PWdNFwwkM'); // Substitua pelo SendGrid API Key
    const response = await emailjs.send(
      'service_mmfma6f', // Use 'sendgrid' como service ID para usar o SendGrid
      'template_poc638q', // Template ID (criado no site do EmailJS)
      {
        to_email: email, // Endereço de e-mail do destinatário
        message: emailContent,
      }
    );

    console.log('E-mail enviado:', response);
  }

  // Função para construir o conteúdo do e-mail
  function buildEmailContent(data: Record<string, any>, questions: Array<any>): string {
    let emailContent = 'Respostas do formulário:\n\n';

    for (const question of questions) {
      const questionText = question.question;
      const answer = data[question.name];
      if (answer !== undefined) {
        emailContent += `${questionText}: ${answer}\n`;
      }
    }
    emailContent += `Data de envio: ${data.dataInclude}\n`;
    return emailContent;
  }

  function flattenArray(arr: any[]): any[] {
    const flattenedArray: any[] = [];
    arr.forEach((item: any) => {
      if (Array.isArray(item)) {
        flattenedArray.push(...flattenArray(item));
      } else {
        flattenedArray.push(item);
      }
    });
    return flattenedArray;
  }

  function arrayToNestedString(arr: any[]): string {
    if (!Array.isArray(arr)) {
      return `"${String(arr)}"`;
    }

    const innerStrings: any[] = arr.map((innerArr) => `[${innerArr.map(String).join(',')}]`);
    return `[${innerStrings.join(',')}]`;
  }


  const onSubmit = handleSubmit(async () => {

    if(State.send) return
    State.send = true
    const storedValues = localStorage.getItem('forms');
    const valuesForm = storedValues ? JSON.parse(storedValues) : null;
    const storedValuesFiles = localStorage.getItem('formsFiles');
    const valuesFormFile = storedValuesFiles ? JSON.parse(storedValuesFiles) : null;

    const values = { ...valuesForm, ...valuesFormFile };

  
    for (const key in values) {
      if (Array.isArray(values[key])) {
        values[key] = flattenArray(values[key]);
      }
    }

    for(let i = 0; i < values.quantityInvertersInstalled; i++){
      values.photoChainInverterInput[i].inverter.distMppt = arrayToNestedString(values.photoChainInverterInput[0].inverter.distMppt)
      values.photoVoltInverterInput[i].inverter.distMppt = arrayToNestedString(values.photoVoltInverterInput[0].inverter.distMppt)
      values.qtdPanelsConnectedSingleInputOfTheSingle[i].inverter.distMppt = arrayToNestedString(values.qtdPanelsConnectedSingleInputOfTheSingle[i].inverter.distMppt)
    }

    values.dataInclude = new Date().toLocaleString()
    values['Data e Hora de Inserção'] = new Date().toLocaleString()
    console.log('values: ',values)
    signInAnonymously(auth).then(async() =>{

      await addDoc(collection(db, 'forms'), values);
      const { data } = await axios.post(
        "https://script.google.com/macros/s/AKfycbyMvCgZWzzd1Yss10OeT6uQDOSOqru45ySHgZdP6i-wx_gHWrbIqBUfBQVevkMdMkVm/exec",
        querystring.stringify(values)
      );

      alert('Formulário enviado com sucesso!');
      localStorage.clear();
      window.location.reload();
    })
    .catch((error) => {
      const errorMessage = error.message;
    
      alert('Erro ao salvar o formulário!, descrição do problema: '+errorMessage)
      console.log(error);
    });
  });

  const currentSection = refVue('Identificacao')

  const updateSection = (section: any) =>{
    currentSection.value = section
  }
</script>

<template>
  
  <v-form 
    @submit.prevent="onSubmit"  
    class="form"
  >
  
    <div style="width: 100%;">
      <div>
        <MoleculeForm @section-updated="updateSection" :data-array="dataArray" @send-form="onSubmit"/>
      </div>
    </div>
  </v-form>
</template>

<style>

.form{
  width: 80%;
  margin: 0 auto;
  margin-top: 8rem;
  margin-bottom: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0;
}
.container-btn{
  width: 30%;
  margin-top: -4.3rem;
  margin-right: -70%;
}
.btn-submit{
  padding: 1rem 2rem !important;
  display: flex !important;
  align-items: center !important; 
  margin: 0 auto !important;
}

@media screen and (min-width:1120px) {
  .form{
    width: 50%;
  }
}

@media screen and (max-width:720px) {
  .form{
    width: 100%;
  }
}
 
</style>

../../store/state