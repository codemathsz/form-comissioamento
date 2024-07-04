<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
  import * as yup from 'yup';
  import inputVue from '../atoms/Input.vue';
  import labelVue from '../atoms/Label.vue';
  import  SelectVue from '../atoms/Select.vue';
  import {ref as refVue, computed, watch, reactive, onMounted} from 'vue'
  import InputFile from '../atoms/InputFile.vue';
  import imageMap from '@/image';

  type inverterProps = {
    name: string,
    MPPT:{
      name: string,
      numberOfInputs: number
    }[]
  }

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
  
  const emit = defineEmits(['section-updated', 'send-form'])
  
  const props = defineProps({
    dataArray: Array<dataFormProps>, 
  });

  const invertersArray: inverterProps[] = [
    {
      name: 'BYD-S 3KW MONOFÁSICO 220V',
      MPPT: [
        {name: 'MPPT 1',numberOfInputs: 1}
      ]
    },
    {
      name: 'BYD-K 3KW MONOFÁSICO 220V',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'BYD-S 5KW MONOFÁSICO 220V',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'BYD-K 6KW MONOFÁSICO 220V',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'BYD-S 8KW MONOFÁSICO 220V',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 3',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'BYD-K 8KW MONOFÁSICO 220V',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 3',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'BYD-K 9KW MONOFÁSICO 220V',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 3',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'BYD-S 10KW MONOFÁSICO 220V',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 3',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'ELSYS 3KW ESM3000 MONO',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'ELSYS 3KW ESM3000L MONO',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'ELSYS 5KW ESM5000 MONO',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'ELSYS 6,5KW ESM6500 MONO',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'ELSYS 8KW ESM8000 MONO',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 2
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'GROWATT MIC 3000TL-X',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'GROWATT MIN 3000TL-X',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'GROWATT MIN 5000TL-X',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'GROWATT MIN 6000TL-X',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'GROWATT 8000MTL-S',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 2
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'GOODWE 3KW - GW3000-NS',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'GOODWE 5KW - GW5000D-NS',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'GOODWE 8.5KW - GW8500-MS',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 3',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'GOODWE 10KW - GW10K-MS',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 3',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'SOLIS MONO 3K S6',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'SOLIS MONO 3K 1P',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'SOLIS MONO 4K 1P',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'SOLIS MONO 5K 1P',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'SOLIS MONO 6K 1P',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'SOLIS S5-GR1P 7K',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 3',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'SOLIS S5-GR1P 8K',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 3',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'SOLIS S5-GR1P 9K',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 3',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'SOLIS S5-GR1P 10K',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 3',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'SOLIS 15K-LV',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 2
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 2
        }]
    }
        ,
        {
            name: 'SOLIS 20K-LV',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 2
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 2
        }]
    }
        ,
        {
            name: 'SUNGROW SG3K RS MONO',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'SUNGROW SG4K RS MONO',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'SUNGROW SG5K RS MONO',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'SUNGROW SG6K RS MONO',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'SUNGROW SG8.3K-D MONO',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 2
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'SUNGROW SG RS 8K',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 3',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'SUNGROW SG RS 9K',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 3',
                    numberOfInputs: 1
        }]
    }
        ,
        {
            name: 'SUNGROW SG RS 10K',
            MPPT: [
                {
                    name: 'MPPT 1',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 2',
                    numberOfInputs: 1
        }
                ,
                {
                    name: 'MPPT 3',
                    numberOfInputs: 1
        }]
  },
  {
    name: 'Solplanet ASW 3000 S S2 220',
    MPPT: [
      {
        name: 'MPPT 1',
        numberOfInputs: 1
      }
      ,
      {
        name: 'MPPT 2',
        numberOfInputs: 1
      }
    ]
  },
  {
    name: 'Solplanet ASW 4000 S S2 220',
    MPPT: [
      {
        name: 'MPPT 1',
        numberOfInputs: 1
      }
      ,
      {
        name: 'MPPT 2',
        numberOfInputs: 1
      }
    ]
  },
  {
    name: 'Solplanet ASW 5000 S S2 220',
    MPPT: [
      {
        name: 'MPPT 1',
        numberOfInputs: 1
      }
      ,
      {
        name: 'MPPT 2',
        numberOfInputs: 1
      }
    ]
  },
  {
    name: 'Solplanet ASW 7000 S S2 220',
    MPPT: [
      {
        name: 'MPPT 1',
        numberOfInputs: 1
      },
      {
        name: 'MPPT 2',
        numberOfInputs: 1
      },
      {
        name: 'MPPT 3',
        numberOfInputs: 1
      }
    ]
  },
  {
    name: 'Solplanet ASW 8000 S S2 220',
    MPPT: [
      {
        name: 'MPPT 1',
        numberOfInputs: 1
      },
      {
        name: 'MPPT 2',
        numberOfInputs: 1
      },
      {
        name: 'MPPT 3',
        numberOfInputs: 1
      }
    ]
  },
  {
    name: 'Solplanet ASW 10000 S S2 220',
    MPPT: [
      {
        name: 'MPPT 1',
        numberOfInputs: 1
      },
      {
        name: 'MPPT 2',
        numberOfInputs: 1
      },
      {
        name: 'MPPT 3',
        numberOfInputs: 1
      }
    ]
  },
]
  const inverterNames = invertersArray.map((inverter) => inverter.name);

  let valuesForm: any = reactive({
    qtdPanelsConnectedSingleInputOfTheSingle: [],
    quantityInvertersInstalledIsEquals: 0,
  });
 
  const addInvertersInPanelsConnectedSingleInputOfTheSingle =(inverters:number) =>{
    for (let i = 0; i < inverters; i++) {
      valuesForm.qtdPanelsConnectedSingleInputOfTheSingle.push({
        inverter:{
          name: "",
          distMppt: [[]]
        }
      })
    }
  }

  const updateDistMppt = (inverterSelected:string, index:number) =>{
    
    for(let inverterItem of invertersArray){
      if(inverterSelected === inverterItem?.name){
        valuesForm.qtdPanelsConnectedSingleInputOfTheSingle[index].inverter.distMppt = Array.from(
          { length: inverterItem.MPPT.length },
          () => [""] 
        );
        break;
      }
    }
  }
  const currentSection = refVue('Identificacao');

  const questions = refVue(props.dataArray || []);

  let isSendingForm: boolean = false

  const displayedQuestions = computed(() => {
    const filteredQuestions = questions.value.filter((question:any) => {
      if (currentSection.value === 'Identificacao') {
        return question.section === 'Identificacao';
      } else if (currentSection.value === 'Foto Geral') {
        return question.section === 'Foto Geral' 
      } else if (currentSection.value === 'Micro e String') {
        return question.section === 'Micro e String'
      }else if (currentSection.value === 'String') {
        return (question.section === 'String' );     
      } else if (currentSection.value === 'Entradas MPPT') {
        return (
          question.section === 'Entradas MPPT' &&
          valuesForm.inverterTypeInstalled === 'Inversor String' &&
          valuesForm.quantityInvertersInstalled > 0
        );
      } else if (currentSection.value === 'Micro') {
        return (question.section === 'Micro' );
        
      } else if (currentSection.value === 'Conexoes') {
        return question.section === 'Conexoes' 
      }else if (currentSection.value === 'Seguranca') {
        return question.section === 'Seguranca' 
      }else if (currentSection.value === 'Monitoramento') {
        return question.section === 'Monitoramento' 
      }else if (currentSection.value === 'Nota Fiscal') {
        return question.section === 'Nota Fiscal' 
      }else if (currentSection.value === 'Pagamento') {
        return question.section === 'Pagamento' 
      }else if (currentSection.value === 'Finalizacao') {
        return question.section === 'Finalizacao' 
      }
      return false;
    });

    return filteredQuestions;
  });

  const progress = refVue(0)

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  // Função para navegar para a próxima seção
  const goToNextSection = () => {
    if (props.dataArray) {
      const currentIndex = props.dataArray.findIndex((item) => item.section === currentSection.value);
      const nextIndex = props.dataArray.findIndex((item, index) => index > currentIndex && item.section !== currentSection.value);


      if(valuesForm.quantityInvertersInstalledIsEquals !== valuesForm.quantityInvertersInstalled){
        if(currentSection.value === 'String'){
          
          valuesForm.quantityInvertersInstalledIsEquals = valuesForm.quantityInvertersInstalled
          addInvertersInPanelsConnectedSingleInputOfTheSingle(valuesForm.quantityInvertersInstalled)
        }
      }
   

      if (nextIndex !== -1) {
        if (props.dataArray[nextIndex].section === 'String') {
          if (valuesForm.inverterTypeInstalled === 'Inversor String') {
            currentSection.value = 'String';
          } else if (valuesForm.inverterTypeInstalled === 'Micro') {
            currentSection.value = 'Micro';
          }
        }else if (props.dataArray[nextIndex].section === 'Micro') {
          if (valuesForm.inverterTypeInstalled === 'Inversor String') {
            currentSection.value = 'Conexoes';
          } else{
            currentSection.value = 'Micro';
          }
        }else if(props.dataArray[nextIndex].section === 'Pagamento'){
          if(valuesForm.sendNFsForPaymentNow === 'Sim'){
            currentSection.value = 'Pagamento';
          }else{
            currentSection.value = 'Finalizacao';
          }
        }else {
          currentSection.value = props.dataArray[nextIndex].section;
        }
      }

      progress.value+=10
    }
  };

  // Função para navegar para a seção anterior
  const goToPreviousSection = () => {
    if(props.dataArray){
      const currentIndex = props.dataArray.findIndex((item) => item.section === currentSection.value);
      const previousIndex = props.dataArray.slice(0, currentIndex).reverse().findIndex((item) => item.section !== currentSection.value);
      if (previousIndex !== -1) {
        if (props.dataArray[currentIndex - previousIndex - 1].section === 'Entradas MPPT') {
          if (valuesForm.inverterTypeInstalled === 'Inversor String') {
            currentSection.value = 'Entradas MPPT';
          } else if (valuesForm.inverterTypeInstalled === 'Micro') {
            currentSection.value = 'Micro e String';
          }
        }else if (props.dataArray[currentIndex - previousIndex - 1].section === 'Micro') {
          if (valuesForm.inverterTypeInstalled === 'Inversor String') {
            currentSection.value = 'Entradas MPPT';
          } else if (valuesForm.inverterTypeInstalled === 'Micro') {
            currentSection.value = 'Micro';
          }
        }else if(props.dataArray[currentIndex - previousIndex - 1].section === 'Pagamento'){
          if(valuesForm.sendNFsForPaymentNow === 'Sim'){
            currentSection.value = 'Pagamento';
          }else{
            currentSection.value = 'Nota Fiscal';
          }
        }else {
          currentSection.value = props.dataArray[currentIndex - previousIndex - 1].section;
        }
      }
      progress.value-=10
    }
  };   

  const validationErrors = refVue<Record<string, string | undefined>>({});  

  const createDynamicValidation = () => {
    return yup
      .number()
      .typeError("Esta pergunta é obrigatória*")
      .required("Esta pergunta é obrigatória*")
      .test("dynamicValidation", "Erro de validação dinâmica", (value) => {
        if (typeof value !== 'undefined') {
          return true;
        }
        // Handle the case when value is undefined (considered invalid)
        console.log('Valor undefined, verifique se há algum campo vazio. valor:'+value)
        return false;
      });
  };

  function isPhotoChainInverterInputValid(photoChainInverterInput:any) {
    if (!Array.isArray(photoChainInverterInput)) {
      return false;
    }

    for (const item of photoChainInverterInput) {
      if (!item.inverter || !item.inverter.distMppt) {
        return false;
      }

      for (const mppt of item.inverter.distMppt) {
        if (!Array.isArray(mppt) || mppt.some((url) => typeof url !== "string")) {
          return false;
        }
      }
    }

    return true;
  }

  const distMpptSchema = yup
  .array()
  .of(yup.array().of(yup.lazy(createDynamicValidation)))
  .required("Esta pergunta é obrigatória*");

  const validationSchema = yup.object({
    qtdPanelsConnectedSingleInputOfTheSingle: yup
      .array()
      .of(
        yup.object().shape({
          inverter: yup.object().shape({
            name: yup.string().required("Esta pergunta é obrigatória*"),
            distMppt: distMpptSchema // Use the distMpptSchema here
          })
        })
      )
      .required("Esta pergunta é obrigatória*")
    ,
    photoVoltInverterInput: yup
    .array()
    .of(
      yup.object().shape({
        inverter: yup.object().shape({
          distMppt: yup
            .array()
            .of(
              yup.array()
                .of(yup.string().url("Esta pergunta é obrigatória*"))
                .min(1, "Esta pergunta é obrigatória*")
            )
            .min(1, "Esta pergunta é obrigatória*")
        })
      })
    )
    .required("Esta pergunta é obrigatória*"),

    photoChainInverterInput: yup
    .array()
    .of(
      yup.object().shape({
        inverter: yup.object().shape({
          distMppt: yup
            .array()
            .of(
              yup.array()
                .of(yup.string().url("Esta pergunta é obrigatória*"))
                .min(1, "Esta pergunta é obrigatória*")
            )
            .min(1, "Esta pergunta é obrigatória*")
        })
      })
    )
    .required("Esta pergunta é obrigatória*"),
    enterpriseName: yup.string().required("Esta pergunta é obrigatória*"),
    responsibleTech: yup.string().required("Esta pergunta é obrigatória*"),
    projectId: yup.number().typeError("Por favor, insira um número válido").required("Esta pergunta é obrigatória*").test('is-positive', 'O valor precisa ser maior que zero', value => value > 0),
    customerName: yup.string().required("Esta pergunta é obrigatória*"),
    installationStartDate: yup.date().required("Esta pergunta é obrigatória*"),
    installationFinalDate: yup.date().required("Esta pergunta é obrigatória*") .test('startDateBeforeFinalDate', "A data de término da instalação deve ser maior ou igual à data de início da instalação.", function () {
      const startDate = this.parent.installationStartDate;
      return this.parent.installationFinalDate && startDate ? this.parent.installationFinalDate >= startDate : true;
    }),
    photoFixingStructure: yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").required("Esta pergunta é obrigatória*"),
    photoGroundingModules: yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").required("Esta pergunta é obrigatória*"),
    photoInstalledPanels:  yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").required("Esta pergunta é obrigatória*"),
    photoConnectionsEletric: yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").required("Esta pergunta é obrigatória*"),
    photoInverterConnectionPoint: yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").required("Esta pergunta é obrigatória*"),
    photoFaceGroundingInverter: yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").required("Esta pergunta é obrigatória*"),
    photoGroundingAttachmentPoint:  yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").required("Esta pergunta é obrigatória*"),
    photoForVisualInspection: yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").required("Esta pergunta é obrigatória*"),
    photoCAPhaseAndNeutral: yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").required("Esta pergunta é obrigatória*"),
    photoCAPhaseAndPhase: yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").required("Esta pergunta é obrigatória*"),
    photoTagModules:  yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").required("Esta pergunta é obrigatória*"),
    photoIfProjectsWithBlocker: yup.array().max(10, "Você só pode escolher até 10 imagens/videos "),
    photoSNIfProjectsWithBlocker: yup.array().max(10, "Você só pode escolher até 10 imagens/videos "),
    photoInputPattern:  yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").required("Esta pergunta é obrigatória*"),
    photoBannerOfTheResidence:  yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").required("Esta pergunta é obrigatória*"),
    photoCircuitBreaker:  yup.array().max(10, "Você só pode escolher até 10 imagens/videos "),
    inverterTypeInstalled: yup.string().required("Esta pergunta é obrigatória*"),
    quantityInvertersInstalled: yup.number().required("Esta pergunta é obrigatória*").test('is-positive', 'O valor precisa ser maior que zero', value => value > 0),
    photoSNInverterString: yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").required("Esta pergunta é obrigatória*"),
    photoSNAntennaInverterString: yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").required("Esta pergunta é obrigatória*"),
    photoDetailedConnectionEletric: yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").required("Esta pergunta é obrigatória*"),
    photoInstallationOfInvertersCCAndCA: yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").required("Esta pergunta é obrigatória*"),
    locationInverterInstalled: yup.string().required("Esta pergunta é obrigatória*"),
    heightBetweenInverterDisplayAndFloor:  yup.number().required("Esta pergunta é obrigatória*"),
    inverterStringUsed: yup.array(),
    microInverterInstalled:  yup.string().required("Esta pergunta é obrigatória*"),
    quantityMicroInvertersInstalled:  yup.number().required("Esta pergunta é obrigatória*").test('is-positive', 'O valor precisa ser maior que zero', value => value > 0),
    howManyInvertersNotCompletelyFull:  yup.number().required("Esta pergunta é obrigatória*"),
    sketchModulesOnTheRoof: yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").required("Esta pergunta é obrigatória*"),
    photoSNOfAllMicroInverters: yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").required("Esta pergunta é obrigatória*"),
    photoSNOfAntennaMicroInverters: yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").required("Esta pergunta é obrigatória*"),
    thePanelsGroundedTogether:  yup.string().required("Esta pergunta é obrigatória*"),
    allRightCrimpagesConnectorsMC4:  yup.string().required("Esta pergunta é obrigatória*"),
    doubleIsulationCablesWereUsed:  yup.string().required("Esta pergunta é obrigatória*"),
    typeOfPipingUsedAtInstall:  yup.string().required("Esta pergunta é obrigatória*"),
    stringBInvertersAndQBInstallInCoveredPlace:  yup.string().required("Esta pergunta é obrigatória*"),
    whyNotStringBInvertersAndQBInstallInCoveredPlace:  yup.string(),
    installAccordingSinglelineDiagram:  yup.string().required("Esta pergunta é obrigatória*"),
    whyNotInstallAccordingSinglelineDiagram:  yup.string(),
    singlelineProjectDiagram: yup.array().max(10, "Você só pode escolher até 10 imagens/videos "),
    respectedMinimunSoacingInverters:  yup.string().required("Esta pergunta é obrigatória*"),
    whyNotRespectedMinimunSoacingInverters:  yup.string(),
    allStringChecked:  yup.string().required("Esta pergunta é obrigatória*"),
    whyNotAllStringChecked:  yup.string(),
    heldInspectionLocationAfterInstall:  yup.string().required("Esta pergunta é obrigatória*"),
    allEPIsAndEPCsWereUsed:  yup.string().required("Esta pergunta é obrigatória*"),
    photoUseEPIsAndEPCsNecessary: yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").test(
    "required",
    "Esta pergunta é obrigatória*",
    (value) => {
      if (valuesForm.allEPIsAndEPCsWereUsed === "Sim") {
        return value !== undefined && value !== null && value.toString() !== "";
      }
      return true;
    }),
    monitoringConnectedToHOLUAccount:  yup.string().required("Esta pergunta é obrigatória*"),
    whyNotMonitoringConnectedToHOLUAccount:  yup.string(),
    monitoringLogin:  yup.string().test(
    "required",
    "Esta pergunta é obrigatória*",
    (value) => {
      if (valuesForm.monitoringConnectedToHOLUAccount === "Sim") {
        return value !== undefined && value !== null && value.toString() !== "";
      }
      return true;
    }),
    monitoringPassword:  yup.string().test(
    "required",
    "Esta pergunta é obrigatória*",
    (value) => {
      if (valuesForm.monitoringConnectedToHOLUAccount === "Sim") {
        return value !== undefined && value !== null && value.toString() !== "";
      }
      return true;
    }),
    photoAppmonitoringCustomer: yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").test(
    "required",
    "Esta pergunta é obrigatória*",
    value => valuesForm.monitoringConnectedToHOLUAccount !== "Sim" || (value && value.length > 0)
    ),
    sendNFsForPaymentNow:  yup.string().required("Esta pergunta é obrigatória*"),
    uploadNFInPDFReferentSecondInstallment: yup.array().max(10, "Você só pode escolher até 10 imagens/videos ").test(
    "required",
    "Esta pergunta é obrigatória*",
    value => valuesForm.sendNFsForPaymentNow !== "Sim" || (value && value.length > 0)
    ),
    valueNFReferentSecontInstallment: yup.string().test(
    "required",
    "Esta pergunta é obrigatória*",
    (value) => {
      if (valuesForm.sendNFsForPaymentNow === "Sim") {
        return value !== undefined && value !== null && value.toString() !== "";
      }
      return true;
    }),
    uploadNFReferentExtraCosts: yup.array().max(10, "Você só pode escolher até 10 imagens/videos "),
    valueNFReferentExtraCosts: yup.string(),
    CNPJ: yup.string().test(
    "required",
    "Esta pergunta é obrigatória*",
    (value) => {
      if (valuesForm.sendNFsForPaymentNow === "Sim") {
        return value !== undefined && value !== null && value.toString() !== "";
      }
      return true;
    }),
    wayOfReceivePayment:  yup.string().required("Esta pergunta é obrigatória*"),
    typeKeyPIX:  yup.string().test(
    "required",
    "Esta pergunta é obrigatória*",
    (value) => {
      if (valuesForm.wayOfReceivePayment === "PIX") {
        return value !== undefined && value !== null && value.toString() !== "";
      }
      return true;
    }),
    PIX:  yup.string().test(
    "required",
    "Esta pergunta é obrigatória*",
    (value) => {
      if (valuesForm.wayOfReceivePayment === "PIX") {
        return value !== undefined && value !== null && value.toString() !== "";
      }
      return true;
    }),
    bank:  yup.string().test(
    "required",
    "Esta pergunta é obrigatória*",
    (value) => {
      if (valuesForm.wayOfReceivePayment === "TRANSFERÊNCIA") {
        return value !== undefined && value !== null && value.toString() !== "";
      }
      return true;
    }),
    bankAgency:  yup.string().test(
    "required",
    "Esta pergunta é obrigatória*",
    (value) => {
      if (valuesForm.wayOfReceivePayment === "TRANSFERÊNCIA") {
        return value !== undefined && value !== null && value.toString() !== "";
      }
      return true;
    }),
    currentAccount:  yup.string().test(
    "required",
    "Esta pergunta é obrigatória*",
    (value) => {
      if (valuesForm.wayOfReceivePayment === "TRANSFERÊNCIA") {
        return value !== undefined && value !== null && value.toString() !== "";
      }
      return true;
    }),
    pointsOfAttentionCustomerResidence:  yup.string().required("Esta pergunta é obrigatória*"),
  });   
  
  const hasValidationError = (fieldName: string) => {
    return validationErrors.value[fieldName] !== undefined;
  };

  const getValidationError = (fieldName: string) => {
    return validationErrors.value[fieldName];
  };

  const clearValidationError = (fieldName: string) => {
    validationErrors.value[fieldName] = undefined;
  };

  const validateForm = () => {
    const currentSectionQuestions = displayedQuestions.value.map((question: any) => question.name);

    const valuesFile = JSON.parse(localStorage.getItem('formsFiles') || '{}')
    const { photoVoltInverterInput, photoChainInverterInput } = valuesFile;
    const values = {...valuesForm, ...valuesFile, photoVoltInverterInput, photoChainInverterInput}

    const isValidPhotoChainInverterInput = isPhotoChainInverterInputValid(
      values.photoChainInverterInput
    );

    if (!isValidPhotoChainInverterInput) {
      validationErrors.value.photoChainInverterInput =
        "Por favor, escolha uma foto";
    } else {
      validationErrors.value.photoChainInverterInput = undefined; // Clear previous error message
    }

    const validationPromises = currentSectionQuestions.map((fieldName:any) =>
      validationSchema
        .validateAt(fieldName, values, { abortEarly: false })
        .catch((error) => ({ fieldName, error }))
    );

    Promise.all(validationPromises)
      .then((results) => {
        const errors = results.reduce((acc:any, result:any) => {
          if (result && result.error) {
            acc[result.fieldName] = result.error.message;
          }
          return acc;
        }, {});

        if (Object.keys(errors).length === 0) {
          goToNextSection();
        } else {
          validationErrors.value = errors;
        }
      });
  };

  const clearForm = () =>{
    localStorage.clear();
    window.location.reload();
  }
  const updateSection = (newValue: string) => {
    emit('section-updated', newValue);
  }

  const sendForm =() =>{
    isSendingForm = true
    emit('send-form')
  }

  onMounted(() => {
    const storedValues = localStorage.getItem('forms');
    if (storedValues) {
      Object.assign(valuesForm, JSON.parse(storedValues)); // Atribua os valores ao objeto valuesForm
    }
  });

  watch(currentSection, (newValue) => {
    
    scrollToTop();
    updateSection(newValue)
  });

  watch(valuesForm, () => {
    localStorage.setItem('forms', JSON.stringify(valuesForm)); // Acesse os valores diretamente em valuesForm
  });
  
  type ImageId = '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '22';

  const getImagePath = (id?: ImageId) => {
    
    if (id && id in imageMap) {
      return imageMap[id];
    }
  };

