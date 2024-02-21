import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  StartCountdownButton,
  TaskInput,
  MinutesAmountInput,
  StopCountdownButton,
} from './styles'

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

interface Cycle {
  id: string
  task: string
  MinutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  // Hook Form
  const { register, handleSubmit, watch, reset } = useForm<newCycleProps>({
    resolver: zodResolver(newCicleFormValidation),
    defaultValues: {
      task: '',
      minutesAmount: 1,
    },
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const totalSeconds = activeCycle ? activeCycle.MinutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )
        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )
          setActiveCycleId(null)
          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId])

  function handleCreateNewCycle(data: newCycleProps) {
    // Novo Clico Object
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      MinutesAmount: data.minutesAmount,
      task: data.task,
      startDate: new Date(),
    }
    // Setar o novo ciclo
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
    // Resetar os inputs
    reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  // Titulo da Pagina
  useEffect(() => {
    if (activeCycle && activeCycleId) {
      document.title = `${activeCycle.task} - ${minutes}:${seconds}`
    } else {
      document.title = `Timer`
    }
  }, [minutes, seconds, activeCycle, activeCycleId])

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
            disabled={!!activeCycle}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            min={1}
            max={60}
            step={1}
            placeholder="00"
            type="number"
            id="minutesAmount"
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>
        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
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
