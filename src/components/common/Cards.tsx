import React from 'react'

type Prop = {
    title: string
    count: any
}

export default function Cards( prop: Prop) {
  return (
    <div className=' flex items-start gap-2 bg-white p-6 h-auto w-auto rounded-md text-sm '>
        <div className=' flex flex-col gap-2 w-full'>
            <p className=' text-xs text-zinc-400 font-light'>{prop.title}</p>
            <h2 className=' font-semibold ~text-xl/2xl'>{prop.count}</h2>
            {/* <p className=' text-xs text-zinc-400 font-light'>Since last week</p> */}
        </div>
       <div className=' w-16 aspect-square rounded-full bg-pink-50 flex items-center justify-center'>
        <img src="/icons/users-inactive.png" width={22} height={22} alt="users" />
       </div>
    </div>
  )
}
