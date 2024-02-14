import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  StartCountdownButton,
  TaskInput,
  MinutesAmountInput,
} from './styles'

// Validação
const newCicleFormValidation = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O clico precisa ser entre 5 e 60 minutos!')
    .max(60, 'O clico precisa ser entre 5 e 60 minutos!'),
})

// Interface automatica a partir do form validation do zod
type NewClicleProps = zod.infer<typeof newCicleFormValidation>

export function Home() {
  // Hook Form
  const { register, handleSubmit, watch, reset } = useForm<NewClicleProps>({
    resolver: zodResolver(newCicleFormValidation),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  })

  function handleCreateNewCycle(data: NewClicleProps) {
    console.log(data)
    reset()
  }

  // Pegar o valor atualizado de task
  const task = watch('task')
  // Validação pra desabilitar o formulario
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            list="task-suggestions"
            id="task"
            placeholder="Nome do projeto"
            type="text"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            min={5}
            max={60}
            step={5}
            placeholder="00"
            type="number"
            id="minutesAmount"
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} /> Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
