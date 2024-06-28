interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({children}) => {
    return ( 
        <div className="max-w-[1920px] mx-auto xl:px-20 md:px-10 px-4 my-5">
            {children}
        </div>
     );
}
 
export default Container;