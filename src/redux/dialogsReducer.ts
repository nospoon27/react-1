import { DialogType, MessageType } from '../types/types';
import { InferActionTypes } from './reduxStore';


let initialState = {
   dialogs: [
      {
         id: 1,
         name: 'Дим1',
      },
      {
         id: 2,
         name: 'Дим2',
      },
      {
         id: 3,
         name: 'Дим3',
      },
      {
         id: 4,
         name: 'Дим4',
      },
      {
         id: 5,
         name: 'Дим5',
      },
   ] as Array<DialogType>,
   messages: [
      {
         id: 1,
         message: 'Hi',
      },
      {
         id: 2,
         message: 'Hello',
      },
      {
         id: 3,
         message: 'Bye',
      },
      {
         id: 4,
         message: 'Yo',
      },
      {
         id: 5,
         message: 'Get cash',
      },
      {
         id: 6,
         message: 'Welcome',
      },
   ] as Array<MessageType>,
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionsType) => {
   switch (action.type) {
      case 'dialogs/SEND_MESSAGE': {
         let body = action.newMessageBody
         let messages = state.messages
         let lastId = messages[messages.length - 1].id
         return {
            ...state,
            messages: [
               ...state.messages,
               {
                  id: lastId + 1,
                  message: body,
               },
            ],
         }
      }
      default:
         return state
   }
}

type ActionsType = InferActionTypes<typeof actions>
export const actions = {
  sendMessageCreator: (newMessageBody: string) => ({ type: 'dialogs/SEND_MESSAGE', newMessageBody } as const),
}

export default dialogsReducer
