import React from 'react'

type RInput = React.InputHTMLAttributes<HTMLInputElement> & {
    htmlFor: string;
    label: string;
    strict? : boolean
};
export const RInput = ({ htmlFor,label, strict, ...props }: RInput) => {
  return (
    <div className="flex flex-col items-start justify-start gap-2 w-full">
        <label className='font-nunito text-lg ' htmlFor={htmlFor}>
          {label}
          {strict && <span className="text-red-500 text-xl">*</span>}
        </label>
        <input 
        disabled={props.disabled}
        id={htmlFor}
        accept={props.accept}
        multiple={props.multiple}
        type={props.type}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder} 
        className={`w-full max-w-[50ch] rounded-xl ring ring-gray-500 p-2 ${props.disabled ? "bg-gray-300" : ""}`}/>
        </div>
  )
}

export const RInputArea = ({ htmlFor,label, ...props }: RInput) => {
  return (
    <div className="flex flex-col items-start justify-start gap-2 w-full">
        <label className='font-nunito text-lg ' htmlFor={htmlFor}>
          {label}
        </label>
        <textarea 
        id={htmlFor}
        name={props.name}
        placeholder={props.placeholder} 
        className="resizing-textarea w-full max-w-[50ch] resize-none rounded-xl ring ring-gray-500 p-2"/>
        </div>
  )
}