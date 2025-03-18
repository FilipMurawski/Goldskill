"use client"
const Button = ({
    children, type, width, onClick, reference
  }: Readonly<{
    children: React.ReactNode;
    type: "button" | "submit" | "reset" | undefined;
    width: number | string;
    onClick?: () => void;
    reference?: string;
  }>) => {
    return(
    <>
      {reference ? <a href={reference} className="bg-gradient-to-b from-yellow-500 to-yellow-700 font-medium text-center py-2 my-3 flex items-center justify-center text-black hover:text-white transition-colors duration-300 uppercase rounded-xl" type={type} style={{ width: typeof width === "number" ? `${width}px` : width }}>{children}</a> :         
      <button onClick={onClick}className="bg-gradient-to-b from-yellow-500 to-yellow-700 font-medium text-center py-2 my-3 flex items-center justify-center text-black hover:text-white transition-colors duration-300 uppercase rounded-xl" type={type} style={{ width: typeof width === "number" ? `${width}px` : width }}>
      {children}  
      </button>}
      </>  )
}

export default Button;