</script>

<template>

  <div class="container">
    <v-list class="bg-transparent" style="width: 100%;" id="questions-container">
      <v-list-item
        v-for="data in displayedQuestions"
        :key="data.name"
        style="width: 100%; min-height: 0 !important;"
      >
        <!-- 1 - PERGUNTAS, IDENTIFICACAO, FOTO GERAL, STRING E MICRO -->
        <div
          class="container-molecule-form"
          :class="{ 'is-invalid': validationErrors[data.name] }"
          v-if="
            data.section !== 'Micro'
            && data.section !== 'String'
            && data.section !== 'Entradas MPPT'
            && data.name !== 'whyNotStringBInvertersAndQBInstallInCoveredPlace'
            &&  data.name !== 'whyNotInstallAccordingSinglelineDiagram'
            &&  data.name !== 'whyNotRespectedMinimunSoacingInverters'
            &&  data.name !== 'whyNotAllStringChecked'
            &&  data.name !== 'whyNotMonitoringConnectedToHOLUAccount'
            &&  data.name !== 'uploadNFInPDFReferentSecondInstallment'
            &&  data.name !== 'valueNFReferentSecontInstallment'
            &&  data.name !== 'uploadNFReferentExtraCosts'
            &&  data.name !== 'valueNFReferentExtraCosts'
            &&  data.name !== 'CNPJ'
            &&  data.name !== 'wayOfReceivePayment'
            &&  data.name !== 'typeKeyPIX'
            &&  data.name !== 'PIX'
            &&  data.name !== 'bank'
            &&  data.name !== 'bankAgency'
            &&  data.name !== 'currentAccount'
          "
        >
          <labelVue 
            :text="data.id+'. '+data.question" 
            :name-input="data.name"  
            v-if="data.name !== 'quantityInvertersInstalled' && data.name !== 'emailInstaller'"
          />

          <labelVue 
            :text="data.question" 
            :name-input="data.name"  
            v-if="data.name === 'emailInstaller'"
          />
          <div v-if="data.typeOfResponse === 'file'" class="imagesDemo-container" :style="`background-image: url(${getImagePath(data.id as ImageId)}); background-color: transparent; background-position: center center; background-size: contain; background-repeat: no-repeat;`"/>

          <inputVue
            
            v-if="data.name === 'emailInstaller'"
            :name-input="data.name"
            :required-input="data.isRequired"
            :type-input="data.typeOfResponse"
            placeholder-input="Seu e-mail"
            v-model="valuesForm[data.name]"
            @change="clearValidationError(data.name)"
          />

          
          <inputVue
            
            v-if="
            data.name !== 'inverterTypeInstalled'
            && data.name !== 'microInverterInstalled'
            && data.name !== 'microInverterInstalled'
            && data.name !== 'stringBInvertersAndQBInstallInCoveredPlace'
            && data.name !== 'installAccordingSinglelineDiagram'
            && data.name !== 'respectedMinimunSoacingInverters'
            && data.name !== 'thePanelsGroundedTogether'
            && data.name !== 'allRightCrimpagesConnectorsMC4'
            && data.name !== 'doubleIsulationCablesWereUsed'
            && data.name !== 'typeOfPipingUsedAtInstall'
            && data.name !== 'allStringChecked'
            && data.name !== 'heldInspectionLocationAfterInstall'
            && data.name !== 'allEPIsAndEPCsWereUsed'
            && data.name !== 'monitoringConnectedToHOLUAccount'
            && data.name !== `sendNFsForPaymentNow`
            && data.name !== 'emailInstaller'
            && data.typeOfResponse !== 'file'

            "
            :name-input="data.name"
            :required-input="data.isRequired"
            :type-input="data.typeOfResponse"
            placeholder-input="Insira sua resposta"
            v-model="valuesForm[data.name]"
            @change="clearValidationError(data.name)"
          />

          <InputFile
            v-else-if="
              data.typeOfResponse === 'file'
            "
            :name-input="data.name"
            :required-input="data.isRequired"
            :type-input="data.typeOfResponse"
            placeholder-input="Insira sua resposta"
            :name-customer="valuesForm.customerName"
            :id-project="valuesForm.projectId"
            @change="(event: Event) => {
              clearValidationError(data.name);
            }"
          />

          <SelectVue v-if="data.name === 'inverterTypeInstalled'" v-model="valuesForm[data.name]"  name-select="inverterTypeInstalled" :required-input="data.isRequired" :items="['Inversor String', 'Micro']"  @change="clearValidationError(data.name)"/>

          <SelectVue 
            v-if="
              data.name === 'microInverterInstalled'
            "  
            name-select="microInverterInstalled" 
            :required-input="data.isRequired"
            :items="['APSYSTEMS DS3D 2000W','Enphase IQ7AM','Hoymiles - 1500 - 2MPPTS','Hoymiles 2000 - HMS-2000B-4T - 2MPPTS', 'Hoymiles 2000 - HMS-2000-4T - 4MPPTS']"
            v-model="valuesForm[data.name]"
            @change="clearValidationError(data.name)"
          /> 

          <!--  SELECT SIM/NÃO -->
          <SelectVue 
            v-if="
              data.name === 'thePanelsGroundedTogether'
              || data.name === 'allRightCrimpagesConnectorsMC4'
              || data.name === 'stringBInvertersAndQBInstallInCoveredPlace'
              || data.name === 'installAccordingSinglelineDiagram'
              || data.name === 'respectedMinimunSoacingInverters'
              || data.name === 'doubleIsulationCablesWereUsed'
              || data.name === 'allStringChecked'
              || data.name === 'heldInspectionLocationAfterInstall'
              || data.name === 'allEPIsAndEPCsWereUsed'
              || data.name === 'monitoringConnectedToHOLUAccount'
              || data.name === `sendNFsForPaymentNow`
            "  
            :name-select="data.name" 
            :required-input="data.isRequired"
            :items="['Sim', 'Não']"
            v-model="valuesForm[data.name]"
            @change="clearValidationError(data.name)"
          />  

          <SelectVue 
            v-if="
              data.name === 'typeOfPipingUsedAtInstall'
            "  
            :name-select="data.name" 
            :required-input="data.isRequired"
            :items="['Conduíte corrugado anti-chamas embutido','Conduíte corrugado anti-chamas','Eletroduto galvanizado (chapa média)', 'Eletroduto PVC anti-chamas', 'Eletrocalha galvanizada (chapa média)']"
            v-model="valuesForm[data.name]"
            @change="clearValidationError(data.name)"
          /> 

          <span v-if="hasValidationError(data.name)" class="error-message">
            <v-icon left class="info-icon">mdi-information</v-icon>
            <span>{{ getValidationError(data.name) }}</span>
          </span>
        </div>

          <!--    PERGUNTAS POR QUE NÃO -->
        <div
          v-if="
            data.name === 'whyNotStringBInvertersAndQBInstallInCoveredPlace'
            && valuesForm.stringBInvertersAndQBInstallInCoveredPlace === 'Não'
            || data.name === 'whyNotInstallAccordingSinglelineDiagram'
            && valuesForm.installAccordingSinglelineDiagram === 'Não'
            || data.name ===  'whyNotRespectedMinimunSoacingInverters'
            && valuesForm.respectedMinimunSoacingInverters === 'Não'
            || data.name === 'whyNotAllStringChecked'
            && valuesForm.allStringChecked === 'Não'
            ||  data.name === 'whyNotMonitoringConnectedToHOLUAccount'
            && valuesForm.monitoringConnectedToHOLUAccount === 'Não'
          "
          class="container-molecule-form"
          :class="{ 'is-invalid': validationErrors[data.name] }"
        >

          <labelVue 
            :text="data.id+'. '+data.question" 
            :name-input="data.name"  
          />
          <inputVue
            @change="clearValidationError(data.name)"
            
            :name-input="data.name"
            :required-input="data.isRequired"
            :type-input="data.typeOfResponse"
            placeholder-input="Insira sua resposta"
            v-model="valuesForm[data.name]"
           
          />
          <span v-if="hasValidationError(data.name)" class="error-message">
            <v-icon left class="info-icon">mdi-information</v-icon>
            <span>{{ getValidationError(data.name) }}</span>
          </span>
        </div>

        <!-- 2 - PERGUNTAS SE INVERSOR MICRO -->
        <div
          class="container-molecule-form"
          :class="{ 'is-invalid': validationErrors[data.name] }"
          v-if="
            data.section === 'Micro'
          "
        >
          <labelVue 
            :text="data.id+'. '+data.question" 
            :name-input="data.name"  
          />
          <div v-if="data.typeOfResponse === 'file'" class="imagesDemo-container" :style="`background-image: url(${getImagePath(data.id as ImageId)}); background-color: transparent; background-position: center center; background-size: contain; background-repeat: no-repeat;`"/>
          <inputVue
            @change="clearValidationError(data.name)"
            v-if="
              data.name !== 'microInverterInstalled'
              && data.typeOfResponse !== 'file'
            " 
            :name-input="data.name"
            :required-input="data.isRequired"
            :type-input="data.typeOfResponse"
            placeholder-input="Insira sua resposta"
            v-model="valuesForm[data.name]"
          />
          <InputFile
             :name-customer="valuesForm.customerName"
            :id-project="valuesForm.projectId"
            v-else-if="
              data.typeOfResponse === 'file'
            "
            :name-input="data.name"
            :required-input="data.isRequired"
            :type-input="data.typeOfResponse"
            placeholder-input="Insira sua resposta"
            @change="() => {
              clearValidationError(data.name);
            }"
          />

          <SelectVue 
            v-if="
              data.name === 'microInverterInstalled'
            "  
            name-select="microInverterInstalled" 
            :required-input="data.isRequired"
            :items="['APSYSTEMS DS3D 2000W','Enphase IQ7AM','Hoymiles - 1500 - 2MPPTS','Hoymiles 2000 - HMS-2000B-4T - 2MPPTS', 'Hoymiles 2000 - HMS-2000-4T - 4MPPTS']"
            v-model="valuesForm[data.name]"
            @change="clearValidationError(data.name)"
          /> 

          <span v-if="hasValidationError(data.name)" class="error-message">
            <v-icon left class="info-icon">mdi-information</v-icon>
            <span>{{ getValidationError(data.name) }}</span>
          </span>
        </div>

        <!-- 3 - PERGUNTAS SE INVERSOR STRING -->
        <div
          class="container-molecule-form"
          :class="{ 'is-invalid': validationErrors[data.name] }"
          v-if="
            data.section === 'String'
            && valuesForm.inverterTypeInstalled === 'Inversor String'
          "
        >
          <labelVue 
            :text="data.id+'. '+data.question"  
            :name-input="data.name"  
          />
          <div v-if="data.typeOfResponse === 'file'" class="imagesDemo-container" :style="`background-image: url(${getImagePath(data.id as ImageId)}); background-color: transparent; background-position: center center; background-size: contain; background-repeat: no-repeat;`"/>
          <inputVue
            @change="clearValidationError(data.name)"
            v-if="
              data.name !== 'microInverterInstalled'
              && data.typeOfResponse !== 'file'
            " 
            :name-input="data.name"
            :required-input="data.isRequired"
            :type-input="data.typeOfResponse"
            placeholder-input="Insira sua resposta"
            v-model="valuesForm[data.name]"
          />

          <InputFile
             :name-customer="valuesForm.customerName"
            :id-project="valuesForm.projectId"
            v-else-if="
              data.typeOfResponse === 'file'
            "
            :name-input="data.name"
            :required-input="data.isRequired"
            :type-input="data.typeOfResponse"
            placeholder-input="Insira sua resposta"
            @change="() => {
              clearValidationError(data.name);
            }"
          />
         
          <span v-if="hasValidationError(data.name)" class="error-message">
            <v-icon left class="info-icon">mdi-information</v-icon>
            <span>{{ getValidationError(data.name) }}</span>
          </span>
        </div>

        <!-- REPETIÇÃO DA PERGUNTA 30 e em seguida 31,32,33 - INVERSOR STRING-->
        <div 
          v-else-if="
            data.section === 'Entradas MPPT'
            && valuesForm.inverterTypeInstalled === 'Inversor String'
            && valuesForm.quantityInvertersInstalled > 0
          "
        >
          <div v-for="(inverter,index) in Number(valuesForm.quantityInvertersInstalled)" :key="index">
            
            <div class="container-molecule-form" :class="{ 'is-invalid': validationErrors['qtdPanelsConnectedSingleInputOfTheSingle'] }" v-if="data.name === 'inverterStringUsed'">
              <labelVue :text="'Qual o '+ (inverter) +'º inversor string utilizado?'" :name-input="data.name"/>
              <SelectVue 
                :name-select="data.name"
                :required-input="data.isRequired"
                :items="inverterNames"
                v-model="valuesForm.qtdPanelsConnectedSingleInputOfTheSingle[inverter-1].inverter.name"
                @update:menu="(e: Event) =>{
                  clearValidationError('qtdPanelsConnectedSingleInputOfTheSingle')
                  valuesForm[data.name + (index + 1)] = valuesForm.qtdPanelsConnectedSingleInputOfTheSingle[inverter-1].inverter.name
                  updateDistMppt(valuesForm.qtdPanelsConnectedSingleInputOfTheSingle[inverter-1].inverter.name, inverter-1)
                }"
              /> 
              <span v-if="hasValidationError('qtdPanelsConnectedSingleInputOfTheSingle')" class="error-message">
                <v-icon left class="info-icon">mdi-information</v-icon>
                <span>{{ getValidationError('qtdPanelsConnectedSingleInputOfTheSingle') }}</span>
              </span>
            </div>

            <template v-for="(inverterItem, itemIndex) in invertersArray" :key="itemIndex">
              <template
                v-if="
                  valuesForm[data.name + (index + 1)] === inverterItem.name
                "
              >
                <div v-for="(mppt, mpptIndex) in inverterItem.MPPT" :key="mpptIndex">
                  <div v-for="(input, inputIndex) in mppt.numberOfInputs" :key="inputIndex" >
                    <div v-if="valuesForm[data.name + (index + 1)] === inverterItem.name" class="container-molecule-form" :class="{ 'is-invalid': validationErrors['qtdPanelsConnectedSingleInput'+input+'OfTheSingle'+mppt.name+'Of'+inverter+'º'+inverterItem.name] }">
                      <labelVue :text="'Quantos painéis foram conectados a '+input+' entrada do '+mppt.name+' deste inversor?'" :name-input="'qtdPanelsConnectedSingleInput'+input+'OfTheSingle'+mppt.name+'Of'+inverter+'º'+inverterItem.name"/>
                      <inputVue
                        @change="clearValidationError('qtdPanelsConnectedSingleInputOfTheSingle')" 
                        :name-input="'qtdPanelsConnectedSingleInput'+input+'OfTheSingle'+mppt.name+'Of'+inverter+'º'+inverterItem.name"
                        :required-input="data.isRequired"
                        type-input="number"
                        placeholder-input="Insira sua resposta"
                        v-model="valuesForm.qtdPanelsConnectedSingleInputOfTheSingle[inverter-1].inverter.distMppt[mpptIndex][input-1]"
                      />
                      <span v-if="hasValidationError('qtdPanelsConnectedSingleInput'+input+'OfTheSingle'+mppt.name+'Of'+inverter+'º'+inverterItem.name)" class="error-message">
                        <v-icon left class="info-icon">mdi-information</v-icon>
                        <span>{{ getValidationError('qtdPanelsConnectedSingleInput'+input+'OfTheSingle'+mppt.name+'Of'+inverter+'º'+inverterItem.name) }}</span>
                      </span>
                    </div>

                      <!-- foto tensão  -->
                    <div :key="`input-${mpptIndex}`" class="container-molecule-form" :class="{ 'is-invalid': validationErrors['photoVoltInverterInput'] }">
                        <div v-if="valuesForm[data.name + (index + 1)] === inverterItem.name">
                          <labelVue text="32. Envie uma foto da tensão dessa entrada do inversor" :name-input="'photoVoltInverterInput'+'Of'+inverter+'º'+inverterItem.name"/>
                          <div class="imagesDemo-container" :style="`background-image: url(${getImagePath('33' as ImageId)}); background-color: lightgray; background-position: 50%; background-size: cover; background-repeat: no-repeat;`"/>
                          <InputFile
                          
                            :name-input="'photoVoltInverterInput'+inverter+'º'+mpptIndex+'input'+inputIndex"
                            :required-input="data.isRequired"
                            type-input="file"
                            placeholder-input="Insira sua resposta"
                            @change="(event: Event) => {
                              clearValidationError('photoVoltInverterInput');
                            
                            }"
                            :inverter="Number(index)"
                            :mppt="mpptIndex"
                            :quantityInverter="valuesForm.quantityInvertersInstalled"  
                            :lenghtMppt="inverterItem.MPPT.length"
                            :input="inputIndex"
                            :quantity-input="mppt.numberOfInputs"
                            :id-project="valuesForm.projectId"
                            max="1"
                          />
                          
                        </div>
                        <span v-if="hasValidationError('photoVoltInverterInput')" class="error-message">
                          <v-icon left class="info-icon">mdi-information</v-icon>
                          <span>{{ getValidationError('photoVoltInverterInput') }}</span>
                        </span>
                    </div>

                   <!-- foto corrente -->
                  
                    <div  class="container-molecule-form" :class="{ 'is-invalid': validationErrors['photoChainInverterInput'] }">
                      <div v-if="valuesForm[data.name + (index + 1)] === inverterItem.name">
                        <labelVue text="33. Envie uma foto da corrente dessa entrada do inversor" :name-input="'photoChainInverterInput'+'Of'+inverter+'º'+inverterItem.name"/>
                        <div class="imagesDemo-container" :style="`background-image: url(${getImagePath('34' as ImageId)});png); background-color: lightgray; background-position: 50%; background-size: cover; background-repeat: no-repeat;`"/>
                        <InputFile
                        
                          :name-input="'photoChainInverterInput'+inverter+'º'+mpptIndex+'input'+inputIndex"
                          :required-input="data.isRequired"
                          type-input="file"
                          placeholder-input="Insira sua resposta"
                          @change="(event: Event) => {
                            clearValidationError('photoChainInverterInput');
                          }"
                          :inverter="Number(index)"
                          :mppt="mpptIndex"
                          :quantityInverter="valuesForm.quantityInvertersInstalled"  
                          :lenghtMppt="inverterItem.MPPT.length"
                          :input="inputIndex"
                          :quantity-input="mppt.numberOfInputs"
                          :id-project="valuesForm.projectId"
                          max="1"
                        />
                      </div>
                      <span v-if="hasValidationError('photoChainInverterInput')" class="error-message">
                        <v-icon left class="info-icon">mdi-information</v-icon>
                        <span>{{ getValidationError('photoChainInverterInput') }}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </template>
            </template>
          </div>
        </div>  

        <!--  NOTA FISCAL -->
        <div
          class="container-molecule-form"
          :class="{ 'is-invalid': validationErrors[data.name] }"
          v-if="
            data.name !== 'sendNFsForPaymentNow'
            && valuesForm.sendNFsForPaymentNow === 'Sim'
            && data.section === 'Nota Fiscal'
            
          "
        >
          <labelVue 
            :text="data.id+'. '+data.question" 
            :name-input="data.name"  
          />
          
          <inputVue
            
            v-if="
             data.typeOfResponse !== 'file'
             && data.name !== 'CNPJ'
            "
            :name-input="data.name"
            :required-input="data.isRequired"
            :type-input="data.typeOfResponse"
            placeholder-input="Insira sua resposta"
            v-model="valuesForm[data.name]"
            @change="clearValidationError(data.name)"
          />

          <inputVue
            
            v-if="
             data.typeOfResponse !== 'file'
             && data.name === 'CNPJ'
            "
            :name-input="data.name"
            :required-input="data.isRequired"
            :type-input="data.typeOfResponse"
            placeholder-input="00.000.000/0000-00"
            v-model="valuesForm[data.name]"
            @change="clearValidationError(data.name)"
          />
          <InputFile
             :name-customer="valuesForm.customerName"
            :id-project="valuesForm.projectId"
            v-else-if="
              data.typeOfResponse === 'file'
            "
            :name-input="data.name"
            :required-input="data.isRequired"
            :type-input="data.typeOfResponse"
            placeholder-input="Insira sua resposta"
            @change="(event: Event) => {
              clearValidationError(data.name);
            }"
          />

          <span v-if="hasValidationError(data.name)" class="error-message">
            <v-icon left class="info-icon">mdi-information</v-icon>
            <span>{{ getValidationError(data.name) }}</span>
          </span>
        </div>

        <!--  PAGAMENTO -->
        <div
          class="container-molecule-form"
          :class="{ 'is-invalid': validationErrors[data.name] }"
          v-if="
            valuesForm.sendNFsForPaymentNow === 'Sim'
            && data.section === 'Pagamento'
            && data.name !== 'sendNFsForPaymentNow'
            && data.name !== 'typeKeyPIX'
            && data.name !== 'PIX'
            && data.name !== 'bank'
            && data.name !== 'bankAgency'
            && data.name !== 'currentAccount'
          "
        >
          <labelVue 
            :text="data.id+'. '+data.question" 
            :name-input="data.name"  
          />
          
          <inputVue
            
            v-if="
             data.typeOfResponse !== 'file'
             && data.name !== 'wayOfReceivePayment'
            "
            :name-input="data.name"
            :required-input="data.isRequired"
            :type-input="data.typeOfResponse"
            placeholder-input="Insira sua resposta"
            v-model="valuesForm[data.name]"
            @change="clearValidationError(data.name)"
          />

          <InputFile
             :name-customer="valuesForm.customerName"
            :id-project="valuesForm.projectId"
            v-else-if="
              data.typeOfResponse === 'file'
            "
            :name-input="data.name"
            :required-input="data.isRequired"
            :type-input="data.typeOfResponse"
            placeholder-input="Insira sua resposta"
            @change="(event: Event) => {
              clearValidationError(data.name);
            }"
          />

          <SelectVue 
            v-if="
              data.name === 'wayOfReceivePayment'
            "  
            name-select="wayOfReceivePayment" 
            :required-input="data.isRequired"
            :items="['PIX', 'TRANSFERÊNCIA']"
            v-model="valuesForm[data.name]"
            @change="clearValidationError(data.name)"
          /> 
          <span v-if="hasValidationError(data.name)" class="error-message">
            <v-icon left class="info-icon">mdi-information</v-icon>
            <span>{{ getValidationError(data.name) }}</span>
          </span>
        </div>
        <!-- SE PIX -->
        <div
          class="container-molecule-form"
          :class="{ 'is-invalid': validationErrors[data.name] }"
          v-if="
            valuesForm.wayOfReceivePayment === 'PIX'
            && data.section === 'Pagamento'
            && data.name !== 'uploadNFInPDFReferentSecondInstallment'
            && data.name !== 'valueNFReferentSecontInstallment'
            && data.name !== 'uploadNFReferentExtraCosts'
            && data.name !== 'valueNFReferentExtraCosts'
            && data.name !== 'CNPJ'
            && data.name !== 'wayOfReceivePayment'
            && data.name !== 'sendNFsForPaymentNow'
            && data.name !== 'bank'
            && data.name !== 'bankAgency'
            && data.name !== 'currentAccount'

          "
        >
          <labelVue 
            :text="data.id+'. '+data.question" 
            :name-input="data.name"  
          />
          <div v-if="data.typeOfResponse === 'file'" class="imagesDemo-container" :style="`background-image: url(${getImagePath(data.id as ImageId)}); background-color: transparent; background-position: center center; background-size: contain; background-repeat: no-repeat;`"/>
          <inputVue
            @change="clearValidationError(data.name)"
            v-if="
             data.typeOfResponse !== 'file'
             && data.name !== 'typeKeyPIX'
            "
            :name-input="data.name"
            :required-input="data.isRequired"
            :type-input="data.typeOfResponse"
            placeholder-input="Insira sua resposta"
            v-model="valuesForm[data.name]"
           
          />

          <InputFile
             :name-customer="valuesForm.customerName"
            :id-project="valuesForm.projectId"
            v-else-if="
              data.typeOfResponse === 'file'
            "
            :name-input="data.name"
            :required-input="data.isRequired"
            :type-input="data.typeOfResponse"
            placeholder-input="Insira sua resposta"
            @change="(event: any) => {
              clearValidationError(data.name);
              valuesForm[data.name] = [event.target.files];
            }"
          />

          <SelectVue 
            v-if="
              data.name === 'typeKeyPIX'
            "  
            name-select="wayOfReceivePayment" 
            :required-input="data.isRequired"
            :items="['CNPJ', 'Telefone', 'E-mail']"
            v-model="valuesForm[data.name]"
            @change="clearValidationError(data.name)"
          /> 
          <span v-if="hasValidationError(data.name)" class="error-message">
            <v-icon left class="info-icon">mdi-information</v-icon>
            <span>{{ getValidationError(data.name) }}</span>
          </span>
        </div>

        <!-- SE TRANSFERÊNCIA -->
        <div
          class="container-molecule-form"
          :class="{ 'is-invalid': validationErrors[data.name] }"
          v-if="
            valuesForm.wayOfReceivePayment === 'TRANSFERÊNCIA'
            && data.section === 'Pagamento'
            && data.name !== 'uploadNFInPDFReferentSecondInstallment'
            && data.name !== 'valueNFReferentSecontInstallment'
            && data.name !== 'uploadNFReferentExtraCosts'
            && data.name !== 'valueNFReferentExtraCosts'
            && data.name !== 'CNPJ'
            && data.name !== 'wayOfReceivePayment'
            && data.name !== 'sendNFsForPaymentNow'
            && data.name !== 'typeKeyPIX'
            && data.name !== 'PIX'
          "
        >
          <labelVue 
            :text="data.id+'. '+data.question" 
            :name-input="data.name"  
          />
          <inputVue
            @change="clearValidationError(data.name)"
            v-if="
             data.typeOfResponse !== 'file'
            "
            :name-input="data.name"
            :required-input="data.isRequired"
            :type-input="data.typeOfResponse"
            placeholder-input="Insira sua resposta"
            v-model="valuesForm[data.name]"
           
          />
          <span v-if="hasValidationError(data.name)" class="error-message">
            <v-icon left class="info-icon">mdi-information</v-icon>
            <span>{{ getValidationError(data.name) }}</span>
          </span>
        </div>
      </v-list-item>
    </v-list>
    <div class="container-buttons">
      <v-btn  @click="goToPreviousSection" :disabled="currentSection === 'Identificacao' ? true : false">Anterior</v-btn>
      <div class="container-progress-bar">
        <v-progress-linear v-model="progress" :max="valuesForm.inverterTypeInstalled === 'Inversor String' ? valuesForm.sendNFsForPaymentNow === 'Sim' ? '100' : '90' :  valuesForm.sendNFsForPaymentNow === 'Sim' ? '90' : '80'" color="#1f4997"></v-progress-linear>
      </div>
      <v-btn v-if="currentSection !== 'Finalizacao'"  @click="validateForm" >Próximo</v-btn>
      <v-btn v-if="currentSection === 'Finalizacao'" :disabled="isSendingForm"  @click="sendForm">Enviar</v-btn>
    </div>
    <div class="container-clear">
      <v-btn class="clear" @click.prevent="clearForm">Limpar formulário</v-btn>
    </div>
  </div>  
 
</template>

<style>
.container{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}

.container-molecule-form {  
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 0.5rem 0;
  gap: 1rem;
  background-color: #FFF;
  border-radius: 0.5rem;
  border: 1px solid var(--gray-400, #CCC);
}

.container-clear{
  width: inherit;
  display: flex;
  margin-top: 1rem;
  padding-left: 2.5rem;
  justify-content: start;
}


@media screen and (max-width:480px) {
  .container-molecule-form{
    padding: 1rem;
  }
}

.imagesDemo-container {
  width: 100%;
  height: 14rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
}

.container-buttons{
  width: 88%;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 1rem;
}

 button:disabled{
  opacity: .5;
  cursor: not-allowed;
 }

 .container-progress-bar{
    
    width: 80%;
    display: flex;
    justify-content: flex-start;
    
  }

  .is-invalid {
    border-color: rgb(217,48,37);
  }
  .error-message {
    color: rgb(217,48,37);
    display: flex;
    gap: .4rem;
    justify-content: left;
    align-items: center;
  }
  .info-icon{
    color: rgb(217,48,37);  
  }
</style>

