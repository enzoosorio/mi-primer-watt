"use client"
import React from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'


type CustomLinkProps = LinkProps & {
  href: string
  children: React.ReactNode
  className?: string
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const CustomLink = ({ href, children, ...props }: CustomLinkProps) => {

    const router = useRouter()

    const handleCustomLinkClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault()

      const body = document.querySelector('body')
      if (body) {
          body.classList.add('page-transition')
      }
      
      await sleep(300)
      router.push(href)
      await sleep(300)

      if (body) {
          body.classList.remove('page-transition')
      }
  }

  return (
    <Link 
    onClick={handleCustomLinkClick}
    {...props}
    href={href}>
        {children}
    </Link>
  )
}
