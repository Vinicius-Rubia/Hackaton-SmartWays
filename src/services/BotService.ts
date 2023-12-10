import store from "@/redux/store";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
import { SmartService } from "./SmartService";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const url = "https://api.openai.com/v1/chat/";

const configuration = new Configuration({
  organization: "org-vEutXM29yu8vLvtWQqRDPnws",
  apiKey,
});

const openai = new OpenAIApi(configuration);

async function setDeal(customerId: string, methodPayment: string) {
  try {
    const response = await SmartService.post<any>(`Deals/setDeal?customerId=${customerId}&isPaid=true`, undefined);

    const message = `Diga ao cliente que teve sucesso em fazer o acordo, não diga pagamento (precisa ser essa palavra: 'acordo') via ${methodPayment}. Se o método de pagamento for pix, gere uma chave aleatoria de caracteres seguindo um modelo parecido com esse: 0002058569822br.gov.bcb.pix2563pix.banco.com.br/qr/v2/${customerId}. Se o método de pagamento for boleto, gere uma linha digitável seguindo esse modelo: 34191.23456 12345.678901 12345.678901 1 12345678901234. Se o método de pagamento for cartão de crédito, gere um link para que ele possar pagar seguindo esse um modelo parecido com esse: https://smartways.com/pagamento?chave=cdjvnfnbnfd.34D23dGD3t. Apresente ao cliente somente a informação que tenha relação do método de pagamento escolhido. Não apresente as outras informações de outro meio de pagamento.`;

    return message;
  } catch (err) {
    return "Houve um problema em realizar o pagamento. Tente novamente mais tarde."
  }
}

async function getDebts(customerId: string) {
  try {
    const response = await SmartService.get<any>(`Debts/getDebts?customerId=${customerId}`);
    const debts = response;

    let argumentsObj = JSON.stringify(debts);
    const message = `Apresente essas faturas ${argumentsObj} ao cliente uma por uma de maneira clara, simpática e amigável, e no fim apresente um resumo com o valor valor total(use a propriedade value) que o cliente vai pagar somando as faturas calculando os descontos e pergunte se vai querer pagar dando a opção de boleto pix ou cartão de crédito. Exemplo: ID da Fatura: ${debts[0].dealId}. O valor dessa fatura é: R$${debts[0].value},00 e você tem um desconto de: R$${debts[0].discount},00 reais. No ID da Fatura mostre o valor do dealId e não mostre ao cliente o customerId, o paymentId e nem o isPaid.`;
    return message;
  } catch (err) {
    return "Houve um problema em consultar suas faturas. Tente novamente mais tarde."
  }
}

async function post<T>(path: string): Promise<T> {
  const messagesRedux = store.getState().chatModel.messages.filter((item) => item.message);
  const context = store.getState().chatModel.context;

  const allMessageIA = messagesRedux.reduce((acumulador, item) => {
    if (item.author === 'IA') {
      acumulador += item.message + '\n';
    }
    return acumulador;
  }, '');

  const allMessageUser = messagesRedux.reduce((acumulador, item) => {
    if (item.author === 'user') {
      acumulador += item.message + '\n';
    }
    return acumulador;
  }, '');

  let messages: any = [
    {
      role: "system",
      content: context,
    },
    { role: "user", content: allMessageUser },
    { role: "assistant", content: allMessageIA },
  ]
  
  let chat = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
    functions: [
      {
        name: "getDebts",
        description: "Trás as faturas do cliente a partir do customerId informado pelo cliente",
        parameters: {
          type: "object",
          properties: {
            customerId: {
              tpye: "string",
              description: "Seguência de 11 caracteres númericos que é o customerId do cliente. customerId serve para conseguir buscar as faturas do cliente",
            }
          },
          require: ["customerId"],
        },
      },
      {
        name: "setDeal",
        description: "Realiza o acordo da fatura do cliente de acordo com o método de pagamento informado sendo boleto, pix ou cartão de crédito",
        parameters: {
          type: "object",
          properties: {
            customerId: {
              tpye: "string",
              description: "Seguência de 11 caracteres númericos que é o customerId do cliente",
            },
            methodPayment: {
              tpye: "string",
              description: "método de pagamento para pagar as contas, sendo boleto, pix ou cartão de crédito",
            }
          },
          require: ["customerId", "methodPayment"],
        },
      },
    ],
    function_call: "auto",
  });

  let wantsToUseFunction = chat.data.choices[0].finish_reason === "function_call";
  let content = "";

  if (wantsToUseFunction) {
    if (chat.data.choices[0].message?.function_call?.name === "getDebts") {
      let argumentsObj = JSON.parse(chat.data.choices[0].message!.function_call!.arguments!);
      content = await getDebts(argumentsObj.customerId).then((data) => JSON.stringify(data));
      messages.push(chat.data.choices[0].message);
      messages.push({
        role: "function",
        name: "getDebts",
        content,
      });
    }

    if (chat.data.choices[0].message?.function_call?.name === "setDeal") {
      let argumentsObj = JSON.parse(chat.data.choices[0].message!.function_call!.arguments!);
      content = await setDeal(argumentsObj.customerId, argumentsObj.methodPayment);
      messages.push(chat.data.choices[0].message);
      messages.push({
        role: "function",
        name: "setDeal",
        content,
      });
    }
  }

  try {
    const resp = await axios.post<T>(url + path, { 
      messages,
      model: "gpt-3.5-turbo",
      max_tokens: 500,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    return resp.data;
  } catch (e: any) {
    return e;
  }
};

export const BotService = {
  post,
};