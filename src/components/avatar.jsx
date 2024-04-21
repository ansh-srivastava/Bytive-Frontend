import React from 'react'

function Avatar({ imageUrl }) {
  return (
        <>
      <div className="isolate flex -space-x-2 z-10">
        <img
          className="relative z-0 inline-block h-20 w-20 rounded-full ring-2 ring-white "
          src={imageUrl}
          alt="Delba"
        />
      </div>
    </>
  )
}

export default Avatar