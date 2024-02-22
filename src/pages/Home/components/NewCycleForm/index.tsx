import { FormContainer, TaskInput, MinutesAmountInput } from './styles'

import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function NewCicleForm() {
  const { activeCycle, cycles } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
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
        {cycles.map((cycle) => {
          return `<option value="${cycle.task}">${cycle.task}</option>`
        })}
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
  )
}
