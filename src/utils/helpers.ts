import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(duration)
dayjs.extend(relativeTime)

export const money = (value: string | number) => {
  let num = 0

  if (typeof value === 'number') {
    num = value
  } else {
    num = Number(value)
  }

  return (num || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export const dateFormated = (
  value: string | number,
  type: 'digit' | 'long',
  withHour?: boolean
) => {
  const date = new Date(value)

  if (type === 'digit') {
    if (withHour) {
      return `${dayjs(value).format('DD/MM/YYYY')} às ${dayjs(value)
        .utcOffset(-3)
        .format('HH:mm')}`
    }

    return Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    }).format(date)
  }

  if (type === 'long') {
    if (withHour) {
      return `${dayjs(value).format('DD/MM/YYYY')} às ${dayjs(value)
        .utcOffset(-3)
        .format('HH:mm')}`
    }
    return `${date.toLocaleDateString('pt-BR', {
      day: '2-digit',
    })} de ${date.toLocaleString('pt-BR', {
      month: 'short',
    })}`
  }
}
