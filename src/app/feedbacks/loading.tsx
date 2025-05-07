const loading = () => {
  return (
    <div className="h-[calc(100dvh-80px)] flex justify-center items-center">
      <div className="animate-spin inline-block size-14 border-5 border-current border-t-transparent text-gray-800 rounded-full" role="status" aria-label="loading">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default loading