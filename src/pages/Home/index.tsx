import { HandPalm, Play } from 'phosphor-react'
import { useContext } from 'react'
import { HomeContainer } from './styles'
import { NewCicleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import {
  StartCountdownButton,
  StopCountdownButton,
} from './components/Countdown/styles'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { CyclesContext } from '../../contexts/CyclesContext'

// Validação
const newCicleFormValidation = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O clico precisa ser entre 5 e 60 minutos!')
    .max(60, 'O clico precisa ser entre 5 e 60 minutos!'),
})

// Interface automatica a partir do form validation do zod
type newCycleProps = zod.infer<typeof newCicleFormValidation>

export function Home() {
  const { activeCycle, createNewCycle, interruptCycle } =
    useContext(CyclesContext)
  // Hook Form
  const newCycleForm = useForm<newCycleProps>({
    resolver: zodResolver(newCicleFormValidation),
    defaultValues: {
      task: '',
      minutesAmount: 1,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: newCycleProps) {
    createNewCycle(data)
    reset()
  }

  // Pegar o valor atualizado de task
  const task = watch('task')
  // Validação pra desabilitar o formulario
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCicleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCycle}>
            <HandPalm size={24} /> Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} /> Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
