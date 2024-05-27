
const ErrorMessage = ({children}: {children: React.ReactNode}) => {
  return (
    <p className="bg-red-500 text-white p-2 font-bold text-center text-sm rounded-md">
      {children}
    </p>
  )
}

export default ErrorMessage