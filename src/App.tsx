import './App.css'
import { Roles } from './model/card'
import { RoleCard } from './components/role-card'

function App() {
  const roles = Roles

  return (
    <div className='flex flex-wrap gap-2'>
      {roles.map((role) => {
        return <RoleCard key={role.name} role={role} chosen={false} />
      })}
    </div>
  )
}

export default App
