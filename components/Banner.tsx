function Banner() {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-5 justify-between font-bold px-10 py-5 mb-10">
        <div>
            <h1 className="text-7xl max-w-md">Gnark's Blog</h1>
            <h2 className="mt-5 md:mt-1">
                Welcome to your favorite blog out there
            </h2>
        </div>
        <p className="nt-5 md:mt-2 text-gray-500 max-w-sm">
            The best insight on TT & CT | Build in public | Loose games on TFT
        </p>
    </div>
  )
}

export default Banner