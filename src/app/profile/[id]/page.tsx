import React from 'react'

type Props = {
    params: {
        id: string
    }
}

const UserProfile
 = ({params}: Props) => {
  return (
    <div>UserProfile {params.id}

    </div>
  )
}

export default UserProfile
