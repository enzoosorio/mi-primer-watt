import React from 'react'

type Button = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    bgColor?: string
    textColor?: string
}
export const Button = ({ bgColor, textColor, children, ...props }: Button) => {
  return (
    <div>Button</div>
  )
}
