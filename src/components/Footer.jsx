function Footer() {
  return (
    <footer className="p-4 bg-black flex justify-between items-center h-full">
      <p className=" text-white">&copy; {new Date().getFullYear()} </p>
      <p className="text-sm mt-2 text-white">
        <a 
        className="cursor-pointer"
        href="https://github.com/Medido1" target="blank">by Bousalah Nadir</a>
        </p>
    </footer>
  )
}

export default Footer